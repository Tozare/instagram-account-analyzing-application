import {GetFacebookToken} from "../../libs/auth/get-facebook-token";
import {useToken} from "../../../entities/auth/model/selectors";

//TODO: separate APIs for different types of media IG
export const getMediaInsights = (postId: string): Promise<any[]> => {
    return new Promise((resolve) => {
        window.FB.api(
            `${postId}/insights`,
            {
                access_token: GetFacebookToken(),
                metric: "engagement,impressions,reach,saved",
            },
            (response) => {
                console.log(response);
                resolve(response.data);
            }
        );
    })
}