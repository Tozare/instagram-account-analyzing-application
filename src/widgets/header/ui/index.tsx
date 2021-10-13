import React, {useEffect} from 'react';
import {Box, Button, Flex, Image, Text, Divider} from "@chakra-ui/react";
import {GetFacebookToken} from "../../../shared/libs/auth/get-facebook-token";
import {loginFromFacebook} from "../../../shared/api/auth/login-from-facebook";
import {logoutFromFacebook} from "../../../shared/api/auth/logout-from-facebook";
import {useHistory, useLocation} from "react-router-dom";
import {authModel} from "../../../entities/auth";



export const Header = () => {

    const history = useHistory();
    const location = useLocation();
    const token = authModel.selectors.useToken();
    // console.log(token);

    useEffect(() => {
        console.log(token);
        console.log(typeof token);
    }, [token])


    return (
        <div style={{width: "100%", height: "auto"}}>
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
                        borderBottom={location.pathname.includes("/features") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/features');
                        }}
                    >
                        features
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
                        borderBottom={location.pathname.includes("/subscribers") ? "2.5px solid #2F2F2F" : ""}
                        onClick={() => {
                            history.push('/subscribers');
                        }}
                    >
                        subscribers
                    </Text>
                </Box>
                <Box marginLeft={"auto"} marginRight={"20px"}>
                    {
                        token === "" ?
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
                                onClick={() => {
                                    authModel.effects.loginInFacebookFx().then(() => {
                                        console.log("media");
                                        history.push("media");
                                    });
                                }}
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
                                onClick={() => {
                                    authModel.effects.logoutFromFacebookFx().then(() => {
                                        history.push("dashboard");
                                    });
                                }}
                            >
                                Log out
                            </Button>
                    }
                </Box>
            </Flex>
            {/*<Divider height={"1px"} backgroundColor={"#B2BEC3"}/>*/}
        </div>

    )
}