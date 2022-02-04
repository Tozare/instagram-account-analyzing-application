import React from 'react';
import {Button, Image, Flex, Box} from "@chakra-ui/react";

export const CommingSoon = () => {


    return (
        <div style={{
            height: "calc(100vh - 65px)",
            width: "100%",
            backgroundColor:"#F1F1F1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Flex
                width={"500px"}
                height={"auto"}
                padding={"25px"}
                borderRadius={"12px"}
                flexDirection={"column"}
                alignItems={"center"}
                backgroundImage={"linear-gradient(to right, #fc5c7d, #6a82fb)"}
            >
                <Image
                    width={"200px"}
                    height={"200px"}
                    borderRadius={"100px"} src={'../../../../images/rocket.png'}
                />
                <Box
                    marginTop={"10px"}
                    fontSize={"20px"}
                    fontWeight={500}
                >
                    Coming soon
                </Box>
                <Box
                    marginTop={"10px"}
                >
                    We are working hard to improve our application
                </Box>
            </Flex>
        </div>
    )
}