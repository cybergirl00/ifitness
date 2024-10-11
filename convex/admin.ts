import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server"



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


export const addReview = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        rating: v.number(),
        approved: v.boolean()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("reviews", {
            name: args.name,
            email: args.email,
            phone: args.phone,
            message: args.message,
            rating: args.rating,
            approved: args.approved
        })
    }
})

export const getAllReviews = query({
    handler: async (ctx) => {
        return await ctx.db.query('reviews')
        .order('desc')
        .collect()
    }
})

export const getApprovedReviews = query({
    handler: async (ctx) => {
        return await ctx.db.query('reviews')
        .filter((q) => q.eq(q.field("approved"), true))
        .collect()
    }
})

export const approveReview = mutation({
    args: {  _id: v.id("reviews") },
    handler: async (ctx,args) => {
       const id = await ctx.db.get(args._id)
       if (!id) {
        throw new ConvexError("Review not found");
      }
        return await ctx.db.patch(args._id, { approved: true})
    }
})

export const disApproveReview = mutation({
    args: {  _id: v.id("reviews") },
    handler: async (ctx,args) => {
       const id = await ctx.db.get(args._id)
       if (!id) {
        throw new ConvexError("Review not found");
      }
        return await ctx.db.patch(args._id, { approved: false})
    }
})