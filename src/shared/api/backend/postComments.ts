import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/comments/';

export const postComments = async (comments: any[]) => {

    const bodyData = comments.map((comment) => {

        const replies = comment.replies
            ? comment.replies.data.map((reply) => {
                return {
                    id: reply.id,
                    text: reply.text,
                    date_posted: reply.timestamp
                }
            }) :
            []

        return {
            post_id: comment.media.id,
            id: comment.id,
            text: comment.text,
            date_posted: comment.timestamp,
            username: comment.username,
            like_count: comment.like_count,
            replies: replies
        }
    })

    console.log(bodyData);

    const res= await axios({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: bodyData
    });

    return res;
}