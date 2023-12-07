import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        profilePicturePath: {
            type: String,
            default: "",
        },
        bannerPicturePath: {
            type: String,
            default: "",
        },
        business: {
            type: Boolean,
            default: true
        },
        location: String,
        bio: String,
        contacts: {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
);

const Business = mongoose.model("Business", UserSchema);
export default Business;