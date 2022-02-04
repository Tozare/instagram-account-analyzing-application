import React from 'react';
import {useStore} from "effector-react";
import {mediaModel} from "../../../entities/media";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {RadialChart} from "react-vis";


export const PostReach = () => {

    const postInsights = useStore(mediaModel.stores.$postMetrics);
    console.log(postInsights);

    const uniqueViewColor = "#FF9636";
    const generalViewColor = "#DAD870";
    const myData = [
        {
            angle: postInsights["reach"].values[0].value,
            radius: 50,
            label: "unique",
            padAngle: 10,
            color: uniqueViewColor
        },
        {
            angle: postInsights["impressions"].values[0].value,
            radius: 80,
            label: "general",
            padAngle: 10,
            color: generalViewColor
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
            <Heading as="h1" size="lg">Unique/Overall views</Heading>
            <Text>Unique views from total number of post views</Text>
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
                        <Text marginLeft={"2px"}>Unique views:</Text>
                        <Text fontWeight={"bold"} marginLeft={"4px"}>{postInsights["reach"].values[0].value}</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <Box w={"15px"} h={"15px"} backgroundColor={generalViewColor}/>
                        <Text marginLeft={"2px"}>General views:</Text>
                        <Text fontWeight={"bold"} marginLeft={"4px"}>{postInsights["impressions"].values[0].value}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}