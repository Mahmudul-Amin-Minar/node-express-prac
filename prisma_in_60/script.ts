import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient({log: ["query"]})
const prisma = new PrismaClient()

async function main(){
    // await prisma.user.deleteMany();
    const user = await prisma.user.update({
        where: {
            email: 'm@gmail.com'
            // name: { not: 'saly'},
            // age: {lt:30}
        },
        data: {
            userPreference: {
                connect: {
                    id: "228f1512-b593-47ba-857d-19632608f32a"
                }
            }
        }
    })
    // await prisma.user.deleteMany();
    // const user = await prisma.user.findMany();
    // const user = await prisma.user.update({
    //     where: {
    //         email: "minar@gmail.com",
    //     },
    //     data: {
    //         email: 'm@gmail.com'
    //     }
    // })
    // const preference = await prisma.userPreference.create({
    //     data: {
    //         emailUpdated: true
    //     },
    // })
    console.log(user);
}

main()
    .catch(e => {
        console.log(e.message);
    })
    .finally(async () => {
        await prisma.$disconnect()
    })