// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as selectors from "./selectors";
import * as effects from "./effects";
import {graphApi} from "../../../shared/api/graph-api";
import {postPosts} from "../../../shared/api/backend/postPosts";
import {postComments} from "../../../shared/api/backend/postComments";
import {backendAPI} from "../../../shared/api/backend";
import {combine, createEvent, createStore, sample} from "effector";
import {$posts, $selectedPostId} from "./stores";


stores
    .$posts
    .on(events.updatePosts, (state: any[], data: any[]) => {return data})
    .on(effects.getAllMediaPostsFx.doneData, (state, data) => {return data})
    // .on(events.deleteSelectedPosts, (state, data) => {
    //     const leavedPosts = state.filter(post => {
    //         if (post.id)
    //     })
    // })

stores
    .$selectedPostId
    .on(events.setPostId, (state, data) => {return data})

stores
    .$postComments
    .on(events.updatePostComments, (state,data) => {return data})
    .on(effects.getPostCommentsFx.doneData, (state, data) => {return data})
    // .on(events.deleteSelectedPostComments, (state, data) => {
    //     console.log(data);
    //     return state.filter((post) => {
    //         return !data[post.id];
    //     })
    // })
    .on(effects.deleteSelectedPostCommentsFx.doneData, (state, data) => {
        // console.log(data)
        return state.filter((post) => {
            return !data[post.id];
        })
    })


stores
    .$selectedPostCommentsIdsMap
    .on(events.setSelectedPostCommentsIdsMap, (state, data) => {return data})
    .on(events.changeSelectedPostCommentIdInMap, (state, data) => {
        if (state[data]){
            return {
                ...state,
                [data]: true
            };
        } else {
            console.log({
                ...state,
                [data]: true
            })
            return {
                ...state,
                [data]: true
            };
        }
    });


stores
    .$postMetrics
    .on(events.updatePostMetrics, (state, data) => {return data})
    .on(effects.getPostInsightsFX.doneData, (state,data) => {
        // console.log(data);
        return data
    })

stores
    .$commentsPostMap
    .on(events.updatePostCommentsMap, (state, data) => {return data})


effects.getAllMediaPostsFx.doneData.watch(async (posts) => {
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
    // console.log(posts);
    // console.log(postsData);
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

export const $processedComments = createStore<any[]>([]);
export const processedCommentsChanged = createEvent<any[]>();
$processedComments.on(processedCommentsChanged, (_,data) => data);

export const $selectedPostProcessedComments = createStore<any>([]);


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


export type Thresholds = {
    insultThreshold: number,
    identityHateThreshold: number,
    obsceneThreshold: number,
    severeToxicThreshold: number,
    threatThreshold: number,
    toxicThreshold: number,
}

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


export const $processedCommentsWithStatus = createStore<any[]>([]);
export const processedCommentsWithStatusChanged = createEvent<any[]>();
$processedCommentsWithStatus.on(processedCommentsWithStatusChanged, (_,data) => data);

sample({
    source: [$thresholds, $processedComments],
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
    target: processedCommentsWithStatusChanged
})



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
    clock: events.setPostId,
    source: $processedComments,
    fn: (processedComments, selectedPostId) => {
        // console.log("-------------------------");
        // console.log(selectedPostId);
        // console.log(processedComments);
        // console.log()
        return processedComments.filter(processedComment => {
            // console.log(processedComment);
            return processedComment.post_id === selectedPostId
        })
    },
    target: $selectedPostProcessedComments
})

export const $commentsState = createStore<string>("NONE");
export const commentsStateChanged = createEvent<string>();
$commentsState.on(commentsStateChanged, (_, data) => data);




export const mediaModel = {
    stores,
    selectors,
    events,
    effects
};
