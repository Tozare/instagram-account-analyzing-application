import React, {useEffect, useState} from 'react';
import {GetFacebookToken} from "../../shared/libs/auth/get-facebook-token";
import {postsModel} from "../../entities/media";
import {PostsGrid} from "../../widgets/posts-grid/ui";
import {Flex} from "@chakra-ui/react";
import {Header} from "../../widgets/header/ui";
import {LeftMenu} from "../../widgets/left-menu-for-post/ui";

export const Dashboard = () => {

    const [instagramPageId, setInstagramPageId] = useState("")
    const [media, setMedia] = useState([]);

    useEffect(() => {
        getFacebookPages().then(facebookPages => {
            // @ts-ignore
            getInstagramAccountId(facebookPages[0].id).then((instagramPageId => {
                // @ts-ignore
                setInstagramPageId(instagramPageId);
                getAllMedia(instagramPageId).then((media) => {
                    console.log(media)

                    // medias.forEach((media)=>{
                    //     console.log(media);
                    //     window.FB.api(
                    //         `${media.id}/comments`,
                    //         {
                    //             access_token: GetFacebookToken(),
                    //             // fields: "instagram_business_account",
                    //         },
                    //         (response) => {
                    //             console.log(response);
                    //             response.data.forEach(commentId => {
                    //                 console.log(commentId);
                    //                 window.FB.api(
                    //                     `${commentId.id}/replies`,
                    //                     {
                    //                         access_token: GetFacebookToken(),
                    //                         // fields: "instagram_business_account, ",
                    //                     },
                    //                     (response) => {
                    //                         console.log(response);
                    //                         // resolve(response.instagram_business_account.id);
                    //                     }
                    //                 );
                    //             })
                    //             // resolve(response.instagram_business_account.id);
                    //         }
                    //     );
                    //
                    // })
                });
            }));
        })
    }, [])

    const getFacebookPages = () => {
        return new Promise((resolve) => {
            window.FB.api(
                "me/accounts",
                { access_token: GetFacebookToken() },
                (response) => {
                    resolve(response.data);
                }
            );
        });
    };

    const getInstagramAccountId = (facebookPageId: string) => {
        return new Promise((resolve) => {
            window.FB.api(
                facebookPageId,
                {
                    access_token: GetFacebookToken(),
                    fields: "instagram_business_account",
                },
                (response) => {
                    console.log(response);
                    resolve(response.instagram_business_account.id);
                }
            );
        });
    };


    const getAllMedia = (instagramPageId: unknown) => {
        return new Promise((resolve) => {
            window.FB.api(
                `${instagramPageId}/media`,
                {
                    access_token: GetFacebookToken(),
                    fields: "id,like_count,caption,media_url,media_type,timestamp,thumbnail_url,permalink",
                },
                (response) => {
                    console.log(response);
                    // setMedia(response.data);
                    postsModel.events.updatePosts(response.data);
                    // resolve(response.data);
                    // response.data.forEach((mediaInfo) => {
                    //     window.FB.api(
                    //         `/${mediaInfo.id}`,
                    //         {
                    //             access_token: GetFacebookToken(),
                    //             fields: "id,captions",
                    //         },
                    //         (response) => {
                    //             console.log(mediaInfo);
                    //             console.log(response);
                    //             resolve(response.data);
                    //         }
                    //     );
                    // })
                }

            );
        });
    }


    return (
        <div style={{width: "100%", height: "100vh", backgroundColor:"#F1F1F1"}} >
            <LeftMenu/>
            <Flex
                flexDirection={"column"}
                alignItems={"center"}
                marginTop={"50px"}
            >
                <PostsGrid/>
            </Flex>
        </div>
    )
}