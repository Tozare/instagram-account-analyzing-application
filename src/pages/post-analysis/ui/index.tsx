import React, {useEffect, useState} from 'react';
import { LeftMenuForPost } from "widgets/left-menu-for-post";
import { useParams } from 'react-router-dom';
import { PostCommentsAnalyzationWindow } from "widgets/comments";
import {reflect} from "@effector/reflect";
import {Box} from "@chakra-ui/react";
import { mediaModel } from "entities/media";

type Props = {
  // selectedPostId: string | number,
  // postComments: mediaTyping.Comment,
  onChangeSelectedPostId: (data: string) => void,
}

export const View = ({
  onChangeSelectedPostId,
}:Props) => {
    let { mediaId } = useParams();

    useEffect(() => {
      onChangeSelectedPostId(mediaId);
    }, [])
    // // useEffect(() => {
    // //     console.log(mediaId);
    // //     if (selectedPostId){
    // //         // mediaModel.effects.getPostCommentsFx({postId: selectedPostId});
    // //         // graphApi.getMediaInsights(mediaId);
    // //         mediaModel.effects.getPostInsightsFX({mediaId: selectedPostId});
    // //     } else if(mediaId) {
    // //         // mediaModel.effects.getPostCommentsFx({postId: mediaId});
    // //         mediaModel.effects.getPostInsightsFX({mediaId: mediaId});
    // //     }
    // //
    // // }, [selectedPostId])
    return (
        <Box
            style={{
                width: "100%",
                // minHeight: "calc(100vh - 66px)",
                height: "calc(100vh - 66px)",
                backgroundColor:"#F1F1F1",
                display: "flex",
                flexDirection: "row"
            }}
        >
            <LeftMenuForPost/>
            <PostCommentsAnalyzationWindow/>
        </Box>
    )
}

export const Post = reflect({
  view: View,
  bind: {
    onChangeSelectedPostId: mediaModel.selectedPostIdChanged,
    // selectedPostId: mediaModel.$selectedPostId,
    // postComments: mediaModel.$postComments,
  },
});
