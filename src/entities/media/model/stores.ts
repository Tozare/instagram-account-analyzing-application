import {createStore} from "effector";

export const $posts = createStore<any[]>([]);
export const $selectedPostId = createStore<string>("");
export const $postComments = createStore<any[]>([]);
// export const $post = createStore<"">([]);