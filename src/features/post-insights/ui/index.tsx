import React from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";


import {PostEngagement} from "./post-engagement";
import {PostSaved} from "./post-saved";
import {PostReach} from "./post-reach";
import {CommentsHistogram} from "./comments-histogram";
import {CommentsStatusPieChart} from "./comments-status-pie-chart";


export const PostInsights = () => {



    return (
        <Box backgroundColor={"#FFFFFF"} padding={"15px"} width={"100%"} height={"auto"} minHeight={"100%"} borderRadius={"10px"}>
            <Heading as={"h1"} marginLeft={"auto"} marginRight={"auto"} marginBottom={"40px"}>Post insights</Heading>
            <Flex
                marginBottom={"35px"}
            >
                <PostEngagement/>
                <PostSaved/>
            </Flex>
            <Flex
                marginBottom={"35px"}
            >
                <PostReach/>
            </Flex>
            <Flex

            >
                <CommentsStatusPieChart/>
            </Flex>
        </Box>
    )
}