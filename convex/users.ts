import { ConvexError, v } from "convex/values";

import { internalMutation, mutation, query } from "./_generated/server";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      
      // throw new ConvexError("User not found");
    }

    return user;
  },
});
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
    subscription: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
      subscription: args.subscription,
    })
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});


export const updateSub = mutation({
  args: {
    subscription: v.string(),
    subcode: v.string(),
  },
  handler: async (ctx, args) => {
    // Get current user
    const user = await ctx.auth.getUserIdentity();
    console.log(user)
    if (!user) {
      throw new ConvexError('User not found');
    }

    // Log the clerkId for debugging
    console.log("User clerkId:", user.clerkId);

    // Get the user's record by clerkId
    const sub = await ctx.db.query("users")
      .filter((q) => q.eq(q.field("clerkId"), user.subject))
      .unique();

    // Log the subscription record for debugging
    console.log("User Subscription Record:", sub);

    if (!sub) {
      throw new ConvexError('User subscription not found');
    }

    // Update the user's subscription field
    return await ctx.db.patch(sub._id, {
      subscription: args.subscription,
      subcode: args.subcode
    });
  }
});

