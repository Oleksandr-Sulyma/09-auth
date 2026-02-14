'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // refresh викличе перезавантаження даних
    router.refresh();
    setLoading(false);
  }, [router]);

  return <section>{children}</section>;
}

// import React from 'react';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     router.refresh();
//   }, [router]);

//   return <section>{children}</section>;
// }
