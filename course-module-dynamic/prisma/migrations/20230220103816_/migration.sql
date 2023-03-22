-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" TEXT NOT NULL,
    "sub_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "chapter_id" TEXT NOT NULL,
    "chapter_name" TEXT NOT NULL,
    "description" TEXT,
    "chapterSubjectId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("chapter_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" TEXT NOT NULL,
    "question_type" TEXT NOT NULL,
    "description" TEXT,
    "text" TEXT,
    "answer" TEXT,
    "lessonLesson_id" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Content" (
    "content_id" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "lessonLesson_id" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "formula_id" TEXT NOT NULL,
    "description" TEXT,
    "text" TEXT,
    "lessonLesson_id" TEXT,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("formula_id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lesson_id" TEXT NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parallel_text" TEXT NOT NULL,
    "chapterChapter_id" TEXT,
    "subjectSubject_id" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_sub_name_key" ON "Subject"("sub_name");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_chapterSubjectId_fkey" FOREIGN KEY ("chapterSubjectId") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_lessonLesson_id_fkey" FOREIGN KEY ("lessonLesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_lessonLesson_id_fkey" FOREIGN KEY ("lessonLesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_lessonLesson_id_fkey" FOREIGN KEY ("lessonLesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapterChapter_id_fkey" FOREIGN KEY ("chapterChapter_id") REFERENCES "Chapter"("chapter_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectSubject_id_fkey" FOREIGN KEY ("subjectSubject_id") REFERENCES "Subject"("subject_id") ON DELETE SET NULL ON UPDATE CASCADE;
