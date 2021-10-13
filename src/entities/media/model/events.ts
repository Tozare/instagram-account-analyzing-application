import {createEvent} from "effector";


export const updatePosts = createEvent<any[]>()
export const setPostId = createEvent<string>()
export const updatePostComments = createEvent<any[]>()