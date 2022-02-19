import React, {useEffect, useState} from 'react';
import {LeftMenuForPost} from "widgets/left-menu-for-post";
import { useParams } from 'react-router-dom';
import {Comments} from "widgets/comments";
import {reflect} from "@effector/reflect";
import {Box} from "@chakra-ui/react";

interface IProps {
  // selectedPostId: string | number,
  // postComments: mediaTyping.Comment,
}

export const View = () => {
    let { mediaId } = useParams();

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




    return (
        <Box
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
        </Box>
    )
}

export const PostAnalysis = reflect({
  view: View,
  bind: {
    // selectedPostId: mediaModel.$selectedPostId,
    // postComments: mediaModel.$postComments,
  },
});
