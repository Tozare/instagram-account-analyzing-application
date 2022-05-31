import React, { useEffect, useState } from 'react';
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
    Spinner,
    Text,
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
import {useParams} from "react-router-dom";
import {reflect} from "@effector/reflect";
import { mediaModel } from "entities/media";
import * as commentsManagementModel from "../model";
// import {$processedCommentsWithStatus} from "../model";


type Props = {
  postComments: any[],
  statusFilter: any,
  onChangeStatusFilter: (data: any) => void,
  searchFilter: any,
  onChangeSearchFilter: (data: any) => void,
  filteredComments: any,
  isReplyCommentModalOpen: boolean,
  replyCommentText: string,
  setIsReplyCommentModalOpen: (data: boolean) => void,
  setReplyText: (data: string) => void,
  selectedCommentsIds: Record<string|number, boolean>,
  onToggleCommentSelection: (data: string|number) => void,
  isCommentsLoading: boolean,
}

export const View = ({
  postComments,
  statusFilter,
  searchFilter,
  filteredComments,
  isReplyCommentModalOpen,
  replyCommentText,
  setIsReplyCommentModalOpen,
  setReplyText,
  onChangeSearchFilter,
  onChangeStatusFilter,
  selectedCommentsIds,
  onToggleCommentSelection,
  isCommentsLoading,
}: Props) => {
    const toast = useToast()
    const [loadingState, setLoadingState] = useState("NONE");
    let { mediaId } = useParams();
    console.log(postComments);


    return (
        <Box
          display={"flex"}
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
                  setIsReplyCommentModalOpen(false);
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
                                    setReplyText(e.target.value);
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
                                commentsManagementModel.replyCommentFx({
                                    replyText: replyCommentText,
                                    selectedPostComments: selectedCommentsIds,
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
                              onChangeSearchFilter(e.target.value);
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
                        defaultValue={"ALL"}
                        border={"1px solid gray"}
                        onChange={(e) => {
                          onChangeStatusFilter(e.target.value);
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
                            setIsReplyCommentModalOpen(true);
                        }}
                    >
                        Reply
                    </Button>
                </Box>
              <Box marginRight={"10px"}>
                <Button
                  width={"150px"}
                  height={"38px"}
                  // backgroundColor={"#FFCCCC"}
                  onClick={() => {
                    setLoadingState("DELETION");
                    mediaModel.deleteSelectedPostCommentsFx({
                      selectedPostComments: selectedCommentsIds,
                    }).then(() => {
                      toast({
                        title: "Comments were deleted",
                        description: "Selected comments of the post-analysis were successfully deleted",
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
                      : <div>Spam</div>
                  }
                </Button>
              </Box>
                <Box>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#FFCCCC"}
                        onClick={() => {
                            setLoadingState("DELETION");
                            mediaModel.deleteSelectedPostCommentsFx({
                                selectedPostComments: selectedCommentsIds,
                            }).then(() => {
                                toast({
                                    title: "Comments were deleted",
                                    description: "Selected comments of the post-analysis were successfully deleted",
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
            <Box
              // backgroundColor="green"
              width="100%"
              display={"flex"}
              flexDirection={"column"}
              // height="calc(100% - 53px)"
              flex={1}
            >
              <Box
                width="100%"
                height={"30px"}
                display="flex"
                flexDirection="row"
                marginBottom={"6px"}
              >
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  borderTopLeftRadius={"8px"}
                  borderBottomLeftRadius={"8px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    FROM
                  </Box>
                </Box>
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    TO
                  </Box>
                </Box>
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    DATE
                  </Box>
                </Box>
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    TEXT
                  </Box>
                </Box>
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    STATUS
                  </Box>
                </Box>
                <Box
                  flex={1}
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    Tags
                  </Box>
                </Box>
                <Box
                  backgroundColor={"#bdc3c7"}
                  height={"30px"}
                  borderTopRightRadius={"8px"}
                  borderBottomRightRadius={"8px"}
                  flex={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    SELECT
                  </Box>
                </Box>
              </Box>
              {
                isCommentsLoading
                  ? <Box
                    width="100%"
                    flex={1}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text marginRight={"4px"}>Comments are loading</Text>
                    <Spinner/>
                  </Box>
                  :
                  <Box
                    width="100%"
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    overflowY="scroll"
                    maxHeight={"500px"}
                  >
                    {
                      filteredComments.map(postComment => {

                        const date = new Date(Date.parse(postComment.date_posted));

                        const commentListItem =
                          <Box
                            display="flex"
                            flexDirection="row"
                            width="100%"
                            marginBottom={"3px"}
                            // height={"30px"}
                          >
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text>
                                {postComment.username}
                              </Text>
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text>
                                POST
                              </Text>
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text>
                                {`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`}
                              </Text>
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                              // maxWidth={"calc(100% / 7)"}
                            >
                              <Text
                                // width={"calc(100% / 7)"}
                                // overflow={"hidden"}
                                // whiteSpace={"nowrap"}
                              >
                                {postComment.text}
                              </Text>
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                padding={"3px"}
                                borderRadius={"4px"}
                                textAlign={"center"}
                                backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}
                              >
                                {postComment.status === "POSITIVE" ? "non-negative" : "negative"}
                              </Box>
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                              flexWrap="wrap"
                            >
                              {
                                postComment.statusTags.length >= 1
                                  ? postComment.statusTags.map(statusTag => {
                                    return (
                                      <Box
                                        padding={"3px"}
                                        borderRadius={"4px"}
                                        textAlign={"center"}
                                        backgroundColor={"#ecf0f1"}
                                        marginRight="3px"
                                      >
                                        {statusTag.toLowerCase()}
                                      </Box>
                                    )
                                  })
                                  : (
                                    <Box
                                      padding={"3px"}
                                      borderRadius={"4px"}
                                      textAlign={"center"}
                                      backgroundColor={"#ecf0f1"}
                                      marginRight="3px"
                                    >
                                      {"none"}
                                    </Box>
                                  )
                              }
                            </Box>
                            <Box
                              flex={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <Checkbox
                                  isChecked={selectedCommentsIds[postComment.id]}
                                  onChange={() => {
                                    onToggleCommentSelection(postComment.id);
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        // </Flex>
                        if (postComment.replies && postComment.replies.length > 0){
                          return (
                            <>
                              {commentListItem}
                              {
                                postComment.replies.map((postComment) => {
                                  const commentListItem =
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      width="100%"
                                      marginBottom={"3px"}
                                      // height={"30px"}
                                    >
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Text>
                                          {postComment.username}
                                        </Text>
                                      </Box>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Text>
                                          REPLY
                                        </Text>
                                      </Box>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Text>
                                          03.06.2000 & 18:00
                                        </Text>
                                      </Box>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        maxWidth={"calc(100% / 7)"}
                                      >
                                        <Text
                                          width={"calc(100% / 7)"}
                                          // overflow={"hidden"}
                                          // whiteSpace={"nowrap"}
                                        >
                                          {postComment.text}
                                        </Text>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Text>
                                          Unavailable
                                        </Text>
                                      </Box>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Box
                                          padding={"3px"}
                                          borderRadius={"4px"}
                                          textAlign={"center"}
                                          backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}
                                        >
                                          {postComment.status}
                                        </Box>
                                      </Box>
                                      <Box
                                        flex={1}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Checkbox/>
                                      </Box>
                                    </Box>
                                    </Box>
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
                  </Box>
              }
            </Box>
                {/*<Grid*/}
                {/*    width={"100%"}*/}
                {/*    gridTemplateColumns={"repeat(7, auto)"}*/}
                {/*    flexGrow={1}*/}
                {/*    height={"auto"}*/}
                {/*    overflow={"auto"}*/}
                {/*>*/}
                {/*    /!*<GridItem*!/*/}
                {/*    /!*    colStart={1}*!/*/}
                {/*    /!*    colEnd={8}*!/*/}
                {/*    /!*    // width={"100%"}*!/*/}
                {/*    /!*    display={"flex"}*!/*/}
                {/*    /!*    justifyContent={"space-between"}*!/*/}
                {/*    /!*    alignItems={"center"}*!/*/}
                {/*    /!*    backgroundColor={"#bdc3c7"}*!/*/}
                {/*    /!*    height={"30px"}*!/*/}
                {/*    /!*    borderRadius={"8px"}*!/*/}
                {/*    /!*>*!/*/}
                {/*    /!*<Box flexGrow={1}>*!/*/}
                {/*    /!*    <Box marginLeft={"7px"}>*!/*/}
                {/*    /!*        ID*!/*/}
                {/*    /!*    </Box>*!/*/}
                {/*    /!*</Box>*!/*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*        borderTopLeftRadius={"8px"}*/}
                {/*        borderBottomLeftRadius={"8px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"}>*/}
                {/*            FROM*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"} >*/}
                {/*            TO*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"} >*/}
                {/*            DATE*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"} >*/}
                {/*            TEXT*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"}>*/}
                {/*            LIKES*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"}>*/}
                {/*            STATUS*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box*/}
                {/*        backgroundColor={"#bdc3c7"}*/}
                {/*        height={"30px"}*/}
                {/*        borderTopRightRadius={"8px"}*/}
                {/*        borderBottomRightRadius={"8px"}*/}
                {/*    >*/}
                {/*        <Box marginLeft={"5px"}>*/}
                {/*            SELECT*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    /!*</GridItem>*!/*/}
                {/*    {*/}
                {/*      isCommentsLoading*/}
                {/*        ? <Box*/}
                {/*          w="500px"*/}
                {/*          h="80%"*/}
                {/*          d="flex"*/}
                {/*          flexDir="row"*/}
                {/*          alignItems="center"*/}
                {/*          justifyContent="center"*/}
                {/*        >*/}
                {/*          <Spinner/>*/}
                {/*        </Box>*/}
                {/*        : filteredComments.map(postComment => {*/}
                {/*            const commentListItem =*/}
                {/*                <>*/}
                {/*                    <Box>*/}
                {/*                        <Box marginLeft={"5px"}>*/}
                {/*                            {postComment.username}*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box>*/}
                {/*                        <Box>*/}
                {/*                            POST*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box >*/}
                {/*                        <Box marginLeft={"5px"} marginRight={"5px"}>*/}
                {/*                            03.06.2000 & 18:00*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box >*/}
                {/*                        <Box marginLeft={"5px"} marginRight={"5px"}>*/}
                {/*                            {postComment.text}*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box >*/}
                {/*                        <Box marginLeft={"5px"} marginRight={"5px"}>*/}
                {/*                            LIKES*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box >*/}
                {/*                        <Box*/}
                {/*                            marginLeft={"5px"}*/}
                {/*                            marginRight={"5px"}*/}
                {/*                            marginTop={"3px"}*/}
                {/*                            marginBottom={"3px"}*/}
                {/*                            borderRadius={"4px"}*/}
                {/*                            textAlign={"center"}*/}
                {/*                            backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}*/}
                {/*                        >*/}
                {/*                            {postComment.status === "POSITIVE" ? "non-negative" : "negative"}*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                    <Box >*/}
                {/*                        <Box*/}
                {/*                            height={"100%"}*/}
                {/*                            display={"flex"}*/}
                {/*                            alignItems={"center"}*/}
                {/*                            justifyContent={"center"}*/}
                {/*                            marginLeft={"5px"}*/}
                {/*                            marginRight={"5px"}*/}
                {/*                        >*/}
                {/*                            <Checkbox*/}
                {/*                                isChecked={selectedCommentsIds[postComment.id]}*/}
                {/*                                onChange={() => {*/}
                {/*                                    onToggleCommentSelection(postComment.id);*/}
                {/*                                }}*/}
                {/*                            />*/}
                {/*                        </Box>*/}
                {/*                    </Box>*/}
                {/*                </>*/}
                {/*            // </Flex>*/}
                {/*            if (postComment.replies && postComment.replies.length > 0){*/}
                {/*                return (*/}
                {/*                    <>*/}
                {/*                        {commentListItem}*/}
                {/*                        {*/}
                {/*                            postComment.replies.map((postComment) => {*/}
                {/*                                const commentListItem =*/}
                {/*                                    //     <Flex*/}
                {/*                                    //     width={"100%"}*/}
                {/*                                    //     justifyContent={"space-between"}*/}
                {/*                                    //     alignItems={"center"}*/}
                {/*                                    //     backgroundColor={"#bdc3c7"}*/}
                {/*                                    //     height={"30px"}*/}
                {/*                                    //     borderRadius={"8px"}*/}
                {/*                                    // >*/}
                {/*                                    //     <Box flexGrow={1}>*/}
                {/*                                    //         <Box marginLeft={"7px"}>*/}
                {/*                                    //             {postComment.id}*/}
                {/*                                    //         </Box>*/}
                {/*                                    //     </Box>*/}
                {/*                                    <>*/}
                {/*                                        <Box >*/}
                {/*                                            <Box marginLeft={"5px"}>*/}
                {/*                                                {postComment.username}*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box>*/}
                {/*                                            <Box marginLeft={"5px"}>*/}
                {/*                                                REPLY*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box >*/}
                {/*                                            <Box marginLeft={"5px"}>*/}
                {/*                                                03.06.2000 & 18:00*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box >*/}
                {/*                                            <Box marginLeft={"5px"}>*/}
                {/*                                                {postComment.text}*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box>*/}
                {/*                                            <Box marginLeft={"5px"}>*/}
                {/*                                                Unavailable*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box >*/}
                {/*                                            <Box*/}
                {/*                                                marginLeft={"5px"}*/}
                {/*                                                marginRight={"5px"}*/}
                {/*                                                marginTop={"3px"}*/}
                {/*                                                marginBottom={"3px"}*/}
                {/*                                                borderRadius={"4px"}*/}
                {/*                                                textAlign={"center"}*/}
                {/*                                                backgroundColor={postComment.status === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}*/}
                {/*                                            >*/}
                {/*                                                {postComment.status}*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                        <Box >*/}
                {/*                                            <Box*/}
                {/*                                                height={"100%"}*/}
                {/*                                                display={"flex"}*/}
                {/*                                                alignItems={"center"}*/}
                {/*                                                justifyContent={"center"}*/}
                {/*                                                marginLeft={"5px"}*/}
                {/*                                                marginRight={"5px"}*/}
                {/*                                            >*/}
                {/*                                                <Checkbox/>*/}
                {/*                                            </Box>*/}
                {/*                                        </Box>*/}
                {/*                                    </>*/}
                {/*                                // </Flex>*/}
                {/*                                return commentListItem;*/}
                {/*                            })*/}
                {/*                        }*/}
                {/*                    </>*/}
                {/*                )*/}
                {/*            } else {*/}
                {/*                return commentListItem;*/}
                {/*            }*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Grid>*/}
            {/*</Box>*/}
        </Box>
    )
}


export const CommentsManagement = reflect({
  view: View,
  bind: {
    postComments: commentsManagementModel.$processedCommentsWithStatus,
    statusFilter: commentsManagementModel.$statusFilter,
    onChangeStatusFilter: commentsManagementModel.statusFilterChanged,
    searchFilter: commentsManagementModel.$searchFilter,
    onChangeSearchFilter: commentsManagementModel.searchFilterChanged,
    filteredComments: commentsManagementModel.$filteredComments,
    // selectedPostCommentsIdsMap: media.$sele
    isReplyCommentModalOpen: commentsManagementModel.$isReplyCommentModalOpen,
    replyCommentText: commentsManagementModel.$replyText,
    setIsReplyCommentModalOpen: commentsManagementModel.isReplyCommentModalChanged,
    setReplyText: commentsManagementModel.replyTextChanged,
    selectedCommentsIds: commentsManagementModel.$selectedCommentsIds,
    onToggleCommentSelection: commentsManagementModel.commentSelectionToggled,
    isCommentsLoading: mediaModel.$isLoading,
  },
})
