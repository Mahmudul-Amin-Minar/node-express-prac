const express = require('express');

const router = express.Router();
const data = require('../data/course_Module.json');

// get subject list
router.get('/subject', async (req, res) => {
    let subject_list = [];
    let subject = data['subject'];

    for(let i=0; i< subject.length; i++){
        let subject_details = {};
        let subject_name = subject[i].subject_name;
        let subject_id = subject[i].subject_id;

        subject_details.subject_name = subject_name;
        subject_details.subject_id = subject_id;
        subject_list.push(subject_details);
    }
    res.json({
        data: subject_list
    })
})

// get specific subject details
router.get('/subject/:sub_id', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let subject_details = {};
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let subject_description = subject[sub_id].subject_description;

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.subject_description = subject_description;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})

// get chapter list for a specific subject
router.get('/subject/:sub_id/chapter', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let subject_details = {};
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let chapters = subject[sub_id].chapter;
    let chapter_list = [];
    console.log(chapters)

    for(let i=0; i< chapters.length; i++){
        let chapter_details = {};
        let chapter_name = chapters[i].chapter_name;
        let chapter_id = chapters[i].chapter_id;
        let chapter_image = chapters[i].chapter_image;

        chapter_details.chapter_name = chapter_name;
        chapter_details.chapter_id = chapter_id;
        chapter_details.chapter_image = chapter_image;
        chapter_list.push(chapter_details);
    }

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.subject_chapter = chapter_list;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})

// get lesson list of a subject of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/lesson', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let subject_details = {};
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let lessons = subject[sub_id].chapter[chap_id].lesson;
    let lesson_list = [];
    console.log(lessons);

    for(let i=0; i< lessons.length; i++){
        let chapter_details = {};
        let lesson_name = lessons[i].lesson_name;
        let lesson_id = lessons[i].lesson_id;
        let lesson_image = lessons[i].lesson_image;
        let lesson_total_content = lessons[i].content.length;

        chapter_details.lesson_name = lesson_name;
        chapter_details.lesson_id = lesson_id;
        chapter_details.lesson_image = lesson_image;
        chapter_details.lesson_total_content = lesson_total_content;

        lesson_list.push(chapter_details);
    }

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_list = lesson_list;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})


// get a lesson details of a subject of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/lesson/:less_id/content', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let less_id = req.params.less_id - 1;
    let subject_details = {};
    let subject_id = subject[sub_id].subject_id;
    let subject_name = subject[sub_id].subject_name;
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let lesson_name = subject[sub_id].chapter[chap_id].lesson[less_id].lesson_name;
    let lesson_content = subject[sub_id].chapter[chap_id].lesson[less_id].content;

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_name = lesson_name;
    subject_details.lesson_content = lesson_content;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})

// get lesson parallel text of a subject of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/lesson/:less_id/parallel', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let less_id = req.params.less_id - 1;
    let subject_details = {};
    let subject_id = subject[sub_id].subject_id;
    let subject_name = subject[sub_id].subject_name;
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let lesson_name = subject[sub_id].chapter[chap_id].lesson[less_id].lesson_name;
    let lesson_parallel_text = subject[sub_id].chapter[chap_id].lesson[less_id].parallel_text;

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_name = lesson_name;
    subject_details.lesson_parallel_text = lesson_parallel_text;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})

// get lesson's class notes of a subject of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/lesson/:less_id/class_note', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let less_id = req.params.less_id - 1;
    let query = req.query.type;
    
    let subject_details = {};
    let subject_id = subject[sub_id].subject_id;
    let subject_name = subject[sub_id].subject_name;
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let lesson_name = subject[sub_id].chapter[chap_id].lesson[less_id].lesson_name;
    let notes = subject[sub_id].chapter[chap_id].lesson[less_id].class_note;
    let lesson_class_note = [];
    if(query){
        for(let i=0; i<notes.length; i++){
            if(notes[i].type == query){
                lesson_class_note.push(notes[i]);
            }
        }
    }else{
        lesson_class_note = notes;
    }

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_name = lesson_name;
    subject_details.lesson_class_note = lesson_class_note;

    res.json({
        data: subject_details
    })
})

