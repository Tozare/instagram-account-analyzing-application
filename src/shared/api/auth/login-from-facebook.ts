export const loginFromFacebook = () => {
    return new Promise((resolve) => {
        window.FB.login(
            (response) => {
                if (response.authResponse?.accessToken){
                    localStorage.setItem("facebook-token", response.authResponse?.accessToken);
                    resolve(response.authResponse?.accessToken);
                }
                // setFacebookUserAccessToken(response.authResponse?.accessToken);
            },
            {
                // Scopes that allow us to publish content to Instagram
                scope: "public_profile,instagram_basic,pages_read_engagement,pages_show_list,instagram_manage_insights,instagram_manage_comments,pages_manage_engagement",
            }
        );
    })
};