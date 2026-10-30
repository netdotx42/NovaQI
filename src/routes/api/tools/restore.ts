import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tools/restore")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { accessCookie, restoreByEmail } = await import("@/lib/tools-access.server");
        let email = "";
        try {
          const body = (await request.json()) as { email?: unknown };
          email = typeof body.email === "string" ? body.email : "";
        } catch {
          email = "";
        }
        const result = await restoreByEmail(email);
        if ("message" in result) {
          return Response.json({ message: result.message }, { status: 404 });
        }
        return Response.json(
          { ok: true },
          { status: 200, headers: { "Set-Cookie": accessCookie(result.email, request) } },
        );
      },
    },
  },
});
