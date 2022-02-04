import {GetFacebookToken} from "../../libs/auth/get-facebook-token";
import {useToken} from "../../../entities/auth/model/selectors";

//TODO: separate APIs for different types of media IG
export const getUserInsights = (userId: string): Promise<any[]> => {
    console.log("backend insights");
    return new Promise((resolve) => {
        window.FB.api(
            `${userId}/insights`,
            {
                access_token: GetFacebookToken(),
                period: "lifetime",
                since: `${new Date('2021.11.01').getTime() / 1000}`,
                metric: "audience_city,audience_country,audience_gender_age,audience_locale",
            },
            (response) => {
                // console.log(response);
                resolve(response.data);
            }
        );
    })
}