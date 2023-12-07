import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import InfluencersWidget from "scenes/widgets/InfluencersWidget";
import SearchBarWidget from "scenes/widgets/SearchBarWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const theme = useTheme();

    return (<Box>
        <Navbar />
        <Divider backgroundColor={theme.palette.neutral.light}/>
        <SearchBarWidget />
        <InfluencersWidget />
        {/* <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} />
            </Box>
            {isNonMobileScreens &&
                <Box flexBasis="26%">
                    <AdvertWidget />
                    <Box m="2rem 0" />
                    <FriendsListWidget userId={_id} />
                </Box>}
        </Box> */}
    </Box>);
};

export default HomePage;