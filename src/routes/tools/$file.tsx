import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/$file")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const { handleToolGet } = await import("@/lib/tools-access.server");
        return handleToolGet(params.file, request);
      },
    },
  },
});
