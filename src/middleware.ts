import { NextRequest, NextResponse } from 'next/server';

const isDevelopment = process.env.NODE_ENV !== 'production';

export function middleware(req: NextRequest) {
   // retrieve the current response
   const res = NextResponse.next();

   // add the CORS headers to the response
   res.headers.append('Access-Control-Allow-Credentials', 'true');
   res.headers.append('Access-Control-Allow-Origin', isDevelopment ? '*' : req.nextUrl.origin);
   res.headers.append('Access-Control-Allow-Methods', 'GET');
   res.headers.append('Cross-Origin-Opener-Policy', 'same-origin');
   res.headers.append('Referrer-Policy', 'strict-origin-when-cross-origin');
   // res.headers.append(
   //    'Access-Control-Allow-Headers',
   //    'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date',
   // );

   return res;
}

// specify the path regex to apply the middleware to
export const config = {
   matcher: '/api/:path*',
};
