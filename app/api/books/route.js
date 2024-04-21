import connectMongoDB from '../../../libs/mongodb';
import Book from '../../../models/book';
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        await connectMongoDB();
        const books = await Book.find().populate('author');
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectMongoDB();
        const { title, author, ISBN, genre, publisher } = await request.json();
        const book = await Book.create({title, author, ISBN, genre, publisher});
        return NextResponse.json({ message: 'Book Created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}