import React, {useEffect, useState} from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Home} from "./pages/home/home";
import {Header} from "./widgets/header/ui";
import {Posts} from "./pages/posts/ui";
import {Post} from "./pages/post/ui";
import {authModel} from "./entities/auth";


export default function App() {

  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");


  useEffect(() => {
    window.FB.getLoginStatus((response) => {
      authModel.events.updateToken(response.authResponse?.accessToken);
      console.log(response.authResponse?.accessToken);
    });
  }, []);



  // const logOutOfFB = () => {
  //   window.FB.logout(() => {
  //     setFacebookUserAccessToken("");
  //   });
  // };


  return <>
    <ChakraProvider>
      <div style={{width: "100%", height: "100vh"}}>
        <Header/>
        <Switch>
          <Route path="/media" exact={true}>
            <Posts/>
          </Route>
          <Route path="/media/:mediaId" exact={true}>
            <Post/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </ChakraProvider>
  </>
}
