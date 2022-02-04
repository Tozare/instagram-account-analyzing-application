// import React from 'react';
// import {mediaModel} from "../../../entities/media";
// import {Box, Flex, Heading, Text} from "@chakra-ui/react";
// import {RadialChart} from "react-vis";
//
//
// export const CommentsHistogram = () => {
//     const postComments = mediaModel.selectors.usePostComments();
//
//     console.log(postComments);
//
//     return (
//         <Box
//             display={"flex"}
//             flexDirection={"column"}
//             borderRadius={"5px"}
//             backgroundColor={"#B1D4E0"}
//             padding={"7px"}
//             width={"100%"}
//             alignItems={"center"}
//         >
//             <Heading as="h1" size="lg">Histogram</Heading>
//             <Text>How many comments were created at proper date</Text>
//             {/*<div>Period:</div>*/}
//             <Flex
//                 alignItems={"center"}
//             >
//
//             </Flex>
//         </Box>
//     )
//
// }