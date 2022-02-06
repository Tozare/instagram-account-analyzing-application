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
    // // const postData = posts.map((post-analysis) => {
    // //     return {
    // //         post_id: post-analysis.id,
    // //         text: post-analysis.text,
    // //         date_posted: post-analysis.timestamp,
    // //         profile: post-analysis.owner,
    // //         like_count: post-analysis.like_count,
    // //         comment_count: post-analysis.comment_count
    // //     }
    // // })
    //
    // // axios.post-analysis(url, postData)
    // axios({
    //     method: 'post-analysis',
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
