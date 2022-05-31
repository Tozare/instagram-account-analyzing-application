import React from 'react';
import {useStore} from "effector-react";
import {mediaModel} from "entities/media";
import {Box, Heading, Text} from "@chakra-ui/react";



export const PostSaved = () => {

    const postInsights = useStore(mediaModel.$postMetrics);
    console.log(postInsights);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"5px"}
            backgroundColor={"#B1D4E0"}
            padding={"7px"}
            // minW={"300px"}
            // width={"auto"}
            flexGrow={1}
        >
            <Heading as="h1" size="lg" marginBottom={"5px"}>Saved</Heading>
            <Text marginBottom={"5px"}>Total number of saves of the post</Text>
            {/*<div>Period:</div>*/}
            <Text fontWeight={"bold"} fontSize={"24px"}>{postInsights["saved"].values[0].value}</Text>
        </Box>
    )
}
