import {GetFacebookToken} from "../../libs/auth/get-facebook-token";

export const getAllMediaFromInstagramPage = (instagramPageId: string): Promise<any[]> => {
    return new Promise((resolve) => {
        window.FB.api(
            `${instagramPageId}/media`,
            {
                access_token: GetFacebookToken(),
                fields: "id,like_count,owner,comments_count,username,caption,media_url,media_type,timestamp,thumbnail_url,permalink",
            },
            (response) => {
                const data: any[] = response.data;
                console.log(data);
                resolve(data);
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