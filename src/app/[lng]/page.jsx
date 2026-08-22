'use client';

import { use } from 'react';
import Shop from '../pages/Shop';

export default function Page({ params }) {
  const { lng } = use(params);

  return (
      
        
        <Shop lng={lng} />
      
  );
}
