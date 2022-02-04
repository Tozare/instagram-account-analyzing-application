import {createStore} from "effector";

export const $userMetrics = createStore<any[]>([]);
export const $userPageId = createStore<string|number>("");
export const $user = createStore<any>(null);