import React from 'react';
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react"
import { AiOutlineFund, AiOutlineHome, AiOutlineRead, AiOutlineControl } from "react-icons/ai"
import {useStore} from "effector-react";
import {CommentsServicesState} from "../../../entities/service/types";
import {serviceModel} from "../../../entities/service";


export const LeftMenuForPost = () => {

    const commentsServiceState = useStore(serviceModel.stores.$commentsServiceState);


    const changeCommentsServiceState = (newState: CommentsServicesState) => {
        serviceModel.events.updateCommentsServiceState(newState);
    }

    return (
        <Flex
            width={"195px"}
            height={"calc(100vh - 66px)"}
            minHeight={"100%"}
            backgroundColor={"#FCFCFC"}
            paddingTop={"30px"}
            flexDirection={"column"}
            paddingLeft={"5px"}
            paddingRight={"5px"}
        >
            <Box
                display={"flex"}
                height={"40px"}
                borderRadius={"4px"}
                flexDirection={"row"}
                alignItems={"center"}
                paddingLeft={"10px"}
                backgroundColor={commentsServiceState === "OVERVIEW" ? "#2F2F2F" : "#FFFFFF"}
                color={commentsServiceState === "OVERVIEW" ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                as={"button"}
                onClick={() => {
                    changeCommentsServiceState("OVERVIEW")
                }}
            >
                <Icon
                    // color={commentsServiceState === "OVERVIEW" ? "#FFFFFF" : "#2F2F2F"}
                    as={AiOutlineHome}
                />
                <Text
                    marginLeft={"7px"}
                    // color={commentsServiceState === "OVERVIEW" ? "#FFFFFF" : "#2F2F2F"}
                >
                    Overview
                </Text>
            </Box>
            <Box
                display={"flex"}
                height={"40px"}
                borderRadius={"4px"}
                flexDirection={"row"}
                alignItems={"center"}
                paddingLeft={"10px"}
                backgroundColor={commentsServiceState === "GRAPHS" ? "#2F2F2F" : "#FFFFFF"}
                color={commentsServiceState === "GRAPHS" ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                marginTop={"6px"}
                as={"button"}
                onClick={() => {
                    changeCommentsServiceState("GRAPHS")
                }}
            >
                <Icon
                    // color={commentsServiceState === "GRAPHS" ? "#FFFFFF" : "#2F2F2F"}
                    as={AiOutlineFund}
                />
                <Text
                    // color={commentsServiceState === "GRAPHS" ? "#FFFFFF" : "#2F2F2F"}
                    marginLeft={"7px"}
                >
                    Graphs
                </Text>
            </Box>
            <Box
                display={"flex"}
                height={"40px"}
                borderRadius={"4px"}
                flexDirection={"row"}
                alignItems={"center"}
                paddingLeft={"10px"}
                backgroundColor={commentsServiceState === "MANAGEMENT" ? "#2F2F2F" : "#FFFFFF"}
                marginTop={"6px"}
                color={commentsServiceState === "MANAGEMENT" ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                onClick={() => {
                    changeCommentsServiceState("MANAGEMENT")
                }}
            >
                <Icon
                    // color={commentsServiceState === "MANAGEMENT" ? "#FFFFFF" : "#2F2F2F"}
                    as={AiOutlineControl}
                />
                <Text
                    // color={commentsServiceState === "MANAGEMENT" ? "#FFFFFF" : "#2F2F2F"}
                    marginLeft={"7px"}>
                    Management
                </Text>
            </Box>
            <Box
                display={"flex"}
                height={"40px"}
                borderRadius={"4px"}
                flexDirection={"row"}
                alignItems={"center"}
                paddingLeft={"10px"}
                backgroundColor={commentsServiceState === "TUTORIALS" ? "#2F2F2F" : "#FFFFFF"}
                color={commentsServiceState === "TUTORIALS" ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                marginTop={"6px"}
                onClick={() => {
                    changeCommentsServiceState("TUTORIALS")
                }}
            >
                <Icon
                    // color={commentsServiceState === "TUTORIALS" ? "#FFFFFF" : "#2F2F2F"}
                    as={AiOutlineRead}
                />
                <Text
                    // color={commentsServiceState === "TUTORIALS" ? "#FFFFFF" : "#2F2F2F"}
                    marginLeft={"7px"}
                >
                    Tutorials
                </Text>
            </Box>
        </Flex>
    )
}