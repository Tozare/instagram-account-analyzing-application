import React, {ChangeEvent, FC, useState} from 'react';
import {reflect} from "@effector/reflect";
import * as model from "../model";
import {
    Box,
    Button,
    Checkbox, Flex, FormControl, FormLabel, Grid,
    Input, InputGroup, InputLeftElement, InputRightElement,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Spinner, toast, useToast,
  Text
} from "@chakra-ui/react";
import {mediaModel} from "entities/media";
import {commentsManagementBaseModel} from "features/comments-management";
import { thresholdsModel } from "entities/thresholds";
import {CloseIcon, Search2Icon, SearchIcon} from "@chakra-ui/icons";
import {$isReplyModalOpen} from "../model";
import {useStore} from "effector-react";

interface IViewProps {
    state: string,
    searchText: string,
    comments: any[],
    onChangeSearchText: (e: ChangeEvent<HTMLInputElement>) => void,
    selectedComments: Record<string | number, any>,
    selectComment: (data: string | number) => void,
    onClick: () => void,
    isReplyModalOpen: boolean,
    onChangeReplyModalState: (data: boolean) => void,
    replyText: string,
    onChangeReplyText: (data: string) => void,
    thresholds: any,
}
//TODO:
const View: FC<IViewProps> = ({
    state,
    onClick,
    searchText,
    comments,
    onChangeSearchText,
    selectedComments,
    selectComment,
    isReplyModalOpen,
    onChangeReplyModalState,
    replyText,
    onChangeReplyText,
  thresholds
}) => {

    // console.log(comments)
    const [loadingState, setLoadingState] = useState("NONE");
    const isLoading = useStore(model.$isLoading);
    const {
        toxicThreshold,
        severeToxicThreshold,
        insultThreshold,
        threatThreshold,
        obsceneThreshold,
        identityHateThreshold
    } = thresholds;


    const toast = useToast();
    console.log("search")
    console.warn(comments);

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
                isOpen={isReplyModalOpen}
                onClose={() => {
                    onChangeReplyModalState(false);
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
                                value={replyText}
                                onChange={(e) => {
                                    onChangeReplyText(e.target.value);
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
                                commentsManagementBaseModel.replyCommentFx({
                                    replyText: replyText,
                                    selectedPostComments: selectedComments
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
                            value={searchText}
                            onChange={onChangeSearchText}
                            placeholder={"search comments"}
                        />
                        <InputRightElement
                            height={"38px"}
                            children={<Search2Icon color={"#2f2f2f"} onClick={onClick}/>}
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
                        onClick={() => onChangeReplyModalState(true)}
                    >
                        Reply
                    </Button>
                </Box>
              <Box marginRight={"10px"}>
                <Button
                  width={"150px"}
                  height={"38px"}
                  // backgroundColor={"#FFCCCC"}
                  // onClick={() => {
                  //   setLoadingState("DELETION");
                  //   mediaModel.deleteSelectedPostCommentsFx({
                  //     selectedPostComments: selectedCommentsIds,
                  //   }).then(() => {
                  //     toast({
                  //       title: "Comments were deleted",
                  //       description: "Selected comments of the post-analysis were successfully deleted",
                  //       status: "success",
                  //       duration: 4500,
                  //       isClosable: true,
                  //     });
                  //     setLoadingState("NONE");
                  //   });
                  // }}
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
                                selectedPostComments: selectedComments
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
              isLoading
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
                    comments.map(postComment => {

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
                                // isChecked={selectedCommentsIds[postComment.id]}
                                // onChange={() => {
                                //   onToggleCommentSelection(postComment.id);
                                // }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      // </Flex>

                      return commentListItem;

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
            {/*        // borderTopLeftRadius={"8px"}*/}
            {/*        // borderBottomLeftRadius={"8px"}*/}
            {/*    >*/}
            {/*        <Box marginLeft={"5px"}>*/}
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

            {/*  {*/}
            {/*    isLoading && (*/}
            {/*      <Box*/}
            {/*        display="flex"*/}
            {/*        flexDirection="row"*/}
            {/*        alignItems={"center"}*/}
            {/*        justifyContent={"center"}*/}
            {/*      >*/}
            {/*        <Text marginRight={"5px"}>Loading</Text>*/}
            {/*        <Spinner/>*/}
            {/*      </Box>*/}
            {/*    )*/}
            {/*  }*/}

            {/*    {*/}
            {/*      !isLoading && comments.map(comment => {*/}

            {/*            let commentStatus = "POSITIVE";*/}
            {/*            if (*/}
            {/*                parseFloat(comment.insult) >= insultThreshold*/}
            {/*                || parseFloat(comment.identity_hate) >= identityHateThreshold*/}
            {/*                || parseFloat(comment.obscene) >= obsceneThreshold*/}
            {/*                || parseFloat(comment.severe_toxic) >= severeToxicThreshold*/}
            {/*                || parseFloat(comment.threat) >= threatThreshold*/}
            {/*                || parseFloat(comment.toxic) >= toxicThreshold*/}
            {/*            ){*/}
            {/*                commentStatus = "NEGATIVE"*/}
            {/*            }*/}
            {/*            const commentListItem =*/}
            {/*                <>*/}
            {/*                    <Box>*/}
            {/*                        <Box marginLeft={"5px"}>*/}
            {/*                            {comment.username ? comment.username : "username"}*/}
            {/*                        </Box>*/}
            {/*                    </Box>*/}
            {/*                    <Box >*/}
            {/*                        <Box marginLeft={"5px"} marginRight={"5px"}>*/}
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
            {/*                            {comment.text}*/}
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
            {/*                            backgroundColor={commentStatus === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}*/}
            {/*                        >*/}
            {/*                            {commentStatus === "POSITIVE" ? "non-negative" : "negative"}*/}
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
            {/*                                isChecked={selectedComments[comment.id] === true}*/}
            {/*                                onChange={() => {*/}
            {/*                                    selectComment(comment.id);*/}
            {/*                                }}*/}
            {/*                            />*/}
            {/*                        </Box>*/}
            {/*                    </Box>*/}
            {/*                </>*/}
            {/*            // </Flex>*/}
            {/*            return commentListItem;*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}
            {/*</Box>*/}
        </Flex>
    )


}

export const SearchCommentsByMeaning = reflect({
    view: View,
    bind: {
        state: model.$state,
        searchText: model.$searchText,
        comments: model.$processedComments,
        onClick: model.searchButtonClicked,
        selectedComments: model.$selectedComments,
        selectComment: model.commentSelected,
        onChangeSearchText: model.searchTextChanged.prepend<ChangeEvent<HTMLInputElement>>((e) => e.target.value),
        isReplyModalOpen: model.$isReplyModalOpen,
        onChangeReplyModalState: model.isReplyModalOpenChanged,
        replyText: model.$replyText,
        onChangeReplyText: model.replyTextChanged,
        thresholds: thresholdsModel.$thresholds,
    },
});

