import {createEvent} from "effector";


export const updateUserPageId = createEvent<string>();
export const updateUserMetrics = createEvent<any[]>();
export const updateUser = createEvent<any>();
