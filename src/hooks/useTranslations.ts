'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Messages = Record<string, string>;

export function useTranslations() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const msgs = await import(`@/messages/${locale}.json`);
        setMessages(msgs.default || msgs);
      } catch {
        // Fallback to French if locale not found
        const msgs = await import('@/messages/fr.json');
        setMessages(msgs.default || msgs);
      }
    };

    loadMessages();
  }, [locale]);

  return (key: string) => messages[key as keyof Messages] || key;
}
