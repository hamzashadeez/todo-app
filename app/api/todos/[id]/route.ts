import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import Todo from "@/models/Todo";

const userId = "demo-user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "todo ID is required" },
        { status: 400 },
      );
    }
    if (userId !== "demo-user") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const doc = await Todo.findOne({ _id: id, userId }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "todo ID is required" },
        { status: 400 },
      );
    }

    if (userId !== "demo-user") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await connectDB();

    if (userId !== "demo-user") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const update: any = {};
    if (
      body.title &&
      typeof body.title === "string" &&
      body.title.trim().length > 0
    )
      update.title = body.title;
    if (body.description && typeof body.description === "string")
      update.description = body.description;
    if (body.completed !== undefined) update.completed = body.completed;
    if (
      body.priority !== undefined &&
      typeof body.priority === "number" &&
      body.priority >= 0 &&
      body.priority <= 5
    )
      update.priority = Number(body.priority);

    const doc = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      { $set: update },
      { new: true },
    ).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "todo ID is required" },
        { status: 400 },
      );
    }
    await connectDB();
    await Todo.findOneAndDelete({_id: id, userId});
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
