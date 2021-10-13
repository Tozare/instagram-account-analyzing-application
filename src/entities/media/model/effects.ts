import {createEffect} from "effector";
import {graphApi} from "../../../shared/api/graph-api";
import {updatePostComments, updatePosts} from "./events";


export const getAllMediaPostsFx = createEffect(async () => {
    const facebookPages = await graphApi.getFacebookPages();
    const instagramPageAccountId = await graphApi.getInstagramAccountId(facebookPages[0].id);
    const media = await graphApi.getAllMediaFromInstagramPage(instagramPageAccountId)
    // updatePosts(media);
    return media;
})



export const getPostCommentsFx = createEffect(async (params: {postId: string}) => {
    console.log("getPostCommentsFx");
    console.log(params.postId)
    const mediaComments = await graphApi.getMediaComments(params.postId);
    return mediaComments
    // updatePostComments(mediaComments);
})



