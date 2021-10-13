import { useStore } from "effector-react";
import {$commentsServiceState} from "./stores";

export const useCommentsServiceState = () => useStore($commentsServiceState);
// export const useSelectedPostId = () => useStore($selectedPostId);
// export const usePostComments = () => useStore($postComments);