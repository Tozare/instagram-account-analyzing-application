import React, {useEffect, useState} from 'react';
import {SearchCommentsByMeaning} from "features/search-comments-by-meaning/ui";
import {getComments} from "shared/api/backend/get-fishing-accounts";
import {Box, Checkbox, Image, Spinner, Text, Link, Flex} from "@chakra-ui/react";

export const FishingUsers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
      getComments().then((users) => {
        console.log(users);
        setUsers(users.data);
        setIsLoading(false);
      });
    }, []);

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
          <Flex
            width={"100%"}
            height={"100%"}
            backgroundColor={"#FFFFFF"}
            padding={"15px"}
            borderRadius={"8px"}
            flexDirection={"column"}
          >
            <Box
              display="flex"
              flexDirection="column"
            >
              <Box
                // backgroundColor="green"
                width="100%"
                display={"flex"}
                flexDirection={"column"}
                // height="calc(100% - 53px)"
                flex={1}
              >
                <Box
                  width="100%"
                  height={"30px"}
                  display="flex"
                  flexDirection="row"
                  marginBottom={"6px"}
                >
                  <Box
                    flex={1}
                    backgroundColor={"#bdc3c7"}
                    height={"30px"}
                    borderTopLeftRadius={"8px"}
                    borderBottomLeftRadius={"8px"}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      Username
                    </Box>
                  </Box>
                  <Box
                    flex={1}
                    backgroundColor={"#bdc3c7"}
                    height={"30px"}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      Website
                    </Box>
                  </Box>
                  <Box
                    flex={1}
                    backgroundColor={"#bdc3c7"}
                    height={"30px"}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      Status
                    </Box>
                  </Box>
                </Box>
                {
                  isLoading
                    ? <Box
                      width="100%"
                      flex={1}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text marginRight={"4px"}>Comments are loading</Text>
                      <Spinner/>
                    </Box>
                    :
                    <Box
                      width="100%"
                      flex={1}
                      display="flex"
                      flexDirection="column"
                      overflowY="scroll"
                      maxHeight={"500px"}
                    >
                      {
                        users.map(user => {

                          const commentListItem =
                            <Box
                              display="flex"
                              flexDirection="row"
                              width="100%"
                              marginBottom={"3px"}
                              // height={"30px"}
                            >
                              <Box
                                flex={1}
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Link href={`https://www.instagram.com/${user.username}/`}>
                                  {user.username}
                                </Link>
                              </Box>
                              <Box
                                flex={1}
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Box>
                                  {
                                    user.site ? <Link href={user.site}>Website</Link> : <Box>No site in bio</Box>
                                  }
                                </Box>
                              </Box>
                              <Box
                                flex={1}
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Box
                                  padding={"3px"}
                                  borderRadius={"4px"}
                                  textAlign={"center"}
                                  backgroundColor={user.nudity_indicator <= 0.9 ? "#8ecc8e" : "#FFCCCC"}
                                >
                                  {user.nudity_indicator <= 0.9 ? "NORMAL" : "FISHING"}
                                </Box>
                              </Box>
                            </Box>

                          return commentListItem;

                        })
                      }
                    </Box>
                }
              </Box>
            </Box>
          </Flex>
        </div>
    )
}
