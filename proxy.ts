import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    const origin = request.nextUrl.origin;
    
    // Check session manually via Better Auth API
    const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    let session = null;
    if (sessionRes.ok) {
        session = await sessionRes.json();
    }

    // RBAC: Check for authenticated user
    if (!session && request.nextUrl.pathname.startsWith('/api/protected')) {
        return NextResponse.json({ error: "Unauthorized: Missing Session" }, { status: 401 });
    }

    // RBAC: Check for Admin role
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (session.user.role !== 'Admin') {
            return NextResponse.json({ error: "Forbidden: Requires Admin Role" }, { status: 403 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/protected/:path*', '/api/admin/:path*'],
};
