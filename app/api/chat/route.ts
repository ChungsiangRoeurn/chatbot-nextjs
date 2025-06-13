import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { messages: true },
      });
    } else {
      conversation = await prisma.conversation.create({
        data: {
          title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        },
        include: { messages: true },
      });
    }

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Save user message
    await prisma.message.create({
      data: {
        content: message,
        role: "user",
        conversationId: conversation.id,
      },
    });

    // Prepare messages for Gemini
    const messages = [
      ...conversation.messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Get response from Gemini
    let assistantMessage: string;

    try {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert conversation history to a single prompt for Gemini
      const conversationHistory = messages
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n\n");

      const result = await model.generateContent(conversationHistory);
      const response = await result.response;
      assistantMessage =
        response.text() || "Sorry, I could not generate a response.";
    } catch (geminiError: any) {
      console.error("Gemini API error:", geminiError);

      // Handle specific Gemini errors
      if (geminiError.message?.includes("quota")) {
        assistantMessage =
          "Sorry, the AI service is temporarily unavailable due to quota limits. Please try again later.";
      } else if (
        geminiError.message?.includes("429") ||
        geminiError.status === 429
      ) {
        assistantMessage =
          "Sorry, too many requests. Please wait a moment and try again.";
      } else if (
        geminiError.message?.includes("401") ||
        geminiError.status === 401
      ) {
        assistantMessage =
          "Sorry, there's an authentication issue with the AI service. Please check your API key.";
      } else if (geminiError.message?.includes("API key")) {
        assistantMessage =
          "Sorry, the API key is not configured properly. Please check your environment variables.";
      } else {
        assistantMessage =
          "Sorry, I encountered an error while processing your request. Please try again.";
      }
    }

    await prisma.message.create({
      data: {
        content: assistantMessage,
        role: "assistant",
        conversationId: conversation.id,
      },
    });

    return NextResponse.json({
      message: assistantMessage,
      conversationId: conversation.id,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
