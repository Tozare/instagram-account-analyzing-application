import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/profiles/';

export const postUser = (user: any) => {
    console.log(user);

    const postData = {
        id: user.id,
        username: user.username,
        bio: user.biography,
        type: true
    }
    console.log(postData);
    // axios.post(url, postData)
    axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: postData
    })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        })
    ;

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url, false);
    // xhr.send(null);
    // // xhr.send(JSON.stringify(postData));

    // console.log(xhr.response);
}