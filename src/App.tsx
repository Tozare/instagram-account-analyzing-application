import React, {useEffect, useState} from 'react';
import {Box, ChakraProvider} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import {Home} from "./pages/home/home";
import {Header} from "./widgets/header/ui";
import {Posts} from "./pages/posts/ui";
import {Post} from "./pages/post/ui";
import {authModel} from "./entities/auth";
import {CommingSoon} from "./pages/comming-soon/ui";
import {UserInsights} from "./pages/user-insights";
import {useStore} from "effector-react";
import {userModel} from "./entities/user";
import {mediaModelUpdated, mediaModel} from "./entities/media";
import {commentsStateChanged} from "./entities/media/model";
import {Setup} from "./pages/setup/ui";
import {Comments} from "./pages/comments/ui";
// import '../'
// import "react-vis/dist/style.css";
import { Spinner, Text } from '@chakra-ui/react'

export default function App() {

  const accessToken = useStore(authModel.stores.$authToken);
  const commentsState = useStore(mediaModelUpdated.$commentsState)

  useEffect(() => {
    window.FB.getLoginStatus((response) => {
      authModel.events.updateToken(response.authResponse?.accessToken);

    });
  }, []);

  useEffect(() => {
    if (accessToken){
      mediaModelUpdated.commentsStateChanged("LOADING");
      userModel.effects.getUserPageIdFX();
      mediaModel.effects.getAllMediaPostsFx();
    }
  }, [accessToken])



  // const logOutOfFB = () => {
  //   window.FB.logout(() => {
  //     setFacebookUserAccessToken("");
  //   });
  // };


  return <>
    <ChakraProvider>
      {
        false ?
            <div style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            >
              <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
              >
                <Text
                  fontWeight={30}
                  fontSize={20}
                  marginBottom={"7px"}
                >
                  Please, wait. Your profile is being processed by our smart AI ;)
                </Text>
                <Spinner size='xl'/>
              </Box>
            </div>
            :
            <div style={{width: "100%", height: "100vh"}}>
              <Header/>
              <Switch>
                <Route path="/media" exact={true}>
                  <Posts/>
                </Route>
                <Route path="/media/:mediaId" exact={true}>
                  <Post/>
                </Route>
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path={"/tutorials"}>
                  <CommingSoon/>
                </Route>
                <Route path={"/messages"}>
                  <CommingSoon/>
                </Route>
                <Route path={"/insights"}>
                  <UserInsights/>
                </Route>
                <Route path={"/setup"}>
                  <Setup/>
                </Route>
                <Route path={"/comments"}>
                  <Comments/>
                </Route>
                <Route path={"/"}>
                  <Redirect to={"/home"}/>
                </Route>
              </Switch>
            </div>
      }
    </ChakraProvider>
  </>
}
