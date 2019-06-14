export const isProd = process.env.NODE_ENV === "production";
export const isClient = typeof window !== "undefined";
