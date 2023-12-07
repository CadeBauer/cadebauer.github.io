import { useTheme, InputBase, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";

const SearchFilter = ({category, options, setSearchFilters}) => {
    const [selectedOption, setSelectedOption] = useState(`Select ${category}`);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setSearchFilters(category, event.target.value);
    };

    const { palette } = useTheme();
    const neutralLight = palette.neutral.light;

    return <FormControl variant="standard" value={selectedOption}>
        <Select
            value={selectedOption}
            sx={{
                backgroundColor: neutralLight,
                borderRadius: "9px",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight
                }
            }}
            input={<InputBase />}
            onChange={handleChange}
        >
            <MenuItem value={`Select ${category}`}>
                <em>{`Select ${category}`}</em>
            </MenuItem>
            {options.map(
                (item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                )
            )}
        </Select>
    </FormControl>
    // <Box backgroundColor={neutralLight} borderRadius="9px" margin="0 0.5rem" padding="0.5rem"><Typography>the</Typography></Box>
};

export default SearchFilter;