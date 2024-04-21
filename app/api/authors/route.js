import connectMongoDB from '../../../libs/mongodb';
import Author from '../../../models/author';
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        await connectMongoDB();
        const authors = await Author.find().populate('books');
        return NextResponse.json(authors);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectMongoDB();
        const { name, nationality } = await request.json();
        const author = await Author.create({ name, nationality });
        return NextResponse.json({ message: 'Author Created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}