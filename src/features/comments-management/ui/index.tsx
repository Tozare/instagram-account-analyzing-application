import React from 'react';
import {mediaModel} from "../../../entities/media";
import {
    Box,
    Button,
    Checkbox,
    Flex, Grid, GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select
} from "@chakra-ui/react";
import {SearchIcon, CloseIcon} from "@chakra-ui/icons";


export const CommentsManagement = () => {
    const selectedPostId = mediaModel.selectors.useSelectedPostId();
    const postComments = mediaModel.selectors.usePostComments();


    // const comment
    console.log(postComments);

    return (
        <Box
            width={"100%"}
            height={"100%"}
            backgroundColor={"#FFFFFF"}
            padding={"15px"}
            borderRadius={"8px"}
        >
            <Flex width={"100%"} marginBottom={"15px"}>
                <Box width={"400px"} height={"38px"} marginRight={"auto"}>
                    <InputGroup
                        height={"38px"}
                    >
                        <InputLeftElement
                            height={"38px"}
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children={<SearchIcon/>}
                        />
                        <Input
                            height={"38px"}
                            placeholder="Type to search"
                        />
                        <InputRightElement
                            height={"38px"}
                            children={<CloseIcon color={"#2f2f2f"} />}
                        />
                    </InputGroup>
                </Box>
                <Box marginRight={"10px"}>
                    <Select
                        width={"150px"}
                        height={"38px"}
                        defaultValue={"all"}
                        border={"1px solid gray"}
                    >
                        <option value="all">All</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                    </Select>
                </Box>
                <Box marginRight={"10px"}>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#c5eff7"}
                    >
                        Select all
                    </Button>
                </Box>
                <Box marginRight={"10px"}>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#8ecc8e"}
                    >
                        Reply
                    </Button>
                </Box>
                <Box>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#FFCCCC"}
                    >
                        Delete
                    </Button>
                </Box>
            </Flex>
            <Grid
                width={"100%"}
                gridTemplateColumns={"repeat(7, auto)"}
            >
                {/*<GridItem*/}
                {/*    colStart={1}*/}
                {/*    colEnd={8}*/}
                {/*    // width={"100%"}*/}
                {/*    display={"flex"}*/}
                {/*    justifyContent={"space-between"}*/}
                {/*    alignItems={"center"}*/}
                {/*    backgroundColor={"#bdc3c7"}*/}
                {/*    height={"30px"}*/}
                {/*    borderRadius={"8px"}*/}
                {/*>*/}
                    {/*<Box flexGrow={1}>*/}
                    {/*    <Box marginLeft={"7px"}>*/}
                    {/*        ID*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                        borderTopLeftRadius={"8px"}
                        borderBottomLeftRadius={"8px"}
                    >
                        <Box marginLeft={"5px"}>
                            FROM
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                    >
                        <Box marginLeft={"5px"} >
                            TO
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                    >
                        <Box marginLeft={"5px"} >
                            DATE
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                    >
                        <Box marginLeft={"5px"} >
                            TEXT
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                    >
                        <Box marginLeft={"5px"}>
                            LIKES
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                    >
                        <Box marginLeft={"5px"}>
                            STATUS
                        </Box>
                    </Box>
                    <Box
                        backgroundColor={"#bdc3c7"}
                        height={"30px"}
                        borderTopRightRadius={"8px"}
                        borderTopBottomRadius={"8px"}
                    >
                        <Box marginLeft={"5px"}>
                            SELECT
                        </Box>
                    </Box>
                {/*</GridItem>*/}
                {
                    postComments.map(postComment => {
                        const commentListItem =
                        //     <Flex
                        //     width={"100%"}
                        //     justifyContent={"space-between"}
                        //     alignItems={"center"}
                        //     backgroundColor={"#bdc3c7"}
                        //     height={"30px"}
                        //     borderRadius={"8px"}
                        // >
                        //     <Box flexGrow={1}>
                        //         <Box marginLeft={"7px"}>
                        //             {postComment.id}
                        //         </Box>
                        //     </Box>
                        <>
                            <Box>
                                <Box marginLeft={"5px"}>
                                    {postComment.username}
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    POST
                                </Box>
                            </Box>
                            <Box >
                                <Box marginLeft={"5px"} marginRight={"5px"}>
                                    03.06.2000 & 18:00
                                </Box>
                            </Box>
                            <Box >
                                <Box marginLeft={"5px"} marginRight={"5px"}>
                                    {postComment.text}
                                </Box>
                            </Box>
                            <Box >
                                <Box marginLeft={"5px"} marginRight={"5px"}>
                                    LIKES
                                </Box>
                            </Box>
                            <Box >
                                <Box
                                    marginLeft={"5px"}
                                    marginRight={"5px"}
                                    marginTop={"3px"}
                                    marginBottom={"3px"}
                                    backgroundColor={"#8ecc8e"}
                                >
                                    positive
                                </Box>
                            </Box>
                            <Box >
                                <Box marginLeft={"5px"} marginRight={"5px"}>
                                    <Checkbox/>
                                </Box>
                            </Box>
                        </>
                        // </Flex>
                        if (postComment.replies && postComment.replies.data.length > 0){
                            return (
                                <>
                                    {commentListItem}
                                    {
                                        postComment.replies.data.map((postComment) => {
                                            const commentListItem =
                                            //     <Flex
                                            //     width={"100%"}
                                            //     justifyContent={"space-between"}
                                            //     alignItems={"center"}
                                            //     backgroundColor={"#bdc3c7"}
                                            //     height={"30px"}
                                            //     borderRadius={"8px"}
                                            // >
                                            //     <Box flexGrow={1}>
                                            //         <Box marginLeft={"7px"}>
                                            //             {postComment.id}
                                            //         </Box>
                                            //     </Box>
                                            <>
                                                <Box >
                                                    <Box marginLeft={"5px"}>
                                                        {postComment.username}
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Box marginLeft={"5px"}>
                                                        REPLY
                                                    </Box>
                                                </Box>
                                                <Box >
                                                    <Box marginLeft={"5px"}>
                                                        03.06.2000 & 18:00
                                                    </Box>
                                                </Box>
                                                <Box >
                                                    <Box marginLeft={"5px"}>
                                                        {postComment.text}
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Box marginLeft={"5px"}>
                                                        Unavailable
                                                    </Box>
                                                </Box>
                                                <Box >
                                                    <Box
                                                        marginLeft={"5px"}
                                                        marginRight={"5px"}
                                                        marginTop={"3px"}
                                                        marginBottom={"3px"}
                                                        backgroundColor={"#8ecc8e"}
                                                    >
                                                        positive
                                                    </Box>
                                                </Box>
                                                <Box >
                                                    <Box marginLeft={"5px"} marginRight={"5px"}>
                                                        <Checkbox/>
                                                    </Box>
                                                </Box>
                                                </>
                                            // </Flex>
                                            return commentListItem;
                                        })
                                    }
                                </>
                            )
                        } else {
                            return commentListItem;
                        }
                    })
                }
            </Grid>
        </Box>
    )
}