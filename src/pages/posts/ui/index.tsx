import React, {useEffect, useState, FC} from 'react';
import {PostsGrid} from "widgets/posts-grid";
import {Flex} from "@chakra-ui/react";
import {mediaModel} from "entities/media";
import {reflect} from "@effector/reflect";

interface IProps {
  requestInstagramPagePosts: () => void,
}


export const View: FC<IProps> = ({
  requestInstagramPagePosts,
}) => {

    useEffect(() => {
      requestInstagramPagePosts();
    }, [])

    return (
        <div
            style={{
                width: "100%",
                height: "calc(100vh - 66px)",
                backgroundColor:"#F1F1F1",
                display: "flex",
                flexDirection: "row"
            }}
        >
            <Flex
                height={"100%"}
                flexGrow={1}
                flexDirection={"column"}
                alignItems={"center"}
                marginTop={"50px"}
            >
                <PostsGrid/>
            </Flex>
        </div>
    )
}

export const Posts = reflect({
  view: View,
  bind: {
    requestInstagramPagePosts: mediaModel.instagramPagePostsRequested,
  }
})

