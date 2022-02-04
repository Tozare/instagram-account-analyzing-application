import {GetFacebookToken} from "../../libs/auth/get-facebook-token";

export const getUserInfo = (userId: string) => {
    // console.log("getUserInfo");
    return new Promise((resolve) => {
        window.FB.api(
            `/${userId}`,
            {
                // access_token: GetFacebookToken(),
                fields: "biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website",
                // fields: "biography",
            },
            (response) => {
                // console.log(response)
                resolve(response);
            }
        );
    });
};