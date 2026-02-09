import fs from 'fs/promises'
import path from 'path'

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function readJson(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeJson(filePath: string, data: any, opts?: { retries?: number; delay?: number }) {
  const { retries = 100, delay = 50 } = opts || {}
  const lockPath = `${filePath}.lock`
  const backupDir = path.dirname(filePath)
  // try acquire lock
  let handle: fs.FileHandle | null = null
  for (let i = 0; i < retries; i++) {
    try {
      handle = await fs.open(lockPath, 'wx')
      break
    } catch (err: any) {
      // file exists -> wait
      await sleep(delay)
    }
  }
  if (!handle) {
    throw new Error(`Could not acquire lock for ${filePath}`)
  }

  try {
    // make a timestamped backup before writing
    try {
      const backupPath = path.join(backupDir, `${path.basename(filePath)}.bak.${Date.now()}`)
      await fs.copyFile(filePath, backupPath)
    } catch (e) {
      // ignore if copy fails (e.g., file doesn't exist yet)
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } finally {
    try {
      await handle.close()
    } catch (e) {
      // ignore
    }
    // remove lock file
    try {
      await fs.unlink(lockPath)
    } catch (e) {
      // ignore
    }
  }
}

export async function ensureFileExists(filePath: string, initial: any = []) {
  try {
    await fs.access(filePath)
  } catch (e) {
    await writeJson(filePath, initial)
  }
}

export default { readJson, writeJson, ensureFileExists }
