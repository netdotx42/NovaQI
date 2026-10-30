import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tools/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { createCheckout } = await import("@/lib/tools-access.server");
        const result = await createCheckout(request);
        const ok = "url" in result;
        return Response.json(ok ? { url: result.url } : { message: result.message }, {
          status: ok ? 200 : 503,
        });
      },
    },
  },
});
