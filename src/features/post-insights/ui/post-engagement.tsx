import React from 'react';
import {useStore} from "effector-react";
import {mediaModel} from "entities/media";
import {Box, Heading, Text} from "@chakra-ui/react";



export const PostEngagement = () => {

    const postInsights = useStore(mediaModel.$postMetrics);
    console.log(postInsights);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"5px"}
            backgroundColor={"#B1D4E0"}
            padding={"7px"}
            // width={"300px"}
            // minW={"300px"}
            flexGrow={1}
            marginRight={"40px"}
        >
            <Heading as="h1" size="lg" marginBottom={"5px"}>Engagement</Heading>
            <Text marginBottom={"5px"}>Total number of likes, comments and saved of the post</Text>
            {/*<div>Period:</div>*/}
            <Text fontWeight={"bold"} fontSize={"24px"}>{postInsights["engagement"].values[0].value}</Text>
        </Box>
    )
}
