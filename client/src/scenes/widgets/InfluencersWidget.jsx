import UserWidget from "./UserWidget";
import { Box, Typography, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setInfluencers } from "state";
import { useEffect } from "react";

const InfluencersWidget = () => {
    const influencers = useSelector((state) => state.influencers);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    // const getUserPosts = async () => {
    //     const response = await fetch(`http://localhost:3001/posts/${userId}`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}`},
    //     });
    //     const data = await response.json();
    //     dispatch(setPosts({ posts: data }));
    // }

    const getInfluencers = async () => {
        const response = await fetch("http://localhost:3001/users/influencers", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setInfluencers({ influencers: data }));
    }

    useEffect(() => {
        getInfluencers();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box padding="0.5rem 0">
            {influencers[0] && influencers.map(
                (influencer) => (
                    <Box
                        padding="0.5rem 25%"
                        display="block"
                        justifyContent="center"
                    >
                        <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
                            <UserWidget key={influencer._id} userData={influencer} profilePicturePath={influencer.profilePicturePath}/>
                        </Box>
                    </Box>
                )
            )}
            {!influencers[0] && <Box justifyContent="center" display="flex" p="1rem">
                <Typography color={dark} fontSize="14px">No results found.</Typography>
            </Box>}
        </Box>
    )
};

export default InfluencersWidget;