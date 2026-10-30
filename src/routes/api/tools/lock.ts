import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tools/lock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { clearAccessCookie } = await import("@/lib/tools-access.server");
        return Response.json(
          { ok: true },
          { status: 200, headers: { "Set-Cookie": clearAccessCookie(request) } },
        );
      },
    },
  },
});
