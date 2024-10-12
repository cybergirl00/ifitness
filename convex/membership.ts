import { ConvexError, v } from "convex/values";
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


export const getMembership = query({
    args: { user: v.string() },
    handler: async (ctx,args) => {
        return await ctx.db.query("membership")
        .filter((q) => q.eq(q.field("user"), args.user))
        .unique();
    }
})