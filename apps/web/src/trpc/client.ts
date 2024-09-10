import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@api/trpc/trpc.router";

export const api = createTRPCReact<AppRouter>();