const express = require('express');
const dotenv = require('dotenv');

const prisma = require('./db/prisma');

dotenv.config();

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    await prisma.user.create({
        data: {
            name: "Mahmudul Amin",
            email: "minar.onnorokom@gmail.com",
        }
    })

    const users = await prisma.user.findMany();
    // const posts = await prisma.user.findMany({
    //     where: {
    //         id: 2,
    //     },
    //     include: {
    //         posts: true
    //     }
    // });
    // console.log(posts)
    const names = users.map((user) => user.name);

    res.send(
        `there are ${names.length} users with the names of: ${names.join(", ")}`
    )
})

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
})