/* =====================================================
   CHAT LARA - TYPES
===================================================== */

/**
 * Tipos de "passo" que podem existir dentro do fluxo da conversa.
 * Cada item do array de conversação é um desses tipos.
 */
export type ChatStepType =
  | "message"
  | "input-name"
  | "buttons"
  | "image"
  | "video"
  | "audio"
  | "typing"
  | "system";

/**
 * Um botão de resposta rápida.
 * `next` indica para qual step o fluxo deve pular
 * quando esse botão for clicado.
 */
export interface ChatButton {
    id: string;
    label: string;
    emoji?: string;
    next: string; // id do próximo step
    variant?: "primary" | "secondary" | "ghost";
  
    /**
     * Se preenchido, o clique abre esse link em nova aba
     * (ex: link do Privacy ou do pagamento) além de navegar
     * para o `next` normalmente.
     */
    href?: string;
  }

/**
 * Estrutura base de qualquer step da conversa.
 * Steps específicos (mensagem, vídeo, botão...) estendem essa base.
 */
interface ChatStepBase {
  id: string;
  type: ChatStepType;

  /** tempo de espera (ms) antes de exibir esse step */
  delay?: number;

  /** se true, mostra "digitando..." antes do step aparecer */
  showTyping?: boolean;

  /** duração do "digitando..." em ms */
  typingDuration?: number;

  /** id do próximo step (quando não depende de botão/input) */
  next?: string;
}

/** Mensagem de texto simples. Aceita {{name}} como variável. */
export interface ChatStepMessage extends ChatStepBase {
  type: "message";
  text: string;
}

/** Campo de input — usado basicamente só para capturar o nome. */
export interface ChatStepInputName extends ChatStepBase {
  type: "input-name";
  placeholder?: string;
  buttonLabel?: string;
}

/** Grupo de botões de escolha. */
export interface ChatStepButtons extends ChatStepBase {
  type: "buttons";
  text?: string; // texto opcional acima dos botões
  buttons: ChatButton[];
}

/** Imagem enviada na conversa. */
export interface ChatStepImage extends ChatStepBase {
  type: "image";
  src: string;
  caption?: string;
  blurred?: boolean; // prévia borrada, por ex.
}

/** Vídeo enviado na conversa. */
export interface ChatStepVideo extends ChatStepBase {
  type: "video";
  src: string;
  thumbnail?: string;
  caption?: string;
  blurred?: boolean;
}

/** Áudio enviado na conversa (estilo "áudio de WhatsApp"). */
export interface ChatStepAudio extends ChatStepBase {
  type: "audio";
  src: string;
  duration: number; // em segundos

  /**
   * Se true (padrão), o próximo step só aparece depois que
   * o usuário der play e o áudio terminar de tocar.
   * Se false, avança normalmente pelo `delay`.
   */
  advanceOnPlaybackEnd?: boolean;
}

/** Mensagem de sistema (ex: "Mensagem apagada"). */
export interface ChatStepSystem extends ChatStepBase {
  type: "system";
  text: string;
}

/**
 * União de todos os tipos de step possíveis.
 * Isso é o que vamos usar no arquivo de conversa (data/conversation).
 */
export type ChatStep =
  | ChatStepMessage
  | ChatStepInputName
  | ChatStepButtons
  | ChatStepImage
  | ChatStepVideo
  | ChatStepAudio
  | ChatStepSystem;

/**
 * Uma mensagem já renderizada na tela (histórico do chat).
 * Diferente do ChatStep (que é a "receita"), isso é o "prato pronto".
 */
export interface ChatMessage {
  id: string;
  stepId: string;
  type: ChatStepType;
  content: string;
  from: "bot" | "user";
  timestamp: number;
  media?: {
    src: string;
    thumbnail?: string;
    duration?: number;
    blurred?: boolean;
  };
  buttons?: ChatButton[];
  deleted?: boolean;
}

/**
 * Estado global do motor de chat.
 */
export interface ChatState {
  userName: string | null;
  currentStepId: string;
  messages: ChatMessage[];
  isTyping: boolean;
  isFinished: boolean;
}

/**
 * Ação do usuário que o motor de chat precisa processar.
 */
export type ChatAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "CLICK_BUTTON"; payload: ChatButton }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "GOTO_STEP"; payload: string }
  | { type: "FINISH" }
  | { type: "RESTORE_STATE"; payload: ChatState };