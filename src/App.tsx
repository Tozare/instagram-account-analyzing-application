import React, {useEffect, useState} from 'react';
import {useStore, useEvent} from "effector-react";
import {Box, ChakraProvider} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";

import { Home } from "pages/home";
import { Header } from "widgets/header";
import { Posts } from "pages/posts";
import { Post } from "pages/post-analysis";
import { CommingSoon } from "pages/comming-soon/ui";
import { userModel } from "entities/user";
import { mediaModel } from "entities/media";
import { authModel } from "entities/auth";
import { Setup } from "pages/setup";
import { Comments } from "pages/comments";
import { Spinner, Text } from '@chakra-ui/react'
import {sample} from "effector";
import {FishingUsers} from "pages/fishing-users/ui";
// import {instagramPagePostsRequested} from "entities/media/model";

sample({
  clock: authModel.$authToken,
  target: userModel.getUserPageIdFX,
})

sample({
  clock: userModel.postUserInformation.doneData,
  target: mediaModel.instagramPagePostsRequested,
});

export default function App() {

  const accessToken = useStore(authModel.$authToken);
  const commentsState = useStore(mediaModel.$commentsState);
  const changeToken = useEvent(authModel.tokenUpdated);
  const updateInstagramPagePostsInformation = useEvent(mediaModel.instagramPagePostsRequested);
  // const changeComments


  useEffect(() => {
    window.FB.getLoginStatus((response) => {
      changeToken(response.authResponse?.accessToken);
    });
  }, []);

  useEffect(() => {
    // if (accessToken){
    //   console.log("accestoken");
    //   mediaModel.commentsStateChanged("LOADING");
    //   // userModel.getUserPageIdFX();
    //   // updateInstagramPagePostsInformation();
    //   // mediaModel.instagramPagePostsRequested;
    // }
  }, [accessToken])



  // const logOutOfFB = () => {
  //   window.FB.logout(() => {
  //     setFacebookUserAccessToken("");
  //   });
  // };


  return <>
    <ChakraProvider>
      {
        // false ?
        //     <div style={{
        //       width: "100%",
        //       height: "100vh",
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //       justifyContent: "center"
        //     }}
        //     >
        //       <Box
        //           display={"flex"}
        //           flexDirection={"column"}
        //           alignItems={"center"}
        //       >
        //         <Text
        //           fontWeight={30}
        //           fontSize={20}
        //           marginBottom={"7px"}
        //         >
        //           Please, wait. Your profile is being processed by our smart AI ;)
        //         </Text>
        //         <Spinner size='xl'/>
        //       </Box>
        //     </div>
        //     :
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
                <Route path={"/users"}>
                  <FishingUsers/>
                </Route>
                {/*/!*<Route path={"/insights"}>*!/*/}
                {/*/!*  <UserInsights/>*!/*/}
                {/*/!*</Route>*!/*/}
                <Route path={"/setup"}>
                  <Setup/>
                </Route>
                <Route path={"/comments"}>
                  <Comments/>
                </Route>
                {/*<Route path={"/"}>*/}
                {/*  <Redirect to={"/home"}/>*/}
                {/*</Route>*/}
              </Switch>
            </div>
      }
    </ChakraProvider>
  </>
}
