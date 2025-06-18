import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("topics").insertOne({
      title: body.title,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Topic added",
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add topic" }, { status: 500 });
  }
}
