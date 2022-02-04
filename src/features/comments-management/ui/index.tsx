import React, {useEffect, useState} from 'react';
import {mediaModel, mediaModelUpdated} from "../../../entities/media";
import {
    Box,
    Button,
    Checkbox,
    Flex, Grid, GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    FormControl,
    FormLabel,
    Spinner
} from "@chakra-ui/react";


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from "@chakra-ui/react"


import {SearchIcon, CloseIcon} from "@chakra-ui/icons";
import {useStore} from "effector-react";
import {commentsManagementModel} from "../model";
import {graphApi} from "../../../shared/api/graph-api";
import {useParams} from "react-router-dom";




export const CommentsManagement = () => {
    const selectedPostId = mediaModel.selectors.useSelectedPostId();
    const postComments = useStore(mediaModelUpdated.$processedCommentsWithStatus);
    console.warn("check for post comments")
    console.log(postComments);
    // console.log(selectedPostId);
    const thresholds = useStore(mediaModelUpdated.$thresholds);
    const statusFilter = useStore(commentsManagementModel.stores.$statusFilter);
    const searchFilter = useStore(commentsManagementModel.stores.$searchFilter);
    const filteredPosts = useStore(commentsManagementModel.stores.$filteredComments);

    const selectedPostCommentsIdsMap = useStore(mediaModel.stores.$selectedPostCommentsIdsMap);

    const isReplyCommentModalOpen = useStore(commentsManagementModel.stores.$isReplyCommentModalOpen);
    const replyCommentText = useStore(commentsManagementModel.stores.$replyText);

    const toast = useToast()
    const [loadingState, setLoadingState] = useState("NONE");
    let { mediaId } = useParams();
    useEffect(() => {
        commentsManagementModel.events.filter({
            posts: postComments,
            searchFilter: searchFilter,
            statusFilter: statusFilter
        })
    }, [postComments, statusFilter, searchFilter])

    useEffect(() => {

    }, [thresholds])

    useEffect(() => {
        mediaModel.events.setPostId(mediaId);
    }, [])

    useEffect(() => {
        if (selectedPostId){
            graphApi.getMediaInsights(selectedPostId);
        }
    })


    return (
        <Flex
            width={"100%"}
            height={"100%"}
            backgroundColor={"#FFFFFF"}
            padding={"15px"}
            borderRadius={"8px"}
            flexDirection={"column"}
        >
            <Modal
                isOpen={isReplyCommentModalOpen}
                onClose={() => {
                    commentsManagementModel.events.setIsReplyCommentModal(false);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reply to comments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>
                                Reply message
                            </FormLabel>
                            <Input
                                value={replyCommentText}
                                onChange={(e) => {
                                    commentsManagementModel.events.setReplyText(e.target.value);
                                }}
                                placeholder="Reply message"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="green"
                            onClick={() => {
                                setLoadingState("REPLYING");
                                commentsManagementModel.effects.replyCommentFx({
                                    replyText: replyCommentText,
                                    selectedPostComments: selectedPostCommentsIdsMap
                                }).then(() => {
                                    toast({
                                        title: "Comments were replied",
                                        description: "Replies will be sent successfully",
                                        status: "success",
                                        duration: 4500,
                                        isClosable: true,
                                    })
                                    setLoadingState("NONE");
                                });
                            }}
                        >
                            {loadingState === "REPLYING" ? <div><Spinner/></div> : <div>Reply</div>}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex width={"100%"}  height={"38px"} marginBottom={"15px"}>
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
                            value={searchFilter}
                            onChange={(e) => {
                                commentsManagementModel.events.setSearchFilter(e.target.value);
                            }}
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
                        onChange={(e) => {
                            commentsManagementModel.events.setStatusFilter(e.target.value);
                        }}
                    >
                        <option value="ALL">All</option>
                        <option value="NEGATIVE">Negative</option>
                        <option value="POSITIVE">Positive</option>
                        <option value="NEUTRAL">Neutral</option>
                    </Select>
                </Box>
                <Box marginRight={"10px"}>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#c5eff7"}
                        onClick={() => {
                            //TODO: get all ids map
                        }}
                    >
                        Select all
                    </Button>
                </Box>
                <Box marginRight={"10px"}>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#8ecc8e"}
                        onClick={() => {
                            commentsManagementModel.events.setIsReplyCommentModal(true);
                        }}
                    >
                        Reply
                    </Button>
                </Box>
                <Box>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#FFCCCC"}
                        onClick={() => {
                            setLoadingState("DELETION");
                            mediaModel.effects.deleteSelectedPostCommentsFx({
                                selectedPostComments: selectedPostCommentsIdsMap
                            }).then(() => {
                                toast({
                                    title: "Comments were deleted",
                                    description: "Selected comments of the post were successfully deleted",
                                    status: "success",
                                    duration: 4500,
                                    isClosable: true,
                                });
                                setLoadingState("NONE");
                            });
                        }}
                    >
                        {
                            loadingState === "DELETION"
                                ? <div>
                                    <Spinner/>
                                </div>
                                : <div>Delete</div>
                        }
                    </Button>
                </Box>
            </Flex>
            {/*<Box*/}
            {/*    width={"500px"}*/}
            {/*    height={"100%"}*/}
            {/*    overflow={"scroll"}*/}
            {/*>*/}
                <Grid
                    width={"100%"}
                    gridTemplateColumns={"repeat(7, auto)"}
                    flexGrow={1}
                    height={"auto"}
                    overflow={"auto"}
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
                        borderBottomRightRadius={"8px"}
                    >
                        <Box marginLeft={"5px"}>
                            SELECT
                        </Box>
                    </Box>
                    {/*</GridItem>*/}
                    {
                        filteredPosts.map(postComment => {
                            const commentListItem =
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
                                            borderRadius={"4px"}
                                            textAlign={"center"}
                                            backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}
                                        >
                                            {postComment.status === "POSITIVE" ? "non-negative" : "negative"}
                                        </Box>
                                    </Box>
                                    <Box >
                                        <Box
                                            height={"100%"}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            marginLeft={"5px"}
                                            marginRight={"5px"}
                                        >
                                            <Checkbox
                                                isChecked={selectedPostCommentsIdsMap[postComment.id] === true}
                                                onChange={() => {
                                                    mediaModel.events.changeSelectedPostCommentIdInMap(postComment.id);
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </>
                            // </Flex>
                            if (postComment.replies && postComment.replies.length > 0){
                                return (
                                    <>
                                        {commentListItem}
                                        {
                                            postComment.replies.map((postComment) => {
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
                                                                borderRadius={"4px"}
                                                                textAlign={"center"}
                                                                backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}
                                                            >
                                                                {postComment.status}
                                                            </Box>
                                                        </Box>
                                                        <Box >
                                                            <Box
                                                                height={"100%"}
                                                                display={"flex"}
                                                                alignItems={"center"}
                                                                justifyContent={"center"}
                                                                marginLeft={"5px"}
                                                                marginRight={"5px"}
                                                            >
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
            {/*</Box>*/}
        </Flex>
    )
}