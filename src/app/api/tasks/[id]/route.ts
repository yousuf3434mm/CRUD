import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();
  const updated = await Task.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await dbConnect();
  const { id } = params;
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
