import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
   baseURL: process.env.BETTER_AUTH_BASE_URL,
   plugins: [
      inferAdditionalFields({
         user: {
            role: {
               type: "string"
            }
         }
      })
   ]
});
