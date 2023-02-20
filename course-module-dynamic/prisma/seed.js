const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
    const physics = await prisma.subject.upsert({
        where: { sub_name: 'physics' },
        update: {},
        create: {
            sub_name: 'physics',
            description: 'This is physics first part',
            fee: 1200,
            chapters: {
                create: [
                    {
                        chapter_name: 'Energy',
                        description: 'This chapter related to energy'
                    },
                    {
                        chapter_name: 'Light',
                        description: 'This chapter related to light'
                    }
                ]
            },
            lessons: {
                create: [
                    {
                        lesson_name: 'Energy 2.1',
                        description: 'Lesson 1 of Chapter 1',
                        contents: {
                            create: [
                                {
                                    content_type: 'video_lecture',
                                    link: 'https://onnorokomvideos.s3.amazonaws.com/uploads/rokomari.m3u8',
                                    description: 'This is a video file',
                                },
                                {
                                    content_type: 'quiz_exam',
                                    link: 'No Url',
                                    description: 'This is a Quiz exam',
                                },
                            ]
                        },
                        parallel_text: 'This is parallel text of lesson 1',
                        questions: {
                            create: [
                                {
                                    question_type: 'creative',
                                    description: 'Physics first chapter1 lesson 1 question 1 desc',
                                    text: 'Question 1 text',
                                    answer: 'Question 1 answer',
                                },
                                {
                                    question_type: 'objective',
                                    description: 'Physics first chapter1 lesson 1 question 2 desc',
                                    text: 'Question 2 text',
                                    answer: 'Question 2 answer',
                                },
                                {
                                    question_type: 'creative',
                                    description: 'Physics first chapter1 lesson 1 question 1 desc',
                                    text: 'Question 1 text',
                                    answer: 'Question 1 answer',
                                }
                            ]
                        },
                        formulas: {
                            create: [
                                {
                                    description: 'formula description',
                                    text: 'formula text',
                                },
                            ]
                        }
                    }
                ]
            }
        }
    })
    console.log({physics});
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit()
    })