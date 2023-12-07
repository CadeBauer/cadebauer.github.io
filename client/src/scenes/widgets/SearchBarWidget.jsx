import { Box, IconButton, InputBase, useTheme, useMediaQuery} from "@mui/material";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import SearchFilter from "components/SearchFilter";
import { useState } from "react";
import { setInfluencers } from "state";
import { useDispatch, useSelector } from "react-redux";

const SearchBarWidget = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const searchFilters = new Map();
    const [query, setQuery] = new useState("");
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;

    const getInfluencers = async (query=null, filters=null) => {
        var filter = "";
        if (query) {
            filter=`?q=${encodeURIComponent(query)}`;
        }
        if (filters) {
            if (query) {
                filter += "&"
            } else {
                filter = "?"
            }
            for (let x of filters) {
                filter += `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}&`
            }
            filter = filter.slice(0, filter.length - 1);
        }
        console.log(filter);
        const response = await fetch(`http://localhost:3001/users/influencers${filter}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setInfluencers({ influencers: data }));
    }

    const search = (query) => {
        getInfluencers(query, searchFilters);
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const setSearchFilters = (category, filters) => {
        if (filters.slice(0, 6) == "Select") {
            searchFilters.delete(category);
        } else {
            searchFilters.set(category, filters);
        }
        search(query);
    }

    const handleKeyDown = event => {
        if (event.key == "Enter") {
            search(query);
        }  
    };

    return <Box padding="2rem 26%" backgroundColor={alt} display="block" justifyContent="center" onKeyDown={handleKeyDown}>
        <FlexBetween backgroundColor={background} borderRadius="9px" gap="0.5rem" padding="0.4rem 1.5rem" margin="0 4rem" alignItems="center">
            <InputBase placeHolder="Search..." sx={{ width: '100%' }} value={query} onChange={handleChange}/>
            <IconButton>
                <Search onClick={() => search(query)}/>
            </IconButton>
        </FlexBetween>
        <Box display="flex" padding="1rem 0" gap="0.5rem">
            <SearchFilter category="gender" options={["Male", "Female"]} setSearchFilters={(category, filters) => setSearchFilters(category, filters)}/>
            <SearchFilter category="age" options={["12-18", "19-24", "25-34", "35-44", "45-54", "55-64", "65+"]} setSearchFilters={(category, filters) => setSearchFilters(category, filters)}/>
            <SearchFilter category="platforms" options={["YouTube", "Instagram", "Facebook", "TikTok", "LinkedIn", "Snapchat", "X", "Pinterest"]} setSearchFilters={(category, filters) => setSearchFilters(category, filters)}/>
            <SearchFilter category="location" options={["N/A"]} setSearchFilters={(category, filters) => setSearchFilters(category, filters)}/>
        </Box>
    </Box>
};

export default SearchBarWidget;