import { Box } from "@mui/material";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState } from "react";

const Facebook = () => {
    const [profile, setProfile] = new useState(null);

    return (
        <LoginSocialFacebook
            appId="312023868316995"
            onResolve={(response) => {
                console.log(response);
                setProfile(response.data);
            }}
            onReject={(error) => {
                console.log(error);
            }}
        >
            <FacebookLoginButton />
        </LoginSocialFacebook>
    )
};

export default Facebook;