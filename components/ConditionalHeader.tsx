'use client';

import { usePathname } from 'next/navigation';
import HeaderV4 from './HeaderV4';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show HeaderV4 on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <HeaderV4 />;
}

