"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewChat = () => {
    setCurrentConversationId(null);
  };

  const handleConversationUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen text-[#EDE6DA] bg-[#2C2824]">
      <ChatSidebar
        key={refreshKey}
        currentConversationId={currentConversationId}
        onConversationSelect={setCurrentConversationId}
        onNewChat={handleNewChat}
      />
      <div className="flex-1">
        <ChatInterface
          conversationId={currentConversationId}
          onConversationUpdate={handleConversationUpdate}
        />
      </div>
    </div>
  );
}
