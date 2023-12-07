import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const influencers = [
  {
    _id: userIds[0],
    username: "traveler22",
    password: "wanderlust",
    firstName: "Alex",
    lastName: "Turner",
    email: "alex.turner@example.com",
    location: "Explorer City",
    gender: "Male",
    age: 29,
    tags: ["Travel", "Photography", "Adventure"],
    bio: "A traveler with a passion for capturing moments. Always seeking new adventures and exploring the beauty of the world.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1588000000,
    updatedAt: 1677430400,
    __v: 0,
  },
  {
    _id: userIds[1],
    username: "gamerGirl",
    password: "gameOn123",
    firstName: "Sophie",
    lastName: "Roberts",
    email: "sophie.roberts@example.com",
    location: "Gameville",
    gender: "Female",
    age: 26,
    tags: ["Gaming", "Technology", "Anime"],
    bio: "Passionate gamer and tech enthusiast. Anime lover who enjoys diving into virtual worlds and creating epic gaming moments.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1580000000,
    updatedAt: 1679027200,
    __v: 0,
  },
  {
    _id: userIds[2],
    username: "natureExplorer",
    password: "outdoorsy123",
    firstName: "Connor",
    lastName: "Miller",
    email: "connor.miller@example.com",
    location: "Nature Haven",
    gender: "Male",
    age: 31,
    tags: ["Nature", "Hiking", "Photography"],
    bio: "Nature enthusiast and avid hiker. Finds joy in exploring the great outdoors and capturing its breathtaking beauty.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1572000000,
    updatedAt: 1680624000,
    __v: 0,
  },
  {
    _id: userIds[3],
    username: "artisticSoul",
    password: "createArt",
    firstName: "Eva",
    lastName: "Harrison",
    email: "eva.harrison@example.com",
    location: "Artopia",
    gender: "Female",
    age: 28,
    tags: ["Art", "Design", "Creativity"],
    bio: "Artistic soul with a passion for creating. Constantly inspired by the beauty of art and the endless possibilities of imagination.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1564000000,
    updatedAt: 1682220800,
    __v: 0,
  },
  {
    _id: userIds[4],
    username: "foodExplorer",
    password: "tasteWorld",
    firstName: "Oliver",
    lastName: "Baker",
    email: "oliver.baker@example.com",
    location: "Culinary City",
    gender: "Male",
    age: 27,
    tags: ["Food", "Culinary", "Foodie"],
    bio: "Food explorer and culinary enthusiast. A connoisseur of flavors, always on a quest to taste the world's diverse cuisines.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1556000000,
    updatedAt: 1683817600,
    __v: 0,
  },
  {
    _id: userIds[5],
    username: "codingNinja",
    password: "codeMaster",
    firstName: "Sophia",
    lastName: "Nguyen",
    email: "sophia.nguyen@example.com",
    location: "Code City",
    gender: "Female",
    age: 30,
    tags: ["Programming", "Tech", "Innovation"],
    bio: "Coding ninja with a passion for technology and innovation. Always striving to master the art of programming.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1548000000,
    updatedAt: 1685414400,
    __v: 0,
  },
  {
    _id: userIds[6],
    username: "musicHarmony",
    password: "melodicVibes",
    firstName: "Mason",
    lastName: "Johnson",
    email: "mason.johnson@example.com",
    location: "Harmony Town",
    gender: "Male",
    age: 32,
    tags: ["Music", "Concerts", "Soulful"],
    bio: "A music lover who finds harmony in every note. Enjoys live concerts and the soulful vibes of different genres.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1540000000,
    updatedAt: 1687011200,
    __v: 0,
  },
  {
    _id: userIds[7],
    username: "bookAdventurer",
    password: "exploreBooks",
    firstName: "Lily",
    lastName: "Davis",
    email: "lily.davis@example.com",
    location: "Booktopia",
    gender: "Female",
    age: 29,
    tags: ["Books", "Reading", "Literature"],
    bio: "A book adventurer on a journey through the realms of literature. Loves exploring new worlds through the pages of a book.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1532000000,
    updatedAt: 1688608000,
    __v: 0,
  },
  {
    _id: userIds[8],
    username: "fitnessFreak",
    password: "fitLife123",
    firstName: "Daniel",
    lastName: "Taylor",
    email: "daniel.taylor@example.com",
    location: "Fitland",
    gender: "Male",
    age: 28,
    tags: ["Fitness", "Workout", "HealthyLiving"],
    bio: "Fitness freak dedicated to a healthy lifestyle. Enjoys challenging workouts and inspiring others to embrace wellness.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1524000000,
    updatedAt: 1690204800,
    __v: 0,
  },
  {
    _id: userIds[9],
    username: "fashionista",
    password: "styleIcon",
    firstName: "Ava",
    lastName: "Clark",
    email: "ava.clark@example.com",
    location: "Fashion City",
    gender: "Female",
    age: 25,
    tags: ["Fashion", "Style", "Trendsetter"],
    bio: "Fashionista with an eye for style. Passionate about staying on trend and expressing creativity through clothing.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1516000000,
    updatedAt: 1691801600,
    __v: 0,
  },
  {
    _id: userIds[10],
    username: "adventureSeeker",
    password: "seekTheUnknown",
    firstName: "Max",
    lastName: "Cooper",
    email: "max.cooper@example.com",
    location: "Adventureland",
    gender: "Male",
    age: 30,
    tags: ["Adventure", "Travel", "Exploration"],
    bio: "Adventure seeker always on the lookout for the next thrill. Loves exploring the unknown and pushing boundaries.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1508000000,
    updatedAt: 1693398400,
    __v: 0,
  },
  {
    _id: userIds[11],
    username: "animalLover",
    password: "pawsAndClaws",
    firstName: "Emma",
    lastName: "Turner",
    email: "emma.turner@example.com",
    location: "Animal Haven",
    gender: "Female",
    age: 27,
    tags: ["Animals", "Pets", "Nature"],
    bio: "Passionate about animals and nature. A dedicated advocate for the well-being of furry friends and wildlife.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1500000000,
    updatedAt: 1694995200,
    __v: 0,
  },
  {
    _id: userIds[12],
    username: "techExplorer",
    password: "exploreTech",
    firstName: "Ryan",
    lastName: "Miller",
    email: "ryan.miller@example.com",
    location: "Tech Haven",
    gender: "Male",
    age: 29,
    tags: ["Technology", "Innovation", "Geek"],
    bio: "Tech explorer with a curiosity for innovation. Enjoys diving into the latest tech trends and experimenting with new gadgets.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1492000000,
    updatedAt: 1696592000,
    __v: 0,
  },
  {
    _id: userIds[13],
    username: "scienceGeek",
    password: "geekyScience",
    firstName: "Grace",
    lastName: "Smith",
    email: "grace.smith@example.com",
    location: "Science City",
    gender: "Female",
    age: 26,
    tags: ["Science", "Discovery", "Curiosity"],
    bio: "Science geek with an insatiable curiosity. Always fascinated by the wonders of the universe and the joy of discovery.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1484000000,
    updatedAt: 1698188800,
    __v: 0,
  },
  {
    _id: userIds[14],
    username: "coffeeLover",
    password: "javaAddict",
    firstName: "Dylan",
    lastName: "White",
    email: "dylan.white@example.com",
    location: "Coffeetopia",
    gender: "Male",
    age: 28,
    tags: ["Coffee", "Caffeine", "CoffeeLover"],
    bio: "Coffee lover and caffeine addict. Finds joy in the aroma and taste of different coffee beans from around the world.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1476000000,
    updatedAt: 1699785600,
    __v: 0,
  },
  {
    _id: userIds[15],
    username: "movieBuff",
    password: "cinemaMagic",
    firstName: "Isabel",
    lastName: "Turner",
    email: "isabel.turner@example.com",
    location: "Cinemaland",
    gender: "Female",
    age: 29,
    tags: ["Movies", "Cinema", "FilmBuff"],
    bio: "Movie buff and cinema enthusiast. Enjoys exploring the magic of storytelling through films from various genres.",
    contacts: [],
    platforms: [],
    index: [],
    createdAt: 1468000000,
    updatedAt: 1701382400,
    __v: 0,
  },
];