"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Menu, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

interface Conversation {
  id: string;
  title: string | null;
  createdAt: string;
  messages: Array<{ content: string }>;
}

interface ChatSidebarProps {
  currentConversationId: string | null;
  onConversationSelect: (id: string | null) => void;
  onNewChat: () => void;
}

export function ChatSidebar({
  currentConversationId,
  onConversationSelect,
  onNewChat,
}: ChatSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/conversations");
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setConversations((prev) => prev.filter((conv) => conv.id !== id));
        if (currentConversationId === id) {
          onConversationSelect(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <Sheet>
        <SheetTrigger>
          <Button variant="link" className="md:hidden text-[#FFD700]">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-64 text-[#EDE6DA] bg-[#2C2824] border-r border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <Button
              onClick={onNewChat}
              className="w-full bg-[#2C2824"
              variant="outline"
              style={{ borderColor: "#FFD700", color: "#FFD700" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 group ${
                    currentConversationId === conversation.id
                      ? "bg-[#FFD700] text-[#2C2824] border border-[#FFD700]"
                      : "bg-transparent"
                  }`}
                  onClick={() => onConversationSelect(conversation.id)}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">
                        {conversation.title || "New conversation"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(conversation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
