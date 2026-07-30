import { useMemo } from "react";
import { ChatStep } from "@/types/chat";

/* =====================================================
   CHAT LARA - CÁLCULO DE PROGRESSO DA CONVERSA
===================================================== */

export function useChatProgress(
  conversation: ChatStep[],
  currentStepId: string,
  isFinished: boolean
) {
  const progress = useMemo(() => {
    if (isFinished) return 100;

    const index = conversation.findIndex((s) => s.id === currentStepId);
    if (index === -1) return 0;

    const total = conversation.length - 1;
    if (total <= 0) return 0;

    const percent = (index / total) * 100;

    // Nunca mostra 0% "morto" nem passa de 96% antes do fim de verdade,
    // pra barra sempre parecer viva e não "travada" antes da conclusão.
    return Math.min(96, Math.max(4, percent));
  }, [conversation, currentStepId, isFinished]);

  return progress;
}