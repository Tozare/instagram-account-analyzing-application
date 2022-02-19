import {FilterData} from "../types";
import {createEffect, createEvent, createStore} from "effector";
import {graphApi} from "shared/api/graph-api";
import { filter } from "../libs";


export const $filteredComments = createStore<any[]>([]);
export const $searchFilter = createStore<string>("");
export const $statusFilter = createStore<string>("ALL");

export const $isReplyCommentModalOpen = createStore<boolean>(false);
export const $replyText = createStore<string>("");


export const filteredCommentsChanged = createEvent<any[]>();
export const searchFilterChanged = createEvent<string>();
export const statusFilterChanged = createEvent<string>();
export const filtered = createEvent<FilterData>();
export const selectedPostsIdsMapChanged = createEvent<{[key: string|number]: boolean}>();

export const isReplyCommentModalChanged = createEvent<boolean>();
export const replyTextChanged = createEvent<string>();

export const replyCommentFx = createEffect(async (params: {
  replyText: string,
  selectedPostComments: {[key: string|number]: boolean}
}) => {
  const commentsIds = Object.keys(params.selectedPostComments)
  for(let i=0;i<commentsIds.length;i++){
    const postCommentId = commentsIds[i];
    if (params.selectedPostComments[postCommentId]){
      await graphApi.replyText(postCommentId, params.replyText);
    }
  }
  return true;
})


$filteredComments
  .on(filteredCommentsChanged, (state: any[], data: any[]) => {return data})
  .on(filtered, (state: any[], data:FilterData) => {
      const filteredPosts = filter(data);
      return filteredPosts;
  })

$searchFilter
  .on(searchFilterChanged, (state, data) => {return data})

$statusFilter
  .on(statusFilterChanged, (state,data) => {return data})

$isReplyCommentModalOpen
  .on(isReplyCommentModalChanged, (state, data) => {return data})
  .on(replyCommentFx.doneData, (state, data) => {
      return false;
  })

$replyText
  .on(replyTextChanged, (state, data) => {return data})
  .on(replyCommentFx.doneData, (state, data) => {
      return "";
  })


