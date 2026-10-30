import { createServerFn } from "@tanstack/react-start";

export type ToolAccess = {
  unlocked: boolean;
  email: string | null;
  paymentsReady: boolean;
};

export const getToolAccess = createServerFn({ method: "GET" }).handler(
  async (): Promise<ToolAccess> => {
    const { paymentsReady, readToolAccess } = await import("./tools-access.server");
    const access = readToolAccess();
    return {
      unlocked: access !== null,
      email: access?.email ?? null,
      paymentsReady: paymentsReady(),
    };
  },
);
