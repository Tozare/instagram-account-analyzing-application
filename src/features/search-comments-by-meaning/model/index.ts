import {createEvent, createStore, sample} from "effector";
import {createEffect} from "effector/effector.mjs";
import {backendAPI} from "shared/api/backend";
import {thresholdsModel} from "entities/thresholds";
import {StatusTags} from "features/comments-management/types";
import * as config from "features/comments-management/config";


export const $isLoading = createStore(false);
export const isLoadingChanged = createEvent<boolean>();
$isLoading.on(isLoadingChanged, (_, data) => data);

export const $comments = createStore<any[]>([]);
export const commentsChanged = createEvent<any[]>();
$comments.on(commentsChanged, (_, data) => data);


export const $processedComments = createStore<any[]>([]);
export const processedCommentsChanged = createEvent<any[]>();
$processedComments.on(processedCommentsChanged, (_, data) => data);

sample({
  source: [thresholdsModel.$thresholds, $comments],
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

      return {
        ...processedComment,
        status: commentStatus,
        statusTags: commentStatusTags,
      }
    });
    console.log(processedCommentsWithStatus);
    return processedCommentsWithStatus;
  },
  target: [
    $processedComments,
    isLoadingChanged.prepend(() => false),
  ]
})


export const $searchText = createStore<string>("");
export const searchTextChanged = createEvent<string>();
$searchText.on(searchTextChanged, (_,data) => data);

export const $selectedComments = createStore<Record<string|number, any>>({});
export const selectedCommentsChanged = createEvent<Record<string|number, any>>();
export const commentSelected = createEvent<string|number>();

export const $state = createStore<string>("NONE");
export const stateChanged = createEvent<string>();
$state.on(stateChanged, (_,data) => data);

$selectedComments
    .on(selectedCommentsChanged, (_,data) => data)
    .on(commentSelected, (_,data) => {
        return {
            ..._,
            [data]: true
        }
    })

export type GetCommentsWhenSearchTextChangedFx = {
    searchText: string
}



export const getCommentsWhenSearchTextChangedFx = createEffect(async ({searchText}: GetCommentsWhenSearchTextChangedFx) => {
    stateChanged("LOADING")
    backendAPI.getCommentsBySearchText(searchText).then((res) => {
        commentsChanged(res.data);
        // isLoadingChanged(false);
        selectedCommentsChanged({});
        stateChanged("NONE");
    })
})

export const searchButtonClicked = createEvent();



sample({
    clock: searchButtonClicked,
    source: $searchText,
    fn: (searchText) => { return {searchText}},
    target: [
      getCommentsWhenSearchTextChangedFx,
      isLoadingChanged.prepend(() => true),
    ]
})

export const $isReplyModalOpen = createStore<boolean>(false);
export const isReplyModalOpenChanged = createEvent<boolean>();
$isReplyModalOpen.on(isReplyModalOpenChanged, (_,data) => data);

export const $replyText = createStore<string>("");
export const replyTextChanged = createEvent<string>();
$replyText.on(replyTextChanged, (_,data) => data);
