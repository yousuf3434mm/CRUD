import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// Create Task - POST Method
export async function POST(req: Request) {
  try {
    await dbConnect(); // MongoDB কানেকশন
    const body = await req.json(); // রিকুয়েস্ট থেকে ডাটা রিড
    const task = await Task.create(body); // MongoDB-তে নতুন Task যুক্ত
    return NextResponse.json(task, { status: 201 }); // Success Response
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

// Get All Tasks - GET Method
export async function GET() {
  try {
    await dbConnect(); // MongoDB কানেকশন
    const tasks = await Task.find(); // সকল Task রিড
    return NextResponse.json(tasks, { status: 200 }); // Success Response
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// Update Task - PUT Method
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }
    
    const updated = await Task.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// Delete Task - DELETE Method
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }
    
    const deleted = await Task.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
