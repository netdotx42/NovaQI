import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tools/confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { accessCookie, confirmSession } = await import("@/lib/tools-access.server");
        const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
        const result = await confirmSession(sessionId);
        if ("message" in result) {
          return Response.redirect(new URL("/library?error=1", request.url), 302);
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/library",
            "Set-Cookie": accessCookie(result.email, request),
          },
        });
      },
    },
  },
});
