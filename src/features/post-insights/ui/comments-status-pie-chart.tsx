import React from 'react';
import {useStore} from "effector-react";
import {mediaModel, mediaModelUpdated} from "../../../entities/media";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {RadialChart} from "react-vis";


export const CommentsStatusPieChart = () => {

    const postComments = useStore(mediaModelUpdated.$processedCommentsWithStatus);
    const negativeComments = postComments.filter((postComment) => {
        if (postComment.status === "POSITIVE" ){
            return false;
        } else {
            return true;
        }
    })
    const uniqueViewColor = "#FFCCCC";
    const generalViewColor = "#8ecc8e";
    const myData = [
        {
            angle: negativeComments.length,
            radius: 50,
            label: "negative",
            padAngle: 10,
            color: "#FFCCCC"
        },
        {
            angle: postComments.length,
            radius: 80,
            label: "all",
            padAngle: 10,
            color: "#8ecc8e"
        }]


    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"5px"}
            backgroundColor={"#B1D4E0"}
            padding={"7px"}
            width={"100%"}
            alignItems={"center"}
        >
            <Heading as="h1" size="lg">Negative comments</Heading>
            <Text>Number of negative comments</Text>
            {/*<div>Period:</div>*/}
            <Flex
                alignItems={"center"}
            >
                <RadialChart
                    data={myData}
                    width={300}
                    height={300}
                    innerRadius={50}
                    labelsAboveChildren={true}
                    showLabels={true}
                    animation={true}
                    colorType="literal"
                />
                <Box>
                    <Flex alignItems={"center"}>
                        <Box w={"15px"} h={"15px"} backgroundColor={uniqueViewColor}/>
                        <Text marginLeft={"2px"}>Negative comments</Text>
                        <Text fontWeight={"bold"} marginLeft={"4px"}>{negativeComments.length}</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <Box w={"15px"} h={"15px"} backgroundColor={generalViewColor}/>
                        <Text marginLeft={"2px"}>All comments</Text>
                        <Text fontWeight={"bold"} marginLeft={"4px"}>{postComments.length}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}