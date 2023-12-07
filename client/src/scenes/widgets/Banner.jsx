import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Banner = ({ userId, bannerPicturePath }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(null);
    const [imagePath, setImagePath] = useState(bannerPicturePath);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/influencer/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };
    
    useEffect(() => {
        getUser();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }
    
    const updatePicture = async (picture) => {
        const formData = new FormData();
        formData.append("picture", picture);
        formData.append("value", "banner")
        formData.append("path", picture.name);
    
        const response = await fetch(`http://localhost:3001/users/influencer/${userId}/picture`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        const data = await response.json();
        setImagePath(data.bannerPicturePath)
        setIsEdit(false);
    };

    return (
        <>
            {!isEdit ? (
                <Box width="100%" height="200px">
                    <img
                        width="100%"
                        height="100%"
                        alt="banner"
                        style={{objectFit: "cover"}}
                        src={`http://localhost:3001/assets/${imagePath}`}
                    />
                    {loggedInUserId == userId && <EditOutlinedIcon
                        sx={{
                            position: "absolute",
                            top: 84,
                            right: 4,
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                        onClick={() => setIsEdit(!isEdit)}
                    />}
                </Box>
            ) : (
                <Box
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => 
                            updatePicture(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" }}}
                                >
                                    <input {...getInputProps()} />
                                    <p>Add Banner Here</p>
                                </Box>
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
        </>
    );
}

export default Banner;