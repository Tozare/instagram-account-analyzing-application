import {FilterData} from "../types";
import {createEffect, createEvent, createStore, restore, sample} from "effector";
import {graphApi} from "shared/api/graph-api";
import { filter } from "../libs";
import { mediaModel } from "entities/media";
import { thresholdsModel } from "entities/thresholds";
import type { StatusTags } from "../types";
import * as config from "../config";
import {$postComments, getPostCommentsFx, isLoadingChanged} from "entities/media/model";



export const $filteredComments = createStore<any[]>([]);
export const filteredCommentsChanged = createEvent<any[]>();
// sample({
//   clock: mediaModel.$postComments,
//   target: filteredCommentsChanged
// })
export const $searchFilter = createStore<string>("");
export const $statusFilter = createStore<string>("ALL");

export const $isReplyCommentModalOpen = createStore<boolean>(false);
export const $replyText = createStore<string>("");


export const searchFilterChanged = createEvent<string>();
export const statusFilterChanged = createEvent<string>();
export const filtered = createEvent<FilterData>();

export const selectedCommentsIdsChanged = createEvent<Record<string|number, boolean>>();
export const $selectedCommentsIds = restore(selectedCommentsIdsChanged,{});
export const commentSelectionToggled = createEvent<string|number>();

$selectedCommentsIds
  .on(commentSelectionToggled, (state, data) => {
    if (state[data]){
      return {
        ...state,
        [data]: false
      };
    } else {
      return {
        ...state,
        [data]: true
      };
    }
  });

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

$filteredComments.watch(console.warn);

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


export const $processedCommentsWithStatus = createStore<any[]>([]);
export const processedCommentsWithStatusChanged = createEvent<any[]>();
$processedCommentsWithStatus.on(processedCommentsWithStatusChanged, (_,data) => data);
export const $commentsMap = $processedCommentsWithStatus.map((processedCommentsWithStatus) => {
  const map = {};
  processedCommentsWithStatus.forEach((comment) => {
    map[comment.id] = comment;
  });
  return map;
});

sample({
  source: [thresholdsModel.$thresholds, mediaModel.$processedComments],
  fn: ([thresholds, processedComments]) => {

    console.log(thresholds, processedComments);
    //
    const {
      insultThreshold,
      identityHateThreshold,
      obsceneThreshold,
      severeToxicThreshold,
      threatThreshold,
      toxicThreshold
    } = thresholds;
    //
    const processedCommentsWithStatus = processedComments.map((processedComment) => {
      const commentStatusTags: StatusTags[] = [];
      if (parseFloat(processedComment.insult) >= insultThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.INSULT);
      }
      if (parseFloat(processedComment.obscene) >= obsceneThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.OBSCENE);
      }
      if (parseFloat(processedComment.identity_hate) >= identityHateThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.HATE);
      }
      if (parseFloat(processedComment.threat) >= threatThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.THREAT);
      }
      if (parseFloat(processedComment.toxic) >= toxicThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.TOXIC);
      }
      if (parseFloat(processedComment.severe_toxic) >= severeToxicThreshold) {
        commentStatusTags.push(config.STATUS_TAGS.SEVERE_TOXIC);
      }
      let commentStatus = "POSITIVE";
      if (
        parseFloat(processedComment.insult) >= insultThreshold
        || parseFloat(processedComment.identity_hate) >= identityHateThreshold
        || parseFloat(processedComment.obscene) >= obsceneThreshold
        || parseFloat(processedComment.severe_toxic) >= severeToxicThreshold
        || parseFloat(processedComment.threat) >= threatThreshold
        || parseFloat(processedComment.toxic) >= toxicThreshold
      ){
        commentStatus = "NEGATIVE"
      }
      const proccessedReplyWithStatus = processedComment.replies.map((processedReply) => {
        const repliesStatusTags: StatusTags[] = [];
        if (parseFloat(processedReply.insult) >= insultThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.INSULT);
        }
        if (parseFloat(processedReply.obscene) >= obsceneThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.OBSCENE);
        }
        if (parseFloat(processedReply.identity_hate) >= identityHateThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.HATE);
        }
        if (parseFloat(processedReply.threat) >= threatThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.THREAT);
        }
        if (parseFloat(processedReply.toxic) >= toxicThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.TOXIC);
        }
        if (parseFloat(processedReply.severe_toxic) >= severeToxicThreshold) {
          repliesStatusTags.push(config.STATUS_TAGS.SEVERE_TOXIC);
        }
        let replyStatus = "POSITIVE";
        if (
          parseFloat(processedReply.insult) >= insultThreshold
          || parseFloat(processedReply.identity_hate) >= identityHateThreshold
          || parseFloat(processedReply.obscene) >= obsceneThreshold
          || parseFloat(processedReply.severe_toxic) >= severeToxicThreshold
          || parseFloat(processedReply.threat) >= threatThreshold
          || parseFloat(processedReply.toxic) >= toxicThreshold
        ){
          replyStatus = "NEGATIVE"
        }
        return {
          ...processedReply,
          status: replyStatus,
          statusTags: repliesStatusTags,
        }
      })
      return {
        ...processedComment,
        replies: proccessedReplyWithStatus,
        status: commentStatus,
        statusTags: commentStatusTags,
      }
    });
    console.log(processedCommentsWithStatus);
    return processedCommentsWithStatus;
  },
  target: processedCommentsWithStatusChanged
})


sample({
  source: [$searchFilter, $statusFilter, $processedCommentsWithStatus],
  fn: ([searchFilter, statusFilter, postComments]) => {
    return {
      posts: postComments,
      searchFilter: searchFilter,
      statusFilter: statusFilter
    }
  },
  target: filtered,
})



