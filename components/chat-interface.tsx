"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
}

interface ChatInterfaceProps {
  conversationId: string | null;
  onConversationUpdate: () => void;
}

export function ChatInterface({
  conversationId,
  onConversationUpdate,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      const response = await fetch(`/api/conversations/${conversationId}`);
      if (response.ok) {
        const conversation = await response.json();
        setMessages(conversation.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const tempUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          role: "assistant",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [
          ...prev.slice(0, -1),
          tempUserMessage,
          assistantMessage,
        ]);
        onConversationUpdate();
      } else {
        setMessages((prev) => prev.slice(0, -1));
        console.error("Failed to send message");
      }
    } catch (error) {
      setMessages((prev) => prev.slice(0, -1));
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-auto bg-[#2C2824] text-[#EDE6DA]">
      <div className="flex-1 p-4">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center text-[#F5D0A9] mt-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
                <p>Ask me anything you don&apos;s understand below.</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 bg-[#F5D0A9]">
                    <Bot className="w-4 h-4 text-white" />
                  </Avatar>
                )}

                <Card
                  className={`max-w-[70%] p-3 break-words ${
                    message.role === "user"
                      ? "bg-[#FFD700] text-[#2C2824]"
                      : "bg-[#3A3A3A] border border-gray-700 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-[#2C2824]"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </Card>

                {message.role === "user" && (
                  <Avatar className="w-8 h-8 bg-[#FFD700]">
                    <User className="w-4 h-4 text-[#2C2824]" />
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-blue-500">
                  <Bot className="w-4 h-4 text-white" />
                </Avatar>
                <Card className="p-3 bg-[#3A3A3A] border border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-gray-700 p-4">
        <form onSubmit={sendMessage} className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-[#3A3A3A] text-[#EDE6DA] border border-gray-600"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#FFD700] text-[#2C2824]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
