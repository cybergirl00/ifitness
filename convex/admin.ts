import { query } from "./_generated/server"



export  const getEmails = query({
    args: {},
    handler: async (ctx, args) => {
      return  await ctx.db.query("emails")
      .order("desc")
        .take(5)
    }
});
export  const getAllEmails = query({
    args: {},
    handler: async (ctx, args) => {
      return  await ctx.db.query("emails")
      .order("desc")
        .collect();
    }
});

export const getSubscribers = query({
    handler: async (ctx) => {
        return await ctx.db.query("users")
        .filter((q) => q.neq(q.field("subscription"), 'standard'))
        .take(5)
    }
})