import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import Influencer from "../models/Influencer.js";
import Business from "../models/Business.js";

/* REGISTER INFLUENCER */
export const registerInfluencer = async (req, res) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            email,
            profilePicturePath,
            location,
            gender,
            age,
            tags,
            bio,
            contacts,
            platforms
        } = req.body;

        //Encrypt the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newInfluencer = new Influencer({
            username,
            password: passwordHash,
            firstName,
            lastName,
            email,
            profilePicturePath,
            location,
            gender,
            age,
            tags,
            bio,
            contacts,
            platforms
        });

        var data = newInfluencer.username + " " + newInfluencer.firstName + " " + newInfluencer.lastName + " " + newInfluencer.email + " " + newInfluencer.location + " " + newInfluencer.gender + " " + newInfluencer.tags.join(" ") + " " + newInfluencer.bio;
        data = data.replace(/[^\dA-Z ]+/gi,"").toLowerCase();
        const dataMap = new Map();
        for (let term of data.split(" ")) {
            console.log(term);
            if (dataMap.has(term)) {
                dataMap.set(term, dataMap.get(term) + 1);
            } else {
                dataMap.set(term, 1);
            }
        }
        dataMap.delete("");
        newInfluencer.index = dataMap;

        const savedInfluencer = await newInfluencer.save();
        res.status(201).json(savedInfluencer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* REGISTER BUSINESS */
export const registerBusiness = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            profilePicturePath,
            location,
            bio,
            contacts
        } = req.body;

        //Encrypt the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newBusiness = new Business({
            username,
            password: passwordHash,
            email,
            profilePicturePath,
            location,
            bio,
            contacts
        });
        const savedBusiness = await newBusiness.save();
        res.status(201).json(savedBusiness);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* LOGGING IN */
//Production level authentication would use 3rd party company or have dedicated team
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        var business = false;
        var user = await Influencer.findOne({ email: email });
        if (!user) {
            user  = await Business.findOne({ email: email });
            business = true;
        }
        if (!user) return res.status(400).json({ msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user, business });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}