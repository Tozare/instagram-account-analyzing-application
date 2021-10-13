import {GetFacebookToken} from "../../libs/auth/get-facebook-token";
import {useToken} from "../../../entities/auth/model/selectors";

export const getMediaComments = (postId: string): Promise<any[]> => {
    return new Promise((resolve) => {
        const comments: any[] = [];
        window.FB.api(
            `${postId}/comments`,
            {
                access_token: GetFacebookToken(),
                summary: true,
                filter: "stream",
                fields: "text,username,like_count,replies,timestamp,id,media",
            },
            (response) => {
                console.log(response);
                comments.push(...response.data);
                if (response.paging && response.paging.next){
                    console.log(response.paging.next)
                    getNextPagingComments(response.paging.next).then((data) => {
                        comments.push(...data);
                        resolve(comments);
                    });
                } else {
                    resolve(comments);
                }
            }
        );
    })
}

const getNextPagingComments = (next: string): Promise<any[]> => {
    const comments: any[] = [];
    return new Promise((resolve) => {
        window.FB.api(
            next,
            (response) => {
                console.log(response)
                comments.push(...response.data);
                if (response.paging && response.paging.next){
                    getNextPagingComments(`${response.paging.next}`).then((data) => {
                        comments.push(...data);
                        resolve(comments);
                    });
                } else {
                    resolve(comments);
                }
            }
        );
    })
}