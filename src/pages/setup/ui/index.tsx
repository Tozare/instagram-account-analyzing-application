import React from 'react';
import {AnalyzationThresholdSetup} from "features/comments-analyzer";
import {Box, Text} from "@chakra-ui/react";
import {InfoIcon} from "@chakra-ui/icons";

export const Setup = () => {

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
            <Box
                display={"flex"}
                flexDirection={"row"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box
                    width={"250px"}
                    marginRight={"70px"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <InfoIcon color={"teal"} w={12} h={12}/>
                    <Text  width={"250px"} fontWeight={24} fontSize={19}>
                        Setup your threshold to filter negative comments. If one of the threshold values will be reached by comment, it will processed as negative
                    </Text>
                </Box>
                <AnalyzationThresholdSetup/>
            </Box>
        </div>
    )
}
