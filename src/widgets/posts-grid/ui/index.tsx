import React from 'react';
import {mediaModel} from "../../../entities/media";
import {Grid, GridItem, Image, AspectRatio, Flex, Text, Box} from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
} from "@chakra-ui/react"

import { HamburgerIcon } from '@chakra-ui/icons'
import {useHistory} from "react-router-dom";

//id,like_count,caption,media_url,media_type,timestamp,thumbnail_url,permalink"
export const PostsGrid = () => {
    const posts = mediaModel.selectors.usePosts();

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
                                            mediaModel.events.setPostId(post.id);
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
                        {/*{*/}
                        {/*    post.media_type === "IMAGE" && <Image maxWidth={"190px"} src={post.media_url}/>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    post.media_type === "VIDEO" && <Image maxWidth={"190px"} src={post.thumbnail_url}/>*/}
                        {/*}*/}
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