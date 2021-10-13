const FACEBOOK_APP_ID = "383837143125626";

export const initFacebookSDK = () => {
    return new Promise((resolve) => {
        // Wait for the Facebook SDK to initialize before starting the React app.
        // @ts-ignore
        window.fbAsyncInit = function () {
            // @ts-ignore
            window.FB.init({
                appId: FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: "v11.0",
            });

            resolve();
        };

        // Load the Facebook SDK script.
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            // @ts-ignore
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            // @ts-ignore
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    });
}