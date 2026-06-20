import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet: CookieToSet[]) => {
        toSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

// Only run the Supabase session refresh on the routes that actually use a
// logged-in session (`/library`, `/admin`). The rest of the site is public
// and static, so running `auth.getUser()` there was an outbound Supabase
// call on every page view (and every crawler hit) for no benefit — a major
// source of CPU/process resource burn on constrained hosting.
export const config = {
  matcher: ["/library/:path*", "/admin/:path*"],
};
