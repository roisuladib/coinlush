import { request } from '@/lib';

export const revalidate = 60;
export async function GET(req: Request, { params }: { params: { id: string } }) {
   const { searchParams } = new URL(req.url);
   const sp = searchParams.toString();
   return request(`/coin/${params.id}${sp ? `?${sp}` : ''}`);
}
