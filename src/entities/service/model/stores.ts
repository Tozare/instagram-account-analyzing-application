import {createStore} from "effector";
import {CommentsServicesState} from "../types";

export const $commentsServiceState = createStore<CommentsServicesState>("MANAGEMENT");