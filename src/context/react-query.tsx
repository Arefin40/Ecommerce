"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider as QueryProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
   return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}
