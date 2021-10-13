import {GetFacebookToken} from "../../libs/auth/get-facebook-token";

export const getFacebookPages = () => {
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