'use server';

import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { cookies } from 'next/headers';

export async function setCurrency(currency: string) {
  const cookiesFunc = await cookies();

  const defaultOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 180,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  };

  cookiesFunc.set({
    name: 'currency',
    value: currency,
    ...defaultOptions,
  });

  cookiesFunc.set({
    name: 'currencyChosen',
    value: 'true',
    ...defaultOptions,
  });

  return { success: true, currency };
}

export async function getCurrency() {
  const cookiesFunc = await cookies();
  return cookiesFunc.get('currency')?.value || 'USD';
}

export async function hasChosenCurrency() {
  const cookiesFunc = await cookies();
  return cookiesFunc.get('currencyChosen')?.value === 'true';
}
