import React from 'react';
import {Box, Flex, Image} from "@chakra-ui/react";
import { CommentsManagement } from "features/comments-management/ui";
import {useStore} from "effector-react";
import { postMenuServicesModel, postMenuServicesConfig } from "entities/post-menu-services";
import type { CommentsServicesState } from "entities/post-menu-services";
import {PostInsights} from "features/post-insights";
import { DateCommentGraph } from "features/comments-management";
import {reflect} from "@effector/reflect";
import {ClusterCommentsGraph} from "features/comments-management/ui/cluster-comments-graph";


type Props = {
  postMenuService: CommentsServicesState,
}

export const PostCommentsAnalyzationWindowView = ({
  postMenuService,
}: Props) => {

    let renderWindow = <CommentsManagement/>
    if (postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.OVERVIEW){
        // renderWindow = <PostInsights/>
      renderWindow = <DateCommentGraph/>
    } else if (postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.CLUSTER_GRAPH){
      renderWindow = <ClusterCommentsGraph />
    } else if (postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.GRAPHS){
      renderWindow = < PostInsights/>
    } else if (postMenuService === postMenuServicesConfig.POST_MENU_SERVICES.MANAGEMENT){
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
                        Please, wait :)
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

export const PostCommentsAnalyzationWindow = reflect({
  view: PostCommentsAnalyzationWindowView,
  bind: {
    postMenuService: postMenuServicesModel.$postMenuService,
  }
})
