export async function POST() {
    const response = new Response(JSON.stringify({ message: "Token cleared" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Any CORS headers if needed
      },
    });
  
    response.headers.append("Set-Cookie", "token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
    return response;
  }
  
