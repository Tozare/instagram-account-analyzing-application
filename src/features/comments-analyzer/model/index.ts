import {combine, createEvent, createStore, sample} from "effector";
import {mediaModel} from "entities/media";

export const $insultThreshold = createStore<number>(0.5);
export const insultThresholdChanged = createEvent<number>();
$insultThreshold.on(insultThresholdChanged, (_,data) => data);

export const $identityHateThreshold = createStore<number>(0.5);
export const identityHateThresholdChanged = createEvent<number>();
$identityHateThreshold.on(identityHateThresholdChanged, (_,data) => data);


export const $obsceneThreshold = createStore<number>(0.5);
export const obsceneThresholdChanged = createEvent<number>();
$obsceneThreshold.on(obsceneThresholdChanged, (_,data) => data);

export const $severeToxicThreshold = createStore<number>(0.5);
export const severeToxicThresholdChanged = createEvent<number>();
$severeToxicThreshold.on(severeToxicThresholdChanged, (_,data) => data);

export const $threatThreshold = createStore<number>(0.5);
export const threatThresholdChanged = createEvent<number>();
$threatThreshold.on(threatThresholdChanged, (_,data) => data);

export const $toxicThreshold = createStore<number>(0.5);
export const toxicThresholdChanged = createEvent<number>();
$toxicThreshold.on(toxicThresholdChanged, (_,data) => data);


export const $thresholds = combine({
    $insultThreshold,
    $identityHateThreshold,
    $obsceneThreshold,
    $severeToxicThreshold,
    $threatThreshold,
    $toxicThreshold
  },
  (stores) => ({
    insultThreshold: stores.$insultThreshold,
    identityHateThreshold: stores.$identityHateThreshold,
    obsceneThreshold: stores.$obsceneThreshold,
    severeToxicThreshold: stores.$severeToxicThreshold,
    threatThreshold: stores.$threatThreshold,
    toxicThreshold: stores.$toxicThreshold,
  })
);

sample({
  source: [$thresholds, mediaModel.$processedComments],
  fn: ([threshold, processedComments]) => {
    const {
      insultThreshold,
      identityHateThreshold,
      obsceneThreshold,
      severeToxicThreshold,
      threatThreshold,
      toxicThreshold
    } = threshold

    const processedCommentsWithStatus = processedComments.map((processedComment) => {
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
          status: replyStatus
        }
      })
      return {
        ...processedComment,
        replies: proccessedReplyWithStatus,
        status: commentStatus
      }
    })
    return processedCommentsWithStatus;
  },
  target: [
    mediaModel.processedCommentsWithStatusChanged,
  ]
})
