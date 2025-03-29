import { NextResponse } from "next/server";
import { sampleAssignment } from "../../../mocks/sample-assignment";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  // In a real app, you would fetch from your database
  // This is just a mock implementation
  const id = params.id;

  if (id === sampleAssignment.id) {
    return NextResponse.json(sampleAssignment);
  }

  return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
}

// app/quizgame/api/submission/route.ts

export async function POST(request: Request) {
  const body = await request.json();

  // In a real app, you would save this to your database
  console.log("Submission received:", body);

  // Mock successful submission
  return NextResponse.json({
    success: true,
    message: "Assignment submission recorded successfully",
    submissionId: "sub-" + Math.random().toString(36).substring(2, 9),
  });
}
