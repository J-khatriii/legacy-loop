import logo from './logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import group_users from './group_users.png'
import { Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'
import google_icon from './google.svg'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    group_users,
    sponsored_img,
    google_icon,
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];

// 🧑 Dummy Users Data

export const dummyUserData = {
  _id: "user_1",
  full_name: "John Warren",
  username: "johnw",
  bio: "UI/UX designer passionate about minimalism and user delight.",
  location: "New York, USA",
  followers: ["user_2", "user_3"],
  following: ["user_5"],
  connections: ["user_2"],
  profile_picture: sample_profile,
};

export const dummyUser2Data = {
  _id: "user_2",
  full_name: "Daniel Reed",
  username: "daniel",
  bio: "Full Stack Developer | Building clean and scalable web apps.",
  location: "London, UK",
  followers: ["user_1", "user_3"],
  following: ["user_1", "user_4"],
  connections: ["user_1"],
  profile_picture: "https://i.pravatar.cc/150?img=7",
};

export const dummyUser3Data = {
  _id: "user_3",
  full_name: "Emily Carter",
  username: "emily",
  bio: "Content strategist and storyteller. Crafting messages that connect.",
  location: "Sydney, Australia",
  followers: ["user_1", "user_5"],
  following: ["user_2"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=10",
};

export const dummyUser4Data = {
  _id: "user_4",
  full_name: "Leo Martin",
  username: "leo",
  bio: "Product manager focused on impactful, user-centric solutions.",
  location: "Berlin, Germany",
  followers: ["user_2"],
  following: ["user_3"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=14",
};

export const dummyUser5Data = {
  _id: "user_5",
  full_name: "Mia Thompson",
  username: "mia",
  bio: "Marketing enthusiast and growth hacker 🚀",
  location: "Toronto, Canada",
  followers: ["user_1", "user_3"],
  following: ["user_4"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=15",
};

export const dummyUser6Data = {
  _id: "user_6",
  full_name: "Ryan Adams",
  username: "ryan",
  bio: "DevOps engineer automating the future.",
  location: "Austin, USA",
  followers: ["user_7"],
  following: ["user_8"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=17",
};

export const dummyUser7Data = {
  _id: "user_7",
  full_name: "Olivia Parker",
  username: "olivia",
  bio: "Freelance graphic designer turning ideas into visuals 🎨",
  location: "Paris, France",
  followers: ["user_6"],
  following: ["user_9"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=21",
};

export const dummyUser8Data = {
  _id: "user_8",
  full_name: "Ethan Walker",
  username: "ethan",
  bio: "Backend engineer specializing in APIs and performance.",
  location: "San Francisco, USA",
  followers: ["user_2"],
  following: ["user_6", "user_9"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=23",
};

export const dummyUser9Data = {
  _id: "user_9",
  full_name: "Sophia Kim",
  username: "sophia",
  bio: "AI researcher exploring machine learning and data ethics.",
  location: "Seoul, South Korea",
  followers: ["user_10"],
  following: ["user_1"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=25",
};

export const dummyUser10Data = {
  _id: "user_10",
  full_name: "Noah Patel",
  username: "noah",
  bio: "Cybersecurity analyst with a love for puzzles and encryption.",
  location: "Mumbai, India",
  followers: ["user_11"],
  following: ["user_9"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=27",
};

export const dummyUser11Data = {
  _id: "user_11",
  full_name: "Isabella Rossi",
  username: "isabella",
  bio: "Photographer capturing emotions in motion 📸",
  location: "Rome, Italy",
  followers: ["user_10", "user_12"],
  following: ["user_3"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=31",
};

export const dummyUser12Data = {
  _id: "user_12",
  full_name: "Liam Nguyen",
  username: "liam",
  bio: "Frontend developer blending code and creativity ✨",
  location: "Singapore",
  followers: ["user_2", "user_11"],
  following: ["user_8"],
  connections: [],
  profile_picture: "https://i.pravatar.cc/150?img=33",
};

export const dummyConnectionsData = [
  dummyUserData,
  dummyUser2Data,
  dummyUser3Data,
  dummyUser4Data,
  dummyUser5Data,
  dummyUser6Data,
  dummyUser7Data,
  dummyUser8Data,
  dummyUser9Data,
  dummyUser10Data,
  dummyUser11Data,
  dummyUser12Data,
];


export const dummyStoriesData = [
    {
        "_id": "68833d466e4b42b685068860",
        "user": dummyUserData,
        "content": "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄. The next post will make more sense 🧩.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-10-26T02:16:06.958Z",
        "updatedAt": "2025-10-25T08:16:06.958Z",
    },
    {
        "_id": "688340046e4b42b685068a73",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:48.134Z",
        "updatedAt": "2025-07-25T08:27:48.134Z",
    },
    {
        "_id": "68833fe96e4b42b685068a5e",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
        "media_type": "video",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:21.289Z",
        "updatedAt": "2025-07-25T08:27:21.289Z",
    },
    {
        "_id": "68833e136e4b42b685068937",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:19:31.080Z",
        "updatedAt": "2025-07-25T08:19:31.080Z",
    },
    {
        "_id": "68833d706e4b42b685068875",
        "user": dummyUserData,
        "content": "🤫 Not every moment needs to be loud. Sometimes, the best things happen in silence — in drafts 📝, in progress 🧪, in planning 📊. That's where I am right now.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:16:48.617Z",
        "updatedAt": "2025-07-25T08:16:48.617Z",
    },
    {
        "_id": "68833c9e6e4b42b6850687e7",
        "user": dummyUserData,
        "content": "✨ Something meaningful is on the way. I'm working behind the scenes 🛠️ to bring it all together. This space is just the beginning 🌱. Stay tuned 👀.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:13:18.111Z",
        "updatedAt": "2025-07-25T08:13:18.111Z",
    }
]


export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
        "image_urls": [
            "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUserData,
        "content": "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨\r\n\r\n#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUserData,
        "content": "This is a sample paragraph with some #hashtags like #socialmedia and #marketing. Let's find them!",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e3e47ba0cf0fecba19947",
        "user": dummyUserData,
        "content": "",
        "image_urls": [
            "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg"
        ],
        "post_type": "image",
        "likes_count": [
            "user_2zdJbcAqiOX9jq2DIueBRQn0lMt"
        ],
        "createdAt": "2025-07-09T10:02:47.213Z",
        "updatedAt": "2025-07-09T10:09:37.075Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUserData,
        "content": "Finally , got the car !",
        "image_urls": [
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    },
    {
        "_id": "686e361389841ba9f2633201",
        "user": dummyUserData,
        "content": "Hello, Everyone this is my first Post",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T09:27:47.529Z",
        "updatedAt": "2025-07-09T09:27:47.529Z",
    }
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "I seen your profile",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData,
        "to_user_id": dummyUserData,
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser3Data,
        "to_user_id": dummyUserData,
        "text": "how are you",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "yah , this tablet is good",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    },
        {
        "_id": "6878cc2817a54e4d3748010c",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "you can purchase it from amazon",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-08-17T10:10:48.956Z",
        "updatedAt": "2025-08-25T10:43:50.346Z",
        "seen": true
    },
]

// export const dummyConnectionsData = [
//     dummyUserData,
//     dummyUser2Data,
//     dummyUser3Data,
//     dummyUser3Data
// ]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyPendingConnectionsData = [
    dummyUserData
]