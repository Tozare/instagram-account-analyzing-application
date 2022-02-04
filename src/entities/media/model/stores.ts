import {createStore} from "effector";

export const $posts = createStore<any[]>([]);
export const $selectedPostId = createStore<string>("");
export const $postComments = createStore<any[]>([]);

export const $selectedPostCommentsIdsMap = createStore<{[key: string | number]: boolean}>({});

export const $postMetrics = createStore<any[]>([]);

export const $postEngagement = createStore<any>({});
export const $postImpressions = createStore<any>({});
export const $postReach = createStore<any>({});
export const $postSaved = createStore<any>({});

export const $commentsPostMap = createStore<{[key: string]: any[]}>({});
// export const $postComments = createStore<any[]>([]);
// export const $post = createStore<"">([]);