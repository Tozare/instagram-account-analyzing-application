import React, {useEffect, useState} from 'react';
import {PostsGrid} from "../../../widgets/posts-grid/ui";
import {Flex} from "@chakra-ui/react";
import {mediaModel} from "../../../entities/media/model";

export const Posts = () => {

    useEffect(() => {
        mediaModel.effects.getAllMediaPostsFx();
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