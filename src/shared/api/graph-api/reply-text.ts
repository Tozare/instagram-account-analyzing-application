import {GetFacebookToken} from "../../libs/auth/get-facebook-token";
import {useToken} from "../../../entities/auth/model/selectors";

export const replyText = (commentId: string, replyText: string): Promise<any[]> => {
    return new Promise((resolve) => {
        window.FB.api(
            `${commentId}/replies?message=${replyText}`,
            'post',
            {
                access_token: GetFacebookToken(),

            },
            (response) => {
                console.log(response);
                resolve(response);
            }
        );
    })
}