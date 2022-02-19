import React, {FC} from 'react';
import {Grid, GridItem, Image, Flex, Text, Box} from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"

import { HamburgerIcon } from '@chakra-ui/icons'
import {mediaModel, mediaTyping} from "entities/media";
import {useHistory} from "react-router-dom";
import {reflect} from "@effector/reflect";

//id,like_count,caption,media_url,media_type,timestamp,thumbnail_url,permalink"
interface IProps {
  posts: mediaTyping.Post[],
  setSelectedPostId: (id: string) => void,
}

export const View: FC<IProps> = ({
  posts,
  setSelectedPostId,
}) => {
    const history = useHistory();
    return (
        <Grid
            h="auto"
            // templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 205px)"
            width={"auto"}
            gap={"9px"}
        >
            {
                posts.map((post)  => {
                    return <GridItem
                        width={"205px"}
                        height={"auto"}
                        display={"flex"}
                        flexDirection={"column"}
                        // backgroundColor={"#F6AD55"}
                        // border={"1px solid #A0AEC0"}
                        borderRadius={"3px"}
                        boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.22)"}
                        // _hover={{borderColor: "#ED8936"}}
                    >
                        <Flex justifyContent={"space-between"} padding={"5px"}>
                            <Flex flexDirection={"column"}>
                                <Text>{post.media_type}</Text>
                            </Flex>
                            <Menu>
                                <MenuButton>
                                    <HamburgerIcon/>
                                </MenuButton>
                                <MenuList

                                >
                                    <MenuItem
                                        onClick={() => {
                                            setSelectedPostId(post.id);
                                            history.push(`media/${post.id}`)
                                        }}
                                    >
                                        Open
                                    </MenuItem>
                                    <MenuItem>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        <Box width={"100%"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            {
                                post.media_type === "IMAGE" && <Image maxWidth={"100%"} src={post.media_url}/>
                            }
                            {
                                post.media_type === "VIDEO" && <Image maxWidth={"100%"} src={post.thumbnail_url}/>
                            }
                        </Box>
                        <Box
                            height={"auto"}
                            padding={"5px"}
                        >
                            <Text fontWeight={500}>{post.like_count} likes</Text>
                            <Text>{post.caption}</Text>
                        </Box>
                    </GridItem>
                })
            }
        </Grid>
    )
}

export const PostsGrid = reflect({
  view: View,
  bind: {
    posts: mediaModel.$posts,
    setSelectedPostId: mediaModel.selectedPostIdChanged,
  },
})
