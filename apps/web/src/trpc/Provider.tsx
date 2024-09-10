"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
// import superjson from "superjson";
import {transformer} from '../utils/transformer'

import { api } from "./client";


export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    transformer,
                    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer Mitsutha`,
                    },
                }),
            ],
        })
    );
    return (
        <api.Provider client= { trpcClient } queryClient = { queryClient } >
            <QueryClientProvider client={ queryClient }> { children } </QueryClientProvider>
        </api.Provider>
  );
}