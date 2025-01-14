import bcryptjs from 'bcryptjs';

const users = [
    {
        name: 'user1',
        email: 'user1@gmail.com',
        password: bcryptjs.hashSync('123456', 8)
    },
    {
        name: 'user2',
        email: 'user2@gmail.com',
        password: bcryptjs.hashSync('123456', 8)
    }]

export default users;