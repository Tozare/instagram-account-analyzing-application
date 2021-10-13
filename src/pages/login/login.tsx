// import React from 'react';
// import {Button} from "@chakra-ui/react";
// import { useHistory } from 'react-router-dom';
//
//
// export const Login = () => {
//
//
//     const history = useHistory();
//
//
//     return (
//         <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
//             <Button
//                 width={"400px"}
//                 h="44px"
//                 marginX="auto"
//                 background="#4267B2"
//                 borderRadius="8px"
//                 color="#FFFFFF"
//                 border={"1px solid #4267B2"}
//                 _hover={{ background: "#4267B2" }}
//                 _active={{ background: "#4267B2" }}
//                 onClick={() => {
//                     logInToFB();
//                 }}
//             >
//                 Login from facebook
//             </Button>
//             <Button
//                 width={"400px"}
//                 h="44px"
//                 marginX="auto"
//                 background="#4267B2"
//                 borderRadius="8px"
//                 color="#FFFFFF"
//                 border={"1px solid #4267B2"}
//                 _hover={{ background: "#4267B2" }}
//                 _active={{ background: "#4267B2" }}
//                 onClick={() => {
//                     window.FB.logout(() => {
//                         localStorage.removeItem("facebook-token");
//                     });
//                 }}
//             >
//                 Log out
//             </Button>
//         </div>
//     )
// }