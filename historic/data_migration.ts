import db from '../src/db/db.ts'
import { loresTable } from '../src/db/schema.ts'

const existingData = [
  {
    _id: '648dc3a92cc80f04302fcf9d',
    title: 'Like a gas station',
    subtitle: 'N/A',
    game: '(Classic) World of Warcraft',
    text: "I'm being pumped like a gas station. *Claps feet together in desk chair*",
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2023-06-14T20:16:18.620Z',
    __v: 0,
  },
  {
    _id: '6494b695882f15d7b16e3bd6',
    title: 'Rat Waltz',
    subtitle: 'A sidetrail from RatJam',
    game: 'N/A',
    text: 'Kathy seen the VR dancing rat gif and called it RatWaltz',
    createdAt: '2023-06-22T15:48:02.100Z',
    updatedAt: '2023-06-22T15:48:02.100Z',
    __v: 0,
  },
  {
    _id: '661ecb59f095e046d4bc8117',
    title: "Yea But I'm Da Baby",
    subtitle: 'Library DnD',
    game: 'Dungeons and Dragons',
    text: "Player: Yea so I'm a baby and I throw my adult friend who carries me in his backpack.\n\nDM: Babies don't really have that much autonomy.\n\nPlayer: Yea but I'm the baby and I throw my friend.",
    createdAt: '2024-03-19T07:55:36.891Z',
    updatedAt: '2025-11-14T22:40:05.949Z',
    __v: 0,
  },
  {
    _id: '648dc3622cc80f04302fcf9a',
    title: 'Imagine the smell',
    subtitle: 'N/A',
    game: '(Classic) World of Warcraft',
    text: 'God I wish that where me, imagine the smell.',
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2025-11-14T19:52:49.226Z',
    __v: 0,
  },
  {
    _id: '648dc5d92cc80f04302fcfad',
    title: 'Cmon Ricky say something funny',
    subtitle: 'Me and Ricky in a desert on a sand boat',
    game: 'Last Oasis',
    text: 'Be Ricky(Raymond) With Weed Depression: Cmon on Ricky(Winston) say something funny.\n\nHe either said "Say something funny" or "Make me laugh".\n\nIt was very non-chalant  how he said it, not really considering the ask because we are so fucking goofed up in gamer mode to think about the implications.',
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2023-06-14T20:16:18.620Z',
    __v: 0,
  },
  {
    _id: '6494b653882f15d7b16e3bb1',
    title: 'What error?',
    subtitle: "What error guys, I don't see any error.",
    game: 'N/A',
    text: "Big C from Together but separate devs telling a guy who couldn't get the repo to run there is no error after the guy posted a screenshot of it.",
    createdAt: '2023-06-22T15:48:02.100Z',
    updatedAt: '2023-06-22T15:48:02.100Z',
    __v: 0,
  },
  {
    _id: '666593c4f095e046d4bc8186',
    title: 'Maga Gay',
    subtitle: 'Not a good game for that guy.',
    game: 'Heroes of The Storm',
    text: 'This shit is maga gay. fr',
    createdAt: '2024-03-19T07:55:36.891Z',
    updatedAt: '2025-11-15T01:42:09.328Z',
    __v: 0,
  },
  {
    _id: '6494b5a3882f15d7b16e3b97',
    title: 'Oh my godddddddd',
    subtitle: 'N/A',
    game: 'Force of Nature 2',
    text: "Winston: Ryze, listen.\n*normal voice* Oh my godddddd\n\nWinston: Now come here to this corner of the fence, tell me what's wrong with it.\n*muffled voice* Ohhhh myyyyy gooodddddddddddd",
    createdAt: '2023-06-22T15:48:02.100Z',
    updatedAt: '2023-06-22T20:58:23.068Z',
    __v: 0,
  },
  {
    _id: '648a249e2cc80f04302fcf68',
    title: 'Senior Developer',
    subtitle: '90 cents / hr',
    game: 'N/A',
    text: 'This one came to fruition because I found a Senior Software Engineer position that paid $27/hr. We memed the hourly rate down to 90 cents/hr over a couple of hours.',
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2023-06-14T20:16:18.620Z',
    __v: 0,
  },
  {
    _id: '661ecbcbf095e046d4bc8137',
    title: 'Kubbies',
    subtitle: 'K8',
    game: 'World of Warcraft: Ironcow',
    text: 'Talking about kubernetes until it spiraled into calling it kubbies.',
    createdAt: '2024-03-19T07:55:36.891Z',
    updatedAt: '2024-03-19T07:55:36.891Z',
    __v: 0,
  },
  {
    _id: '6494b4f9882f15d7b16e3b81',
    title: 'What do I do now?',
    subtitle: 'idk, breathe or something.',
    game: 'Runegame',
    text: 'Some guy asked for advice on how to do Slayer afk-ish. I told him how, he goes and starts, then asks "What do I do now?"',
    createdAt: '2023-06-22T15:48:02.100Z',
    updatedAt: '2023-06-22T15:48:02.100Z',
    __v: 0,
  },
  {
    _id: '648dc4f12cc80f04302fcfa6',
    title: 'KissaHomie Is Gay',
    subtitle: 'QT and Dyrus Tomfoolery ',
    game: 'N/A',
    text: 'Dyrus asks QT if kissahomie is gay, to which he replies "kissahomie is gay" then proceeds to make kissing face/noise.',
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2023-06-14T20:16:18.620Z',
    __v: 0,
  },
  {
    _id: '651309d5bda32f0005e7a714',
    title: 'Lesbians Am Stronger Together',
    subtitle: 'Two Lesbians Holding Hands Playing Wildermyth',
    game: 'Wildermyth',
    text: 'While in combat there was some sorta bonus we got for being near each-other/enemies. Both of us had female characters, so we started saying "Lesbians am stronger/strongest together"; which also served as a reminder to group up when someone said it.',
    createdAt: '2023-06-23T00:43:11.061Z',
    updatedAt: '2025-11-15T01:37:05.591Z',
    __v: 0,
  },
  {
    _id: '68bbbfe1a1989dbd6fae3a15',
    title: 'Mouth open running.',
    subtitle: 'Not smart enough for boots.',
    game: 'Path of Exile 2',
    text: 'Act 2 at the Hyena boss after they added running to the game, and if you get hit while running you do a barrel roll. While I (Winston) was running up the hill I got nailed by the archers and said (paraphrasing) "Oh my god they fucking got me, I had my mouth open and everything". This all happened right after meme\'ing about not being smart enough to put on a pair of boots because INT too low.',
    createdAt: '2025-05-15T19:51:52.436Z',
    updatedAt: '2025-05-15T19:51:52.436Z',
    __v: 0,
  },
  {
    _id: '68d873d0a1989dbd6fae3bb1',
    title: 'Panjaro',
    subtitle: "Pandora's Jar",
    game: 'Greek Mythology',
    text: "AI referenced Pandora's box as Pandora's Jar",
    createdAt: '2025-05-15T19:51:52.436Z',
    updatedAt: '2025-05-15T19:51:52.436Z',
    __v: 0,
  },
  {
    _id: '648dc49a2cc80f04302fcfa3',
    title: 'Wait what',
    subtitle: 'Fucking with Dyrus QT style',
    game: 'N/A',
    text: "Be Other Person:  *Speaks to you about a subject*\nBe You: Wait what... *Even though you got it you fuck with them as if you didn't understand/hear*\n\n",
    createdAt: '2023-06-14T20:16:18.620Z',
    updatedAt: '2025-09-06T05:02:25.999Z',
    __v: 0,
  },
  {
    _id: '6494b3a9882f15d7b16e3b15',
    title: 'Look what Jade taught me',
    subtitle: 'Smile',
    game: 'N/A',
    text: 'Neighbor kid taught us how to say "Bullshit" in sign language.\n\nhttps://www.youtube.com/watch?v=O-8SMFd1lgQ',
    createdAt: '2023-06-22T15:48:02.100Z',
    updatedAt: '2023-06-22T21:03:18.429Z',
    __v: 0,
  },
  {
    _id: '68ea6cbba1989dbd6fae3ce3',
    title: 'When Rickies Big Hole Is Out',
    subtitle: "Rickys' Big Hole.",
    game: 'Nobody Saves The World',
    text: 'Ricky(Raymond) using the bomb on the magician asking Ricky(Winston) if he could let the "big bomb" do its think and not kill creatures. Ricky(Winston) interprets that as "big hole". When Rickys\'(Raymond) big hole goes off it really fucking goes off.',
    createdAt: '2025-05-15T19:51:52.436Z',
    updatedAt: '2025-11-14T22:50:59.365Z',
    __v: 0,
  },
  {
    _id: '6915ee75a1989dbd6fae3e93',
    title: 'This bitch needs an electric chair',
    subtitle: "But not the kind you're thinking of",
    game: 'N/A',
    text: 'Ricky went to get something for his mom from the cabinet. He came back and immediately said "This bitch needs an electric chair", meaning like a power wheelchair. Sounded like he wanted to see her fry',
    createdAt: '2025-05-15T19:51:52.436Z',
    updatedAt: '2025-05-15T19:51:52.436Z',
    __v: 0,
  },
]

async function seed() {
  console.log('Starting seed process...')

  try {
    // Transform the MongoDB data to match the PostgreSQL schema
    const loreEntries = existingData.map((entry) => ({
      title: entry.title,
      subtitle: entry.subtitle,
      game: entry.game,
      text: entry.text,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }))

    // Insert all entries
    const result = await db.insert(loresTable).values(loreEntries).returning()

    console.log(`Successfully inserted ${result.length} lore entries!`)
    console.log('Sample entry:', result[0])
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

seed()
