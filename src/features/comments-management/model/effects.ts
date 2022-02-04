import {createEffect} from "effector";
import {graphApi} from "../../../shared/api/graph-api";

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
    // updatePostComments(mediaComments);
})
