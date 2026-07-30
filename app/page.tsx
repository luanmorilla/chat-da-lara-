import AppBackground from "@/components/common/AppBackground";
import ChatContainer from "@/components/chat/components/ChatContainer";
import { laraConversation } from "@/data/conversation/lara";

export default function Home() {
  return (
    <>
      <AppBackground />
      <ChatContainer
        conversation={laraConversation}
        botName="Lara"
        avatarSrc="/avatar/lara.jpg"
      />
    </>
  );
}