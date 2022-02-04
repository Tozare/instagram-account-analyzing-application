import {createEffect} from "effector";
import {graphApi} from "../../../shared/api/graph-api";
import {updatePostComments, updatePosts} from "./events";
import * as events from "./events";


export const getAllMediaPostsFx = createEffect(async (): Promise<any[]> => {
    const facebookPages = await graphApi.getFacebookPages();
    const instagramPageAccountId = await graphApi.getInstagramAccountId(facebookPages[0].id);
    const media = await graphApi.getAllMediaFromInstagramPage(instagramPageAccountId)
    // updatePosts(media);



    return media;
})



export const getPostCommentsFx = createEffect(async (params: {postId: string}) => {
    const mediaComments = await graphApi.getMediaComments(params.postId);
    return mediaComments
    // updatePostComments(mediaComments);
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
    // updatePostComments(mediaComments);
})


export const getPostInsightsFX = createEffect(async (params: {mediaId: number|string}): any => {
    const postInsights = await graphApi.getMediaInsights(params.mediaId);
    //
    // console.log(postInsights);
    const insights = {}
    postInsights.forEach((insight) => {
        insights[insight.name] = insight
        // console.log(insight);
    })


    return insights;
})






