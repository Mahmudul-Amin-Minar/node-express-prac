const { name } = require('./model');

const VIDEO_VISIBILITIES = ["Public", "Private", "Unlisted"];
/*
    Video properties: 
    title, description, videoLink, fileName, visibility, 
    thumbnailUrl, playlistId, language, recordingDate, 
    category, viewsCount, likesCount, dislikesCount, 
*/

const updateSchema = async (db) => {
    const validator = {
        $joinSchema: {
            bsonType: "object",
            required: [
                "title",
                "fileName",
                "originalName",
                "visibility",
                "recordingDate",
                "videoLink",
            ],
            properties: {
                title: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                description: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                viewsCount: {
                    bsonType: "int",
                    minimum: 0,
                    description: "must be an integer",
                },
                visibility: {
                    enum: VIDEO_VISIBILITIES,
                    description: "can only ne one of the enum values and is required",
                },
                playlistId: {
                    bsonType: "objectId",
                    description: "must be an objectId and is required",
                },
                language: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                recordingDate: {
                    bsonType: "date",
                    description: "must be a date and is required"
                },
                category: {
                    bsonType: "string",
                    description: "must be a string and is required"
                }
            }
        }
    }
}
