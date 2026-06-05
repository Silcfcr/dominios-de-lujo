'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}
