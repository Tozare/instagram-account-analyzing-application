import {createStore} from "effector";

export const $filteredComments = createStore<any[]>([]);
// export const $selectedPostMessagesIdsMap = createStore<{[key: string | number]: boolean}>({});
export const $searchFilter = createStore<string>("");
export const $statusFilter = createStore<string>("ALL");

export const $isReplyCommentModalOpen = createStore<boolean>(false);
export const $replyText = createStore<string>("");



