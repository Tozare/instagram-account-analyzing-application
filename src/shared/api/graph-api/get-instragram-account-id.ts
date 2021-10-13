import {GetFacebookToken} from "../../libs/auth/get-facebook-token";

export const getInstagramAccountId = (facebookPageId: string) => {
    return new Promise((resolve) => {
        window.FB.api(
            facebookPageId,
            {
                access_token: GetFacebookToken(),
                fields: "instagram_business_account",
            },
            (response) => {
                resolve(response.instagram_business_account.id);
            }
        );
    });
};