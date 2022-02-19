import React, {FC} from 'react';
import {Box, Button, Flex, Image, Text, Divider} from "@chakra-ui/react";
import {reflect} from "@effector/reflect";
import {useHistory, useLocation} from "react-router-dom";
import { authModel } from "entities/auth";

interface IProps {
  login: () => void,
  logout: () => void,
  facebookAuthToken: string,
}

export const View = ({
  logout,
  login,
  facebookAuthToken,
}: IProps) => {

    const history = useHistory();
    const location = useLocation();

    console.log("Header view");

    return (
        <div style={{width: "100%", height: "65px"}}>
            <Flex width={"100%"} height={"65px"} alignItems={"center"} backgroundColor={"#F3F5F7"}>
                <Box marginLeft={"20px"}>
                    <Image height="55px" width={"55px"} src={'../../../../images/logo.png'}/>
                </Box>
                <Box marginX={"auto"} display={"flex"}>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        fontWeight={500}
                        lineHeight={"65px"}
                        height={"65px"}
                        borderBottom={location.pathname.includes("/home") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/home');
                        }}
                    >
                        home
                    </Text>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        fontWeight={500}
                        lineHeight={"65px"}
                        height={"65px"}
                        borderBottom={location.pathname.includes("/tutorials") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/tutorials');
                        }}
                    >
                        tutorials
                    </Text>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        marginLeft={"12px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        lineHeight={"65px"}
                        height={"65px"}
                        fontWeight={500}
                        borderBottom={location.pathname.includes("/media") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/media');
                        }}
                    >
                        posts
                    </Text>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        marginLeft={"12px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        lineHeight={"65px"}
                        height={"65px"}
                        fontWeight={500}
                        borderBottom={location.pathname.includes("/messages") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/messages');
                        }}
                    >
                        messages
                    </Text>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        marginLeft={"12px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        lineHeight={"65px"}
                        height={"65px"}
                        fontWeight={500}
                        borderBottom={location.pathname.includes("/insights") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/comments');
                        }}
                    >
                        comments
                    </Text>
                    <Text
                        paddingLeft={"7px"}
                        paddingRight={"7px"}
                        marginLeft={"12px"}
                        _hover={{color: "#ED8936"}}
                        fontSize={"16px"}
                        lineHeight={"65px"}
                        height={"65px"}
                        fontWeight={500}
                        borderBottom={location.pathname.includes("/setup") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/setup');
                        }}
                    >
                        setup
                    </Text>
                </Box>
                <Box marginLeft={"auto"} marginRight={"20px"}>
                    {
                        !facebookAuthToken ?
                            <Button
                                width={"auto"}
                                h="35px"
                                marginX="auto"
                                background="#4267B2"
                                borderRadius="8px"
                                color="#FFFFFF"
                                border={"1px solid #4267B2"}
                                _hover={{ background: "#4267B2" }}
                                _active={{ background: "#4267B2" }}
                                onClick={login}
                            >
                                Log in
                            </Button>
                            :
                            <Button
                                width={"auto"}
                                h="35px"
                                marginX="auto"
                                background="#4267B2"
                                borderRadius="8px"
                                color="#FFFFFF"
                                border={"1px solid #4267B2"}
                                _hover={{ background: "#4267B2" }}
                                _active={{ background: "#4267B2" }}
                                onClick={logout}
                            >
                                Log out
                            </Button>
                    }
                </Box>
            </Flex>
        </div>
    )
}


export const Header = reflect({
  view: View,
  bind: {
    login: authModel.loginInFacebookAccountStarted,
    logout: authModel.logoutFromFacebookAccountStarted,
    facebookAuthToken: authModel.$authToken,
  },
})
