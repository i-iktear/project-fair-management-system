import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Iktear',
        email: 'iktear@gmail.com',
        universityId: '173-35-2250',
        password: bcrypt.hashSync('abc123',15),
        isAdmin: true
    },
    {
        name: 'Iktear uddin',
        email: 'iktearuddin@gmail.com',
        universityId: '173-35-2251',
        password: bcrypt.hashSync('abc123',15),
    },
    {
        name: 'Iktear uddin emon',
        email: 'iktearuddinemon@gmail.com',
        universityId: '173-35-2252',
        password: bcrypt.hashSync('abc123',15),
    },
]

export default users