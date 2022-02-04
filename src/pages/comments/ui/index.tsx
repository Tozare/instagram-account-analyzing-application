import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import {InfoIcon} from "@chakra-ui/icons";
import {SearchCommentsByMeaning} from "../../../features/search-comments-by-meaning/ui";

export const Comments = () => {

    return (
        <div
            style={{
                width: "100%",
                height: "calc(100vh - 66px)",
                backgroundColor:"#F1F1F1",
                display: "flex",
                flexDirection: "row"
            }}
        >
            <SearchCommentsByMeaning/>
        </div>
    )
}