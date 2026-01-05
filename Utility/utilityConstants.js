// *******************************
//  Exports

/** Root URI for backend */
export const BackendUri = "https://homecord.twilitezebby.workers.dev/";

/** ENUMs */
export const ActivityLevel = {
    Disabled: "DISABLED",
    VeryLow: "VERY-LOW",
    Low: "LOW",
    Medium: "MEDIUM",
    High: "HIGH",
    VeryHigh: "VERY-HIGH"
};

export const MessagePrivacyLevel = {
    Private: "PRIVATE",
    Anonymous: "ANONYMOUS",
    Public: "PUBLIC"
};

export const BlockTypes = {
    Channel: "CHANNEL",
    Category: "CATEGORY",
    Role: "ROLE"
};

export const ShowcaseType = {
    Highlight: "HIGHLIGHT",
    Feature: "FEATURE"
};

export const HomeCordLimits = {
    // Showcaseable items
    MaxShowcasedMessages: 5, // Messages from Text or Public_Thread Channels
    MaxShowcasedAnnouncements: 4, // Messages from Announcement Channels
    MaxShowcasedEvents: 5,
    MaxShowcasedChannels: 6,
    MaxShowcasedThreads: 5,
    // Block List
    MaxBlockedChannels: 10,
    MaxBlockedCategories: 10,
    MaxBlockedRoles: 10
};

export const ThreadTypes = {
    /** Thread made in a Text Channel */
    TextThread: 'TEXT_THREAD',
    /** Thread made in an Announcement Channel */
    NewsThread: 'ANNOUNCEMENT_THREAD',
    /** Thread made in either a Forum Channel or a Media Channel */
    ForumThread: 'FORUM_THREAD'
};
