import React, {useEffect, useState} from 'react';
import {GetFacebookToken} from "../../../shared/libs/auth/get-facebook-token";
import {mediaModel, postsModel} from "../../../entities/media";
import {PostsGrid} from "../../../widgets/posts-grid/ui";
import {Flex} from "@chakra-ui/react";
import {LeftMenuForPost} from "../../../widgets/left-menu-for-post/ui";
import { useParams } from 'react-router-dom';
import {CommentsManagement} from "../../../features/comments-management/ui";
import {Comments} from "../../../widgets/comments/ui";
import {graphApi} from "../../../shared/api/graph-api";

export const Post = () => {
    const selectedPostId = mediaModel.selectors.useSelectedPostId();
    const postComments = mediaModel.selectors.usePostComments();

    let { mediaId } = useParams();

    useEffect(() => {
        console.log(mediaId);
        if (selectedPostId){
            // mediaModel.effects.getPostCommentsFx({postId: selectedPostId});
            // graphApi.getMediaInsights(mediaId);
            mediaModel.effects.getPostInsightsFX({mediaId: selectedPostId});
        } else if(mediaId) {
            // mediaModel.effects.getPostCommentsFx({postId: mediaId});
            mediaModel.effects.getPostInsightsFX({mediaId: mediaId});
        }

    }, [selectedPostId])




    return (
        <div
            style={{
                width: "100%",
                minHeight: "calc(100vh - 66px)",
                height: "auto",
                backgroundColor:"#F1F1F1",
                display: "flex",
                flexDirection: "row"
            }}
        >
            <LeftMenuForPost/>
            <Comments/>
        </div>
    )
}