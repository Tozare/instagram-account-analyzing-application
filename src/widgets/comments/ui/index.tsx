import React from 'react';
import {Box} from "@chakra-ui/react";
import {CommentsManagement} from "../../../features/comments-management/ui";


export const Comments = () => {

    return (
        <Box
            flexGrow={1}
            paddingLeft={"30px"}
            paddingRight={"30px"}
            paddingTop={"30px"}
            paddingBottom={"30px"}
        >
            <CommentsManagement/>
        </Box>
    )
}