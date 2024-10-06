export default {
    providers: [
      {
        domain: process.env.CLERK_JWT_ISSURER,
        applicationID: "convex",
      },
    ]
  };