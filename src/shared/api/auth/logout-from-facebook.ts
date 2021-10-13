export const logoutFromFacebook = () => {
    return new Promise((resolve) => {
        window.FB.logout(() => {
            resolve("");
            localStorage.removeItem("facebook-token");
        });
    })
}