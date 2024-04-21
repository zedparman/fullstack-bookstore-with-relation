import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Author'
            }
        ],
        ISBN:{
            type: String,
            required:true,
            unique:true
        },
        genre:{
            type: String,
            required:false,
        },
        publisher:{
            type: String,
            required:false,
        },
    }
)

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;