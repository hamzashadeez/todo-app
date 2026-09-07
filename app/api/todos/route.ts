import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/Todo";
import connectDB from "@/db";

const userId = "demo-user";

export async function GET() {
  try {
    await connectDB();

    const todos = await Todo.find({ userId }).lean();

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { todos: "Error", error: error.todos },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { _id, title, description, completed, priority } = body;
  try {
    await connectDB();


    if (!_id || !title || !userId) {
      return NextResponse.json(
        { Todo: "Missing required fields" },
        { status: 400 },
      );
    }

    if (typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ Todo: "Invalid Title" }, { status: 400 });
    }

    if (
      priority !== undefined &&
      (typeof priority !== "number" || priority < 0 || priority > 5)
    ) {
      return NextResponse.json(
        { Todo: "Priority must be between 0 and 5" },
        { status: 400 },
      );
    }

    const newTodo = new Todo({
      _id,
      title,
      description,
      userId,
      completed,
      priority,
    });

    const savedTodo = await newTodo.save();

    return NextResponse.json({ todo: savedTodo }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      // get the data from the database and return it
      const existingTodo = await Todo.findOne({ _id: error.keyValue._id, userId });
      // check if the data is the same as the data being sent in the request
      console.log("error.keyValue", error.keyValue);
      if (
        existingTodo.title === title &&
        existingTodo.description === description &&
        existingTodo.completed === completed &&
        existingTodo.priority === priority
      ) {
        return NextResponse.json(
          { todo: existingTodo, description: "Todo already exists" },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          {
            todo: null,
            description: "Todo with same ID exists but with different values",
          },
          { status: 400 },
        );
      }
    }
    return NextResponse.json({ Todo: "Error", error: error }, { status: 500 });
  }
}
