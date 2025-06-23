// app/api/todos/route.ts
import clientPromise from "@/lib/mongodb";
import type { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client: MongoClient = await clientPromise;
  const db = client.db("nextjs-todo");
  const todos = await db.collection("todos").find({}).toArray();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title, name, age, gender } = await req.json();
  const client: MongoClient = await clientPromise;
  const db = client.db("nextjs-todo");
  const result = await db.collection("todos").insertOne({ title, name, age, gender });
  return NextResponse.json(result);
}

