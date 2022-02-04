import { useStore } from "effector-react";
import {$postComments, $posts, $selectedPostId} from "./stores";

export const usePosts = () => useStore($posts);
export const useSelectedPostId = () => useStore($selectedPostId);
export const usePostComments = () => useStore($postComments);
