import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Button, Image, Flex, Box} from "@chakra-ui/react";
import {authModel} from "../../entities/auth";

export const Home = () => {


    return (
        <div style={{
            height: "100vh",
            width: "100%",
            backgroundColor:"#F1F1F1",
        }}>
            <Flex height={"100%"} width={"100%"}>
                <Box
                    width={"50%"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    paddingBottom={"100px"}
                >
                    <div
                        style={{
                            textAlign: "center",
                            width: "350px",
                            fontSize: "38px",
                            fontWeight: 500
                        }}
                    >
                        Evolve your instagram account with Statinst
                    </div>
                    <div
                        style={{
                            fontSize: "18px"
                        }}
                    >
                        Analyze. Manage. Automate.
                    </div>
                    <Button
                        width={"auto"}
                        h="40px"
                        marginTop={"30px"}
                        background="#4267B2"
                        borderRadius="15px"
                        color="#FFFFFF"
                        fontSize={"25px"}
                        border={"1px solid #4267B2"}
                        _hover={{ background: "#4267B2" }}
                        _active={{ background: "#4267B2" }}
                        onClick={() => {

                        }}
                    >
                        Tutorials
                    </Button>
                </Box>
                <Box
                    width={"50%"}
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Box
                        position={"relative"}
                        width={"600px"}
                        height={"600px"}
                    >
                        <Image
                            position={"absolute"}
                            left={"0px"}
                            top={"0px"}
                            width={"400px"}
                            height={"400px"}
                            borderRadius={"200px"}
                            src={'../../../../images/graphs-image3.jpeg'}
                        />
                        <Image
                            position={"absolute"}
                            left={"200px"}
                            top={"200px"}
                            width={"400px"}
                            height={"400px"}
                            borderRadius={"200px"} src={'../../../../images/instagram-analytics-image.jpeg'}
                        />
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}