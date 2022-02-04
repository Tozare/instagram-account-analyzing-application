import {createEvent, createStore} from "effector";


export const updatePosts = createEvent<any[]>();
export const setPostId = createEvent<string>();
export const updatePostComments = createEvent<any[]>();


export const setSelectedPostCommentsIdsMap = createEvent<{[key: string|number]: boolean}>();
export const changeSelectedPostCommentIdInMap = createEvent<string|number>();
export const deleteSelectedPostComments = createEvent<(number|string)[]>();

export const updatePostMetrics = createEvent<any[]>();

export const updatePostEngagement = createEvent<any>();
export const updatePostImpressions = createEvent<any>();
export const updatePostReach = createEvent<any>();
export const updatePostSaved = createEvent<any>()

export const updatePostCommentsMap = createEvent<{[key: string]: any[]}>();