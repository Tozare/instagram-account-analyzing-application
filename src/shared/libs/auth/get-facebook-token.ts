export const GetFacebookToken = () => {
    const facebookToken = localStorage.getItem("facebook-token");
    if (facebookToken){
        return facebookToken;
    } else {
        return "";
    }
}