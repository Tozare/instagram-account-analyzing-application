import React, {useEffect, useState} from 'react';
import {mediaModel} from "../../../entities/media";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {HorizontalGridLines, RadialChart, VerticalGridLines, VerticalRectSeries, XAxis, XYPlot, YAxis} from "react-vis";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"

const ONE_DAY = 86400000;
const timestamp = new Date('October 14 2021').getTime();
const DATA = [
    {x0: ONE_DAY, x: ONE_DAY, y: 5},
    {x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1},
    {x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1},
    {x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2},
    {x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2},
    {x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1},
    {x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5},
    {x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1}
].map(el => ({x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y}));

export const CommentsHistogram = () => {
    const postComments = mediaModel.selectors.usePostComments();
    const [graphData, setGraphData] = useState([]);
    const [startDate, setStartDate] = useState(new Date("2021-10-14"));
    const [endDate, setEndDate] = useState(new Date("2021-10-21"));
    useEffect(() => {
        const commentsCount = {};

        let proccessedComments = postComments.map((postComment) => {
            const timestampInMs = Date.parse(postComment.timestamp);
            const date = new Date(timestampInMs);
            const year = date.getFullYear();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            console.log(year + "-" + (month >= 10 ? month : ("0"+month)) + "-" + day);
            const proccessedDate = new Date(year + "-" + (month >= 9 ? (month+1) : ("0"+(month+1))) + "-" + day);
            console.log(proccessedDate);
            const ms = proccessedDate.getTime();
            console.log(ms);
            if (commentsCount[ms]){
                commentsCount[ms]++;
            } else {
                commentsCount[ms] = 1
            }
            return ms;
        })
        const newGraphData = Object.keys(commentsCount).map(ms => {
            return {
                x0: parseInt(ms),
                x: parseInt(ms) + ONE_DAY,
                y: commentsCount[ms]
            }
        });

        console.log(newGraphData);
        setGraphData(newGraphData);
    }, [postComments])

    // console.log(postComments);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"5px"}
            backgroundColor={"#B1D4E0"}
            padding={"7px"}
            width={"600px"}
            height={"600px"}
            alignItems={"center"}
        >
            <Heading as="h1" size="lg">Histogram</Heading>
            <Text>How many comments were created at proper date</Text>
            <Flex>
                <Box
                    position={"relative"}
                    height={"32px"}
                    width={"100%"}
                    backgroundColor={"ghostwhite"}
                >
                    <Box
                        position={"absolute"}
                        width={"100%"}
                        height={"100%"}
                        left={"0px"}
                        top={"0px"}
                        zIndex={10000}
                        backgroundColor={"green"}
                    >
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {setStartDate(date)}}
                        />
                    </Box>
                    <Box>
                        <Text>
                            Select date
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </Box>
            </Flex>
            <Flex
                alignItems={"center"}
            >
                <XYPlot
                    xDomain={[startDate.getTime(), endDate.getTime() + ONE_DAY]}
                    yDomain={[0, 100]}
                    xType="time"
                    width={400}
                    height={300}
                >
                    <HorizontalGridLines style={{strokeWidth: 1}}/>
                    <VerticalGridLines style={{strokeWidth: 1}}/>
                    <XAxis tickTotal={7} tickSize={1} tickFormat={(t, i) => {
                        return (<tspan>
                        <tspan x="0" dy="1em">{t.getDate()}</tspan>
                        </tspan>);}}
                        />
                    <YAxis/>
                    <VerticalRectSeries data={graphData}/>
                </XYPlot>
            </Flex>
        </Box>
    )

}