// get a single class note of a subject of a specific chapter of a specific lesson
router.get('/subject/:sub_id/chapter/:chap_id/lesson/:less_id/class_note/:note_id', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let less_id = req.params.less_id - 1;
    let note_id = req.params.note_id - 1;
    
    let subject_details = {};
    let subject_id = subject[sub_id].subject_id;
    let subject_name = subject[sub_id].subject_name;
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let lesson_name = subject[sub_id].chapter[chap_id].lesson[less_id].lesson_name;
    let note = subject[sub_id].chapter[chap_id].lesson[less_id].class_note[note_id];

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_name = lesson_name;
    subject_details.class_note = note;

    res.json({
        data: subject_details
    })
})

// get question bank of a subject of a specific chapter of a lesson
router.get('/subject/:sub_id/chapter/:chap_id/lesson/:less_id/questions', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;
    let less_id = req.params.less_id - 1;
    let query = req.query.type;
    console.log(query);
    
    let subject_details = {};
    let subject_id = subject[sub_id].subject_id;
    let subject_name = subject[sub_id].subject_name;
    let chapter_name = subject[sub_id].chapter[chap_id].chapter_name;
    let lesson_name = subject[sub_id].chapter[chap_id].lesson[less_id].lesson_name;
    let lesson_question_bank = []

    if(query){
        console.log(query);
        lesson_question_bank = subject[sub_id].chapter[chap_id].lesson[less_id].question_bank[query];
    }else{
        lesson_question_bank = subject[sub_id].chapter[chap_id].lesson[less_id].question_bank;
    }

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.lesson_name = lesson_name;
    subject_details.lesson_question_bank = lesson_question_bank;

    res.json({
        data: subject_details
    })
})

// get chapter list with total question count of that chapter
router.get('/subject/:sub_id/questions', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;

    let subject_details = {};
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let chapters = subject[sub_id].chapter;
    let chapter_list = [];

    for(let i=0; i < chapters.length; i++){
        let total_lesson = chapters[i].lesson.length;
        let chapter_details = {};
        let creative_question_count = 0;
        let objective_question_count = 0;
        for(let j=0; j < total_lesson; j++){
            creative_question_count += (chapters[i].lesson[j].question_bank["creative"]).length;
            objective_question_count += (chapters[i].lesson[j].question_bank["objective"]).length;
        }
        let chapter_name = chapters[i].chapter_name;
        let chapter_id = chapters[i].chapter_id;
        let chapter_image = chapters[i].chapter_image;
        
        chapter_details.chapter_name = chapter_name;
        chapter_details.chapter_id = chapter_id;
        chapter_details.chapter_image = chapter_image;
        chapter_details.chapter_creative_question_count = creative_question_count;
        chapter_details.chapter_objective_question_count = objective_question_count;
        chapter_list.push(chapter_details);
    }
    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.subject_chapter = chapter_list;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})


// get creative questions list of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/questions/creative', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;

    let subject_details = {};
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let chapter = subject[sub_id].chapter[chap_id];
    let question_list = [];

    let total_lesson = chapter.lesson.length;
    let chapter_details = {};
    

    for(let j=0; j < total_lesson; j++){
        question_list.push(chapter.lesson[j].question_bank["creative"]);
    }

    let chapter_name = chapter.chapter_name;
    let chapter_id = chapter.chapter_id;
    let chapter_image = chapter.chapter_image;

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.chapter_id = chapter_id;
    subject_details.chapter_image = chapter_image;
    subject_details.question_list = question_list;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})


// get objective questions list of a specific chapter
router.get('/subject/:sub_id/chapter/:chap_id/questions/objective', async (req, res) => {
    let subject = data['subject'];
    let sub_id = req.params.sub_id - 1;
    let chap_id = req.params.chap_id - 1;

    let subject_details = {};
    let subject_name = subject[sub_id].subject_name;
    let subject_id = subject[sub_id].subject_id;
    let chapter = subject[sub_id].chapter[chap_id];
    let question_list = [];

    let total_lesson = chapter.lesson.length;    

    for(let j=0; j < total_lesson; j++){
        question_list.push(chapter.lesson[j].question_bank["objective"]);
    }

    let chapter_name = chapter.chapter_name;
    let chapter_id = chapter.chapter_id;
    let chapter_image = chapter.chapter_image;

    subject_details.subject_name = subject_name;
    subject_details.subject_id = subject_id;
    subject_details.chapter_name = chapter_name;
    subject_details.chapter_id = chapter_id;
    subject_details.chapter_image = chapter_image;
    subject_details.question_list = question_list;

    console.log(subject_details);
    res.json({
        data: subject_details
    })
})

module.exports = router;