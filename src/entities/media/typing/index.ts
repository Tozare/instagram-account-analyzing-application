export type PostServices = "OVERVIEW" | "GRAPHS";

export const COMMENT = {
    STATUS: {
        POSITIVE: "POSITIVE",
        NEGATIVE: "NEGATIVE",
        SPAM: "SPAM",
        NEUTRAL: "NEUTRAL"
    } as const,
} as const;

export type Post = any;
export type Comment = any;
export type PostMetrics = any;
export type PostEngagement = any;
export type PostImpressions = any;
export type PostReach = any;
export type PostSaved = any;

export type ProcessedComment = any;
