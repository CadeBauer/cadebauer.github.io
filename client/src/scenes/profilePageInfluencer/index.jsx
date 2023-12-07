import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import Banner from "scenes/widgets/Banner";
import Facebook from "components/Facebook";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/influencer/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (<Box>
        <Navbar />
        <Banner userId={userId} bannerPicturePath={user.bannerPicturePath}/>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
                <UserWidget userId={userId} profilePicturePath={user.profilePicturePath}/>
                <Box m="2rem 0" />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                <Box m="2rem 0" />
            </Box>
        </Box>
        <Facebook />
    </Box>);
};

export default ProfilePage;