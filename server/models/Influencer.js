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
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
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
            default: "Default-banner.jpg",
        },
        business: {
            type: Boolean,
            default: false
        },
        location: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
        age: Number,
        tags: {
            type: Array,
            default: []
        },
        bio: {
            type: String,
            default: ""
        },
        contacts: {
            type: Array,
            default: []
        },
        platforms: {
            type: Map,
            default: []
        },
        index: {
            type: Map,
            default: []
        }
    },
    {timestamps: true}
);

const Influencer = mongoose.model("Influencer", UserSchema);
export default Influencer;