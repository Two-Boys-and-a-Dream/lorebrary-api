const rawLore = [
    {
        title: 'title',
        subtitle: 'some description',
        text: 'additional text',
        game: 'game1',
    },
    {
        title: 'title2',
        subtitle: 'a new description',
        text: 'some additional text again',
        game: 'game2',
    },
]

const DBLore = [
    {
        _id: '507f191e810c19729de860ea',
        ...rawLore[0],
    },
    {
        _id: '3498n39g9qn59vq5vimq09fem',
        ...rawLore[1],
    },
]

module.exports = { rawLore, DBLore }
