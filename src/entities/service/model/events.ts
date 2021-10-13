import {createEvent} from "effector";
import {CommentsServicesState} from "../types";

export const updateCommentsServiceState = createEvent<CommentsServicesState>()
