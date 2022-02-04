import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/posts/';

export const postPosts = (posts: any[]) => {
    console.log(posts);
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: posts
        })
            .then((res) => {
                console.log(res);
                resolve(res);
            })
            .catch((e) => {
                reject(e);
                console.log(e);
            })
        ;
    })
    // console.log(posts);
    // // const postData = posts.map((post) => {
    // //     return {
    // //         post_id: post.id,
    // //         text: post.text,
    // //         date_posted: post.timestamp,
    // //         profile: post.owner,
    // //         like_count: post.like_count,
    // //         comment_count: post.comment_count
    // //     }
    // // })
    //
    // // axios.post(url, postData)
    // axios({
    //     method: 'post',
    //     url: url,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify(posts)
    // })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })
    // ;
}