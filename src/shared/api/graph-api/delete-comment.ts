import {GetFacebookToken} from "../../libs/auth/get-facebook-token";
import {useToken} from "../../../entities/auth/model/selectors";

export const deleteComment = (commentId: string): Promise<any[]> => {
    return new Promise((resolve) => {
        window.FB.api(
            `${commentId}`,
            'delete',
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