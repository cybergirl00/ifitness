import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        subscription: v.string(),
        subcode: v.optional(v.string())
    }),
    emails: defineTable({
        fromName: v.string(),
        fromEmail: v.string(),
        message: v.string(), 
    }),
    reviews: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        rating: v.number(),
        approved: v.boolean()
    }),
    membership: defineTable({
        type: v.string(),
        user: v.string(),
        subscriptioCode: v.string(),
    })
})