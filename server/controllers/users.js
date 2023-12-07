import Influencer from "../models/Influencer.js";
import Business from "../models/Business.js";

/* READ */
export const getInfluencer = async (req, res) => {
    try {
        const { id } = req.params;
        const influencer = await Influencer.findById(id);
        res.status(200).json(influencer);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id);
        res.status(200).json(business);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getSearchInfluencers = async (req, res) => {
    try {
        const q = req.query.q;
        const gender = req.query.gender;
        const age = req.query.age;
        const platforms = req.query.platforms;
        const location = req.query.location;
        const findParams = {};
        
        if (gender) {
            findParams.gender = gender;
        }
        if (age) {
            if (age.includes('+')) {
                findParams.age = {$gte: age.split("+")[0]}
            } else {
                findParams.age = {$gte: age.split("-")[0], $lte: age.split("-")[1]};
            }
        }
        if (platforms) {
            findParams.platforms = platforms;
        }
        if (location) {
            findParams.location = location;
        }

        var influencer = await Influencer.find(findParams);

        if (q) {
            const scores = new Map();

            const qTerms = q.replace(/[^\dA-Z ]+/gi,"").toLowerCase().split(" ");
            const stopWords = ['a', 'also', 'an', 'and', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'for', 'from', 'has',
                'have', 'however', 'if', 'in', 'is', 'not', 'of', 'on', 'or', 'so', 'than', 'that', 'the', 'their', 'there', 'these',
                'this', 'to', 'was', 'were', 'whatever', 'whether', 'which', 'with', 'would']

            for (let term of qTerms) {
                var numDocs = 0;
                for (let i of influencer) {
                    if (i.index.has(term)) {
                        numDocs += 1;
                    }
                }
                if (numDocs == 0) {
                    numDocs = 1;
                }
                // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`, {
                //     method: "GET"
                // });
                // const dict = await response.json();
                // var synonyms = [];
                // for (let x of dict[0]["meanings"]) {
                //     synonyms = synonyms.concat(x.synonyms);
                // }
                for (let i of influencer) {
                    var currentScore = 0;
                    if (stopWords.indexOf(term) == -1) {
                        // var hasSyn = false;
                        if (i.index.has(term)) {
                            currentScore += i.index.get(term)/numDocs;
                            // hasSyn = true;
                        } else {
                            //Comment out if using synonym API
                            currentScore -= 1/numDocs;
                        }
                        if (i.tags.join(" ").toLowerCase().indexOf(term) != -1) {
                            currentScore += 1/numDocs;
                        }
                        // for (let syn of synonyms) {
                        //     if (i.index.has(syn)) {
                        //         hasSyn = true;
                        //         currentScore += i.index.get(syn)/numDocs;
                        //     }
                        //     if (i.tags.join(" ").toLowerCase().indexOf(syn) != -1) {
                        //         currentScore += 1/numDocs;
                        //     }
                        // }
                        // if (!hasSyn) {
                        //     currentScore -= 1/numDocs;
                        // }
                    }
                    if (scores.has(i.username)) {
                        scores.set(i.username, scores.get(i.username) + currentScore);
                    } else {
                        scores.set(i.username, currentScore);
                    }
                    
                }
            }
            influencer = influencer.sort((a, b) => (scores.get(b.username) - scores.get(a.username))).filter(obj => scores.get(obj.username) > 0);
        }

        res.status(200).json(influencer);
        
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// export const getInfluencerContacts = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);

//         const friends = await Promise.all(
//             user.friends.map((id) => User.findById(id))
//         );
//         const formattedFriends = friends.map(
//             ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//                 return { _id, firstName, lastName, occupation, location, picturePath };
//             }
//         );
//         res.status(200).json(formattedFriends);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// }

/* UPDATE */
export const updateInfluencer = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, update } = req.body;
        const user = await Influencer.findById(id);

        switch(value) {
            case "firstName":
                user.firstName = update;
                break;
            case "firstName":
                user.lastName = update;
                break;
            case "location":
                user.location = update;
                break;
            case "age":
                user.age = update;
                break;
            case "gender":
                user.gender = update;
                break;
            case "bio":
                user.bio = update;
                break;
            case "username":
                user.username = update;
                break;
            case "email":
                user.email = update;
                break;
            case "tags":
                user.tags = update;
                break;
            default:
                res.status(404).json({ message: "Parameter to change not found"})
        }
        var data = user.username + " " + user.firstName + " " + user.lastName + " " + user.email + " " + user.location + " " + user.gender + " " + user.tags.join(" ") + " " + user.bio;
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
        user.index = dataMap;
        await user.save();
                
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}

export const updateInfluencerPicture = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, path } = req.body;
        const user = await Influencer.findById(id);

        if (value == "profile") {
            user.profilePicturePath = path;
        }
        if (value == "banner") {
            user.bannerPicturePath = path;
        }

        await user.save();
                
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}

// export const addRemoveFriend = async (req, res) => {
//     try {
//         const { id, friendId } = req.params;
//         const user = await User.findById(id);
//         const friend = await User.findById(friendId);
        
//         if (user.friends.includes(friendId)) {
//             user.friends = user.friends.filter((id) => id !== friendId);
//             friend.friends = friend.friends.filter((friendId) => id !== friendId);
//         } else {
//             user.friends.push(friendId);
//             friend.friends.push(id);
//         }
//         await user.save();
//         await friend.save();

//         const friends = await Promise.all(
//             user.friends.map((id) => User.findById(id))
//         );
//         const formattedFriends = friends.map(
//             ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//                 return { _id, firstName, lastName, occupation, location, picturePath };
//             }
//         );
        
//         res.status(200).json(formattedFriends);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// }