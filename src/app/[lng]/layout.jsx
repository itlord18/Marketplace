import { dir } from 'i18next';
import * as React from 'react';
import { languages } from '../i18n/settings';
import { ChakraProvider } from '@chakra-ui/react';
import  ReduxProvider  from './reduxProvider'

// Эта функция отвечает за генерацию статичных параметров для маршрутов
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Функция RootLayout теперь асинхронная
export default async function RootLayout({ children, params }) {
  const { lng } = await params; // теперь асинхронно извлекаем параметры

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <ReduxProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
