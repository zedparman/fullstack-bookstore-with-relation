import mongoose, { Schema } from 'mongoose';

const authorSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        nationality: {
            type: String,
            required: false
        },
        books:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    }
)

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

export default Author;