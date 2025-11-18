'use server';

import { cookies } from 'next/headers';

export async function setCurrency(currency: string) {
  const cookiesFunc = await cookies();
  cookiesFunc.set({
    name: 'currency',
    value: currency,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 180,
    sameSite: 'strict',
    secure: true,
  });
}
