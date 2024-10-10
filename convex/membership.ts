import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

export const getUser = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await  ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError('User not found');
          }
        return user
    }
});