// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import clientPromiseImport from "@/lib/mongodb";
import { ObjectId, MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const clientPromise = clientPromiseImport as unknown as Promise<MongoClient>;

export async function DELETE(req: Request, { params }: any) {
  try {
    if (!params.id || !ObjectId.isValid(params.id)) {
      return NextResponse.json({ Message: "Invalid or missing ID" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("nextjs-todo");
    const collection = db.collection("todos");
    const findTodo = await collection.findOne({ _id: new ObjectId(params.id) });
    if (!findTodo) {
      return NextResponse.json({ Message: "Todo not found" }, { status: 404 });
    }
    await collection.deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ Message: "Todo deleted successfully", id: params.id });
  } catch (error) {
    return NextResponse.json({ Message: "Internal server error", error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    if (!params.id || !ObjectId.isValid(params.id)) {
      return NextResponse.json({ Message: "Invalid or missing ID" }, { status: 400 });
    }
    const { title, name, age, gender } = await req.json();
    const client = await clientPromise;
    const db = client.db("nextjs-todo");
    const collection = db.collection("todos");
    const findTodo = await collection.findOne({ _id: new ObjectId(params.id) });
    if (!findTodo) {
      return NextResponse.json({ Message: "Todo not found" }, { status: 404 });
    }
    await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, name, age, gender } }
    );
    return NextResponse.json({ Message: "Todo updated successfully", id: params.id });
  } catch (error) {
    return NextResponse.json({ Message: "Internal server error", error: (error as Error).message }, { status: 500 });
  }
}
