export const dummyPosts = [
  {
    id: "p1",
    user: { name: "Robert Hammond", avatar: "https://source.unsplash.com/random/80x80?person", verified: true },
    time: "20 min ago",
    text: "My wife prepared a surprise trip for me. I'm so thankful and I love her very much. Here are some of the best shots from our trip to Sri Lanka.",
    media: [
      "https://source.unsplash.com/random/800x500?nature,1",
      "https://source.unsplash.com/random/800x500?nature,2"
    ],
    likes: 230,
    comments: 6,
    shares: 2
  },
  {
    id: "p2",
    user: { name: "Amelie Shiba", avatar: "https://source.unsplash.com/random/80x80?girl", verified: false },
    time: "Thursday, 10:40 AM",
    text: "I'm selling these clothes. Anyone interested? Or shall we do a swap evening at mine?",
    media: ["https://source.unsplash.com/random/400x400?clothes", "https://source.unsplash.com/random/400x400?shirt", "https://source.unsplash.com/random/400x400?jacket"],
    likes: 120,
    comments: 12,
    shares: 5
  }
];

export const events = [
  { id: "e1", title: "Garden BBQ", date: "Sat 16 June", location: "Tom's Garden" },
  { id: "e2", title: "City Council Vote", date: "Sat 16 June", location: "Town Hall" },
  { id: "e3", title: "Post-punk Festival", date: "Sat 16 June", location: "Tom's Garden" },
  { id: "e4", title: "Maybe Boring Stand-up", date: "Sat 16 June", location: "Tom's Garden" },
  { id: "e5", title: "Yeboncé Tour 2023", date: "Sat 16 June", location: "Tom's Garden" },
];

export const birthdays = [
  { id: "b1", name: "Bob Hammond", avatar: "https://source.unsplash.com/random/80x80?man", note: "Turning 28 years old" },
  { id: "b2", name: "Haarper Mitchell", avatar: "https://source.unsplash.com/random/80x80?woman", note: "Turning 21 years old" },
];

export const messages = [
  { id: "m1", from: "u1", name: "Mark Larsen", avatar: "https://source.unsplash.com/random/80x80?man1", text: "Hey! When can we meet?", time: new Date(), seen: false },
  { id: "m2", from: "u2", name: "Ethan Reynolds", avatar: "https://source.unsplash.com/random/80x80?man2", text: "Nice shots!", time: new Date(Date.now()-1000*60*60*5), seen: true }
];
