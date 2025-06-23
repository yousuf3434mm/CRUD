import db_client from "@/db/dbClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const dbClient = await db_client;
  const db = await dbClient.db("nextjs-todo");
  const collection = await db.collection("todos");
  const { title, name, age, gender  } = await req.json();
  let todo = await collection.insertOne({
    "title": title,
    "name": name,
    "age": age,
    "gender": gender
  });
   let findTodo = await collection.findOne({
    "_id": todo.insertedId,
  });
  console.log("findTodo", findTodo);
  return NextResponse.json(findTodo);
}
