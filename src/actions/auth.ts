"use server";

import { auth } from "@/lib/auth";

export const changePassword = async (newPassword: string) => {
   const ctx = await auth.$context;
   const hash = await ctx.password.hash(newPassword);
   await ctx.internalAdapter.updatePassword("userId", hash);
};
