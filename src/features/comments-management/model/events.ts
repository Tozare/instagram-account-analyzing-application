import {createEvent} from "effector";
import {FilterData} from "../types";


export const setFilteredComments = createEvent<any[]>();
export const setSearchFilter = createEvent<string>();
export const setStatusFilter = createEvent<string>();
export const filter = createEvent<FilterData>();
// export const changeSelectedPostIdInMap = createEvent<string|number>();
export const setSelectedPostsIdsMap = createEvent<{[key: string|number]: boolean}>();

export const setIsReplyCommentModal = createEvent<boolean>();
export const setReplyText = createEvent<string>();


