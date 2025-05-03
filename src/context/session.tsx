"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

type SessionContextType = {
   user: User | null;
   isPending: boolean;
};

const SessionContext = createContext<SessionContextType>({
   user: null,
   isPending: true
});

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
   const { data: session, isPending } = authClient.useSession();
   const user = session?.user ?? null;

   return <SessionContext.Provider value={{ user, isPending }}>{children}</SessionContext.Provider>;
}

export function useSession() {
   return useContext(SessionContext);
}
