import { EditOutlined, LocationOnOutlined, AccountCircle } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EasyEdit from 'react-easy-edit';
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const UserWidget = ({ userData, userId, profilePicturePath }) => {
    const [user, setUser] = useState(userData);
    const [isEdit, setIsEdit] = useState(false);
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);
    const [imagePath, setImagePath] = useState(profilePicturePath);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const mediumMain = palette.neutral.mediumMain;
    const main = palette.neutral.main;
    const background = palette.background.default;
    const light = palette.primary.light;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/influencer/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };
    
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const {
        username,
        firstName,
        lastName,
        location,
        gender,
        age,
        tags,
        bio,
        platforms
    } = user;

    const save = async (value, update) => {
        //Production application will probably need security for this on the API side
        if (loggedInUserId == userId) {
            const response = await fetch(`http://localhost:3001/users/influencer/${userId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({value: value, update: update})
            });
            const data = await response.json();
            setUser(data);
        } else {
            alert("You are not the right user");
        }
    };

    const updatePicture = async (picture) => {
        const formData = new FormData();
        formData.append("picture", picture);
        formData.append("value", "profile")
        formData.append("path", picture.name);

        const response = await fetch(`http://localhost:3001/users/influencer/${userId}/picture`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        const data = await response.json();
        setImagePath(data.profilePicturePath);
    };

    const addTag = (value) => {
        tags.push(value);
        save("tags", tags);
        setIsAddingNewTag(false);
    };

    const deleteTag = (value) => {
        var index = tags.indexOf(value);
        if (index > -1) {
            tags.splice(index, 1);
        }
        save("tags", tags);
        setIsAddingNewTag(false);
    };

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem">
                    {!isEdit ? (
                        <>
                            {imagePath != "" ? ( 
                                <UserImage image={imagePath}/>
                            ) : (
                                <AccountCircle sx={{ fontSize: 64 }}/>
                            )}
                        </>
                    ) : (
                        <Box
                            gridColumn="span 1"
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
                                            {imagePath == "" ? (
                                                <p>Add Profile Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{imagePath}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    </FlexBetween>
                                )}
                            </Dropzone>
                        </Box>
                    )}
                    <Box>
                        {!isEdit ? (
                            <Typography
                                onClick={() => navigate(`/profile/${userId}`)}
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                {username}
                            </Typography>
                        ) : (
                            <EasyEdit
                                type="text"
                                onSave={(value) => save("username", value)}
                                value={username}
                            />
                        )}
                    </Box>
                </FlexBetween>
                {loggedInUserId == userId && <EditOutlined
                    onClick={() => setIsEdit(!isEdit)}
                    sx={{
                        "&:hover": {
                            color: light,
                            cursor: "pointer"
                        }
                    }}
                />}
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <FlexBetween p="1rem 0 0.5rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                        {!isEdit ? (
                            <Typography color={main} fontWeight="500">{location}</Typography>
                        ) : (
                            <EasyEdit
                                type="text"
                                onSave={(value) => save("location", value)}
                                value={location}
                            />
                        )}
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    {!isEdit ? (
                        <Typography color={main} fontWeight="500">{gender}, {age}</Typography>
                    ) : (
                        <>
                            <EasyEdit
                                type="text"
                                onSave={(value) => save("gender", value)}
                                value={gender != "" ? gender : "Enter gender"}
                            />
                            <Typography color={medium}>|</Typography>
                            <EasyEdit
                                type="text"
                                onSave={(value) => save("age", value)}
                                value={age != null ? age : "Enter age"}
                            />
                        </>
                    )}
                </Box>
            </FlexBetween>

            {(bio || isEdit) && <Divider />}

            {/* THIRD ROW */}
            {(bio || isEdit) && <Box p="1rem 0">
                {!isEdit ? (
                    <Typography color={medium}>{bio}</Typography>
                ) : (
                    <EasyEdit
                        type="text"
                        onSave={(value) => save("bio", value)}
                        value={bio != "" ? bio : "Enter bio"}
                    />
                )}
            </Box>}

            {(tags.length != 0 || isEdit) && <Divider />}

            {/* FOURTH ROW */}
            {(tags.length != 0 || isEdit) &&
                <Box display="flex" padding="1rem 0" gap="0.5rem">
                    {tags.map(
                        (item) => (
                            <Box display="flex" backgroundColor={background} borderRadius="9px" gap="0.25rem" padding="0.25rem 0.5rem">
                                <Typography color={dark} fontWeight="500">{item}</Typography>
                                {isEdit && <ClearIcon
                                    sx={{
                                        fontSize: "20px",
                                        color: mediumMain,
                                        "&:hover": {
                                            color: light,
                                            cursor: "pointer"
                                        }
                                    }}
                                    onClick={() => deleteTag(item)}
                                />}
                            </Box>
                        )
                    )}
                    {isEdit && isAddingNewTag &&
                        <Box display="flex" backgroundColor={background} borderRadius="9px" padding="0.25rem" >
                            <EasyEdit
                                type="text"
                                onSave={(value) => addTag(value)}
                                onCancel={() => setIsAddingNewTag(false)}
                                value="Enter tag"
                            />
                        </Box>
                    }
                    {isEdit && !isAddingNewTag &&
                        <Box display="flex" backgroundColor={background} borderRadius="9px" padding="0.25rem" >
                            <AddIcon
                                sx={{
                                    fontSize: "20px",
                                    color: mediumMain,
                                    "&:hover": {
                                        color: light,
                                        cursor: "pointer"
                                    }
                                }}
                                onClick={() => setIsAddingNewTag(true)}
                            />
                        </Box>
                    }
                </Box>
            }

            {/* FOURTH ROW
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                </FlexBetween>
            </Box> */}
        </WidgetWrapper>
    )
};

export default UserWidget;