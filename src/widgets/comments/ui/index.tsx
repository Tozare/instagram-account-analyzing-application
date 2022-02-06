import React from 'react';
import {Box, Flex, Image} from "@chakra-ui/react";
import {CommentsManagement} from "../../../features/comments-management/ui";
import {useStore} from "effector-react";
import {serviceModel} from "entities/post-menu-services";
import {PostInsights} from "features/post-insights";

export const Comments = () => {

    let renderWindow = <CommentsManagement/>
    const commentsServiceState = useStore(serviceModel.stores.$commentsServiceState);
    if (commentsServiceState === "OVERVIEW"){
        renderWindow = <PostInsights/>
    } else if (commentsServiceState === "MANAGEMENT"){
        renderWindow = <CommentsManagement/>
    } else {
        renderWindow =
            <Flex
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Flex
                    width={"500px"}
                    height={"auto"}
                    padding={"25px"}
                    borderRadius={"12px"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    backgroundImage={"linear-gradient(to right, #fc5c7d, #6a82fb)"}
                >
                    <Image
                        width={"200px"}
                        height={"200px"}
                        borderRadius={"100px"} src={'../../../../images/rocket.png'}
                    />
                    <Box
                        marginTop={"10px"}
                        fontSize={"20px"}
                        fontWeight={500}
                    >
                        Coming soon
                    </Box>
                    <Box
                        marginTop={"10px"}
                    >
                        We are working hard to improve our application
                    </Box>
                </Flex>
            </Flex>
    }

    return (
        <Box
            flexGrow={1}
            height={"auto"}
            paddingLeft={"30px"}
            paddingRight={"30px"}
            paddingTop={"30px"}
            paddingBottom={"30px"}
        >
            {
                renderWindow
            }
        </Box>
    )
}
