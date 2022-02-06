import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/searchcomment/';

export const getCommentsBySearchText = async (searchComment: string) => {

    const res= await axios({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            text: searchComment,
            fields: ["id", "text", "date_posted", "like_count", "username","insult","identity_hate","obscene","severe_toxic","threat","toxic"]
        }
    });
    console.log(res);

    return res;
}
