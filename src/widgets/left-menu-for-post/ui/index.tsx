import React, {FC} from 'react';
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react"
import { AiOutlineFund, AiOutlineHome, AiOutlineRead, AiOutlineControl } from "react-icons/ai"

import {postMenuServicesModel, postMenuServicesTyping, postMenuServicesConfig} from "entities/post-menu-services";
import {reflect} from "@effector/reflect";

interface IProps {
  postMenuService: postMenuServicesTyping.CommentsServicesState,
  changePostMenuService: (data: postMenuServicesTyping.CommentsServicesState) => void,
}

const View: FC<IProps> = ({
  postMenuService,
  changePostMenuService,
}) => {

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
                backgroundColor={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.OVERVIEW ? "#2F2F2F" : "#FFFFFF"}
                color={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.OVERVIEW ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                as={"button"}
                onClick={() => {
                    changePostMenuService(postMenuServicesConfig.POST_MENU_SERVICES.OVERVIEW)
                }}
            >
                <Icon
                    as={AiOutlineHome}
                />
                <Text
                    marginLeft={"7px"}
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
                backgroundColor={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.GRAPHS ? "#2F2F2F" : "#FFFFFF"}
                color={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.GRAPHS ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                marginTop={"6px"}
                as={"button"}
                onClick={() => {
                    changePostMenuService(postMenuServicesConfig.POST_MENU_SERVICES.GRAPHS)
                }}
            >
                <Icon
                    as={AiOutlineFund}
                />
                <Text
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
                backgroundColor={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.MANAGEMENT ? "#2F2F2F" : "#FFFFFF"}
                marginTop={"6px"}
                color={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.MANAGEMENT ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                onClick={() => {
                    changePostMenuService(postMenuServicesConfig.POST_MENU_SERVICES.MANAGEMENT)
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
                backgroundColor={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.TUTORIALS ? "#2F2F2F" : "#FFFFFF"}
                color={postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.TUTORIALS ? "#FFFFFF" : "#2F2F2F"}
                _hover={{backgroundColor: "#2F2F2F", color: "#FFFFFF"}}
                marginTop={"6px"}
                onClick={() => {
                    changePostMenuService(postMenuServicesConfig.POST_MENU_SERVICES.TUTORIALS)
                }}
            >
                <Icon
                    as={AiOutlineRead}
                />
                <Text
                    marginLeft={"7px"}
                >
                    Tutorials
                </Text>
            </Box>
        </Flex>
    )
}

export const LeftMenuForPost = reflect({
  view: View,
  bind: {
    postMenuService: postMenuServicesModel.$postMenuService,
    changePostMenuService: postMenuServicesModel.postMenuServiceChanged,
  },
})
