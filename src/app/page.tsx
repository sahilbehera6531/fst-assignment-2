import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "800px", margin: "0 auto", color: "white" }}>
      <h1>Assignment 2: Backend Pipeline Dashboard</h1>
      <p>
        Welcome! You are seeing this page instead of a 404 error because I have added a simple frontend to help you test the backend endpoints.
      </p>

      <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #333", borderRadius: "8px" }}>
        <h2>1. Test Middleware & Authorization (Part B)</h2>
        <p>Click the link below to visit the protected API endpoint. Because you are not logged in, the Next.js proxy will block you and return a <code>401 Unauthorized</code> JSON error.</p>
        <Link href="/api/protected" style={{ display: "inline-block", padding: "10px 15px", backgroundColor: "#0070f3", color: "white", textDecoration: "none", borderRadius: "5px" }}>
          Test Protected Endpoint (/api/protected)
        </Link>
      </div>

      <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #333", borderRadius: "8px" }}>
        <h2>2. Test Webhook Ingestion (Part C)</h2>
        <p>This endpoint is designed to receive POST requests from the Resend Email API. If you visit it directly in your browser (which makes a GET request), it will say "Method Not Allowed", but you can test it via tools like Postman by sending a POST request to:</p>
        <code style={{ background: "#222", padding: "5px", borderRadius: "3px" }}>http://localhost:3000/api/webhooks/resend</code>
      </div>

      <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #333", borderRadius: "8px" }}>
        <h2>3. Better Auth System</h2>
        <p>The authentication system is running securely under the catch-all route:</p>
        <code style={{ background: "#222", padding: "5px", borderRadius: "3px" }}>/api/auth/*</code>
        <p>It manages sessions and connects directly to your PostgreSQL database using the Prisma Adapter.</p>
      </div>
    </div>
  );
}
