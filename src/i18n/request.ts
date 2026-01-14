import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Pas besoin de faire grand chose ici, tout est géré dans layout.tsx
  return {
    messages: {},
  };
});
