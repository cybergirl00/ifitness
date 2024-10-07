import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const sendEmail = mutation({
    args: {
        fromName: v.string(),
        fromEmail: v.string(),
        message: v.string(), 
    },
    handler: async (ctx, args) => {
        const email = ctx.db.insert("emails", {
            fromEmail: args.fromEmail,
            fromName: args.fromName,
            message: args.message
        });
        return email;
    }
})