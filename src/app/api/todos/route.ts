import { NextResponse } from "next/server";

import db_client from "@/db/dbClient";


export async function GET(req: Request) {
    const dbClient = await db_client;
    const db = await dbClient.db("nextjs-todo");
    const collection = await db.collection("todos");
   await collection.insertOne({
        title: "This is a text title 1",})
    return NextResponse.json({
        "Message": "Hello from the GET API route!"
    })
}