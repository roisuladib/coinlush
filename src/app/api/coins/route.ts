import { request } from '@/lib';

export const revalidate = 60;
export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const sp = searchParams.toString();
   return request(`/coins${sp ? `?${sp}` : ''}`);
}
