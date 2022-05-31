import * as config from "../config";

type StatusTagsKeys = keyof typeof config.STATUS_TAGS;
export type StatusTags = typeof config.STATUS_TAGS[StatusTagsKeys]

export type FilterData = {
    posts: any[],
    searchFilter: string,
    statusFilter: string
}

