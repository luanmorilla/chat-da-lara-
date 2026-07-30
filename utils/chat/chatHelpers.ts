import { ChatStep, ChatMessage } from "@/types/chat";

/* =====================================================
   CHAT LARA - HELPERS DO MOTOR DE CONVERSA
===================================================== */

/**
 * Substitui variáveis do tipo {{nome}} dentro de um texto.
 * Ex: replaceVariables("Oi {{name}}", { name: "João" }) -> "Oi João"
 */
export function replaceVariables(
  text: string,
  variables: Record<string, string>
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] ?? "";
  });
}

/**
 * Gera um id único simples para mensagens do histórico.
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Converte um ChatStep (a "receita" definida em data/conversation)
 * em um ChatMessage (a mensagem pronta pra entrar no histórico
 * e ser renderizada na tela).
 */
export function buildMessageFromStep(
  step: ChatStep,
  variables: Record<string, string>
): ChatMessage {
  const base = {
    id: generateMessageId(),
    stepId: step.id,
    type: step.type,
    from: "bot" as const,
    timestamp: Date.now(),
  };

  switch (step.type) {
    case "message":
      return {
        ...base,
        content: replaceVariables(step.text, variables),
      };

    case "system":
      return {
        ...base,
        content: replaceVariables(step.text, variables),
      };

    case "buttons":
      return {
        ...base,
        content: step.text ? replaceVariables(step.text, variables) : "",
        buttons: step.buttons,
      };

    case "image":
      return {
        ...base,
        content: step.caption ? replaceVariables(step.caption, variables) : "",
        media: {
          src: step.src,
          blurred: step.blurred,
        },
      };

    case "video":
      return {
        ...base,
        content: step.caption ? replaceVariables(step.caption, variables) : "",
        media: {
          src: step.src,
          thumbnail: step.thumbnail,
          blurred: step.blurred,
        },
      };

    case "audio":
      return {
        ...base,
        content: "",
        media: {
          src: step.src,
          duration: step.duration,
        },
      };

    default:
      return {
        ...base,
        content: "",
      };
  }
}