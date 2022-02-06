import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import {graphApi} from "shared/api/graph-api";
import {backendAPI} from "shared/api/backend";
import {
  Comment,
  Post,
  PostEngagement,
  PostImpressions,
  PostMetrics,
  PostReach,
  PostSaved,
  ProcessedComment
} from "../typing";
import {forward} from "effector/effector.mjs";

export const postsChanged = createEvent<Post[]>();
export const $posts = restore(postsChanged, []);

export const postCommentsChanged = createEvent<Comment[]>();
export const $postComments = restore(postCommentsChanged, []);

export const selectedPostIdChanged = createEvent<string>()
export const $selectedPostId = restore(selectedPostIdChanged,"");

export const selectedPostCommentIdsMapChanged = createEvent<{[key: string | number]: boolean}>();
export const $selectedPostCommentsIdsMap = restore(selectedPostCommentIdsMapChanged,{});

export const postMetricsChanged = createEvent<PostMetrics[]>()
export const $postMetrics = restore(postMetricsChanged,[]);

export const postEngagementChanged = createEvent<PostEngagement>();
export const $postEngagement = restore(postEngagementChanged,{});

export const postImpressionsChanged = createEvent<PostImpressions>();
export const $postImpressions = restore(postImpressionsChanged,{});

export const postReachChanged = createEvent<PostReach>();
export const $postReach = restore(postReachChanged,{});

export const postSavedChanged = createEvent<PostSaved>();
export const $postSaved = restore(postSavedChanged,{});

export const postCommentsMapChanged = createEvent<{[key: string]: Comment[]}>();
export const $postCommentsMap = restore(postCommentsMapChanged,{});

export const selectedPostCommentIdInMapChanged = createEvent<string|number>();
export const deleteSelectedPostComments = createEvent<(number|string)[]>();

export const instagramPagePostsRequested = createEvent();
export const getAllMediaPostsFx = createEffect(async (): Promise<Post[]> => {
  const facebookPages = await graphApi.getFacebookPages();
  const instagramPageAccountId = await graphApi.getInstagramAccountId(facebookPages[0].id);
  const media = await graphApi.getAllMediaFromInstagramPage(instagramPageAccountId)
  return media;
})

forward({
  from: instagramPagePostsRequested,
  to: getAllMediaPostsFx,
})

export const getPostCommentsFx = createEffect(async (params: {postId: string}) => {
  const mediaComments = await graphApi.getMediaComments(params.postId);
  return mediaComments
})

export const deleteSelectedPostCommentsFx = createEffect(async (params: {selectedPostComments: {[key: string|number]: boolean}}) => {
  const commentsIds = Object.keys(params.selectedPostComments)
  for(let i=0;i<commentsIds.length;i++){
    const postCommentId = commentsIds[i];
    if (params.selectedPostComments[postCommentId]){
      await graphApi.deleteComment(postCommentId);
    }
  }
  return params.selectedPostComments;
})


export const getPostInsightsFx = createEffect(async (params: {mediaId: number|string}): any => {
  const postInsights = await graphApi.getMediaInsights(params.mediaId);
  const insights = {}
  postInsights.forEach((insight) => {
    insights[insight.name] = insight
  });

  return insights;
})



$posts
  .on(getAllMediaPostsFx.doneData, (state, data) => {return data})


$postComments
  .on(getPostCommentsFx.doneData, (state, data) => {return data})
  .on(deleteSelectedPostCommentsFx.doneData, (state, data) => {
      // console.log(data)
      return state.filter((post) => {
          return !data[post.id];
      })
  })


$selectedPostCommentsIdsMap
    .on(selectedPostCommentIdInMapChanged, (state, data) => {
        if (state[data]){
            return {
                ...state,
                [data]: true
            };
        } else {
            return {
                ...state,
                [data]: true
            };
        }
    });


$postMetrics
  .on(getPostInsightsFx.doneData, (state,data) => {
      return data
  })


// useEffect(() => {
//     console.log(mediaId);
//     if (selectedPostId){
//         // mediaModel.effects.getPostCommentsFx({postId: selectedPostId});
//         // graphApi.getMediaInsights(mediaId);
//         mediaModel.effects.getPostInsightsFX({mediaId: selectedPostId});
//     } else if(mediaId) {
//         // mediaModel.effects.getPostCommentsFx({postId: mediaId});
//         mediaModel.effects.getPostInsightsFX({mediaId: mediaId});
//     }
//
// }, [selectedPostId])

sample({
  clock: $selectedPostId,
  fn: (selectedPostId) => {
    return { mediaId: selectedPostId };
  },
  target: [
    getPostInsightsFx,
  ],
})

//TODO: FIX
getAllMediaPostsFx.doneData.watch(async (posts) => {
    const postsData = posts.map((post) => {
        return {
            id: post.id,
            text: post.caption ? post.caption : "NO_CAPTION",
            date_posted: post.timestamp,
            profile_id: post.owner.id,
            like_count: post.like_count,
            comment_count: post.comment_count ? post.comment_count : 0
        }
    });

    await backendAPI.postPosts(postsData);

    const comments = [];
    for (let i=0;i<posts.length;i++){
        const mediaComments = await graphApi.getMediaComments(posts[i].id)
        // console.log(mediaComments);
        // postCommentsMap[posts[i].id] = mediaComments;
        mediaComments.forEach((mediaComment) => {
            comments.push(mediaComment);
        })

    }

    const postRes = await backendAPI.postComments(comments);
    // console.log(postRes);
    if (postRes.status === 200){
        const processedComments = await backendAPI.getComments();
        console.log(processedComments);
        // processedComments
        processedCommentsChanged(processedComments.data);
        commentsStateChanged("NONE");
    }
})


export const $processedComments = createStore<ProcessedComment[]>([]);
export const processedCommentsChanged = createEvent<ProcessedComment[]>();
$processedComments.on(processedCommentsChanged, (_,data) => data);


export const $selectedPostProcessedComments = createStore<ProcessedComment[]>([]);

// TODO: transfer to feature layer



export type Thresholds = {
    insultThreshold: number,
    identityHateThreshold: number,
    obsceneThreshold: number,
    severeToxicThreshold: number,
    threatThreshold: number,
    toxicThreshold: number,
}




export const $processedCommentsWithStatus = createStore<any[]>([]);
export const processedCommentsWithStatusChanged = createEvent<any[]>();
$processedCommentsWithStatus.on(processedCommentsWithStatusChanged, (_,data) => data);




// $processedComments.watch((state) => {
//     console.log("processedCommentsWatcher");
//     console.log(state);
// })
//
// $selectedPostId.watch((state) => {
//     console.log("$selectedPostIdWatcher");
//     console.log(state);
// })



sample({
    clock: $selectedPostId,
    source: $processedComments,
    fn: (processedComments, selectedPostId) => {
        return processedComments.filter(processedComment => {
            // console.log(processedComment);
            return processedComment.post_id === selectedPostId
        })
    },
    target: [
      $selectedPostProcessedComments
    ],
})

export const $commentsState = createStore<string>("NONE");
export const commentsStateChanged = createEvent<string>();
$commentsState.on(commentsStateChanged, (_, data) => data);
