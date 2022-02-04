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
    ModalOverlay, Select, Spinner, toast, useToast
} from "@chakra-ui/react";
import {mediaModel, mediaModelUpdated} from "../../../entities/media";
import {commentsManagementModel} from "../../comments-management/model";
import {CloseIcon, Search2Icon, SearchIcon} from "@chakra-ui/icons";
import {$isReplyModalOpen} from "../model";

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
    thresholds: mediaModelUpdated.Thresholds
}

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
    const {
        toxicThreshold,
        severeToxicThreshold,
        insultThreshold,
        threatThreshold,
        obsceneThreshold,
        identityHateThreshold
    } = thresholds;


    const toast = useToast();

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
                                commentsManagementModel.effects.replyCommentFx({
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
                <Box>
                    <Button
                        width={"150px"}
                        height={"38px"}
                        backgroundColor={"#FFCCCC"}
                        onClick={() => {
                            setLoadingState("DELETION");
                            mediaModel.effects.deleteSelectedPostCommentsFx({
                                selectedPostComments: selectedComments
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
            <Grid
                width={"100%"}
                gridTemplateColumns={"repeat(7, auto)"}
                flexGrow={1}
                height={"auto"}
                overflow={"auto"}
            >
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
                    // borderTopLeftRadius={"8px"}
                    // borderBottomLeftRadius={"8px"}
                >
                    <Box marginLeft={"5px"}>
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
                    comments.map(comment => {

                        let commentStatus = "POSITIVE";
                        if (
                            parseFloat(comment.insult) >= insultThreshold
                            || parseFloat(comment.identity_hate) >= identityHateThreshold
                            || parseFloat(comment.obscene) >= obsceneThreshold
                            || parseFloat(comment.severe_toxic) >= severeToxicThreshold
                            || parseFloat(comment.threat) >= threatThreshold
                            || parseFloat(comment.toxic) >= toxicThreshold
                        ){
                            commentStatus = "NEGATIVE"
                        }
                        const commentListItem =
                            <>
                                <Box>
                                    <Box marginLeft={"5px"}>
                                        {comment.username ? comment.username : "username"}
                                    </Box>
                                </Box>
                                <Box >
                                    <Box marginLeft={"5px"} marginRight={"5px"}>
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
                                        {comment.text}
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
                                        backgroundColor={commentStatus === "POSITIVE" ? "#8ecc8e" : "#FFCCCC"}
                                    >
                                        {commentStatus === "POSITIVE" ? "non-negative" : "negative"}
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
                                            isChecked={selectedComments[comment.id] === true}
                                            onChange={() => {
                                                selectComment(comment.id);
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </>
                        // </Flex>
                        return commentListItem;
                    })
                }
            </Grid>
            {/*</Box>*/}
        </Flex>
    )


}

export const SearchCommentsByMeaning = reflect({
    view: View,
    bind: {
        state: model.$state,
        searchText: model.$searchText,
        comments: model.$comments,
        onClick: model.searchButtonClicked,
        selectedComments: model.$selectedComments,
        selectComment: model.commentSelected,
        onChangeSearchText: model.searchTextChanged.prepend<ChangeEvent<HTMLInputElement>>((e) => e.target.value),
        isReplyModalOpen: model.$isReplyModalOpen,
        onChangeReplyModalState: model.isReplyModalOpenChanged,
        replyText: model.$replyText,
        onChangeReplyText: model.replyTextChanged,
        thresholds: mediaModelUpdated.$thresholds
    },
});

