'use client';

import React from 'react';
import Link from 'next/link';
import { Button} from '@chakra-ui/react';
import { nativeNames, Language} from '../i18n/settings';
import { useTranslation } from '../i18n';
import { usePathname, useSearchParams } from 'next/navigation';

interface FooterProps {
  lng: Language; 
}

export function Footer({ lng }: FooterProps) {
  const { t, i18n } = useTranslation(lng);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLanguage = pathname.split('/')[1] || lng;

  if (!t || !i18n) {
    return <div>Loading translations...</div>;
  }

  return (
    <footer style={{ marginTop: 20 }}>
      
        {Object.keys(nativeNames).map((lang) => {
          // Убираем текущий язык из пути
          const cleanPath = pathname.replace(/^\/(en|pl|ru)/, '');
          const params = new URLSearchParams(searchParams.toString());
          const href = `/${lang}${cleanPath}?${params.toString()}`;

          return (
            <Button
              key={lang}
              as={Link}
              href={href}
              disabled={currentLanguage === lang}
              colorScheme={currentLanguage === lang ? 'green' : 'blue'}
              style={{marginRight: 10}}
            >
              {nativeNames[lang]?.nativeName || lang}
            </Button>
          );
        })}
      
    </footer>
  );
}
