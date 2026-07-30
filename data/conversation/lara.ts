import { ChatStep } from "@/types/chat";

/* =====================================================
   CHAT LARA - ROTEIRO DA CONVERSA
   {{name}} é substituído pelo nome que a pessoa digitar
===================================================== */

const PRIVACY_LINK = "https://www.linkpriv.com/e1bf5f19-f45a-4e7b-8cd8-6f9582287e98";
const GIFT_LINK = "https://app.syncpayments.com.br/payment-link/a172b285-8dfa-4c17-baaa-64be4d3cda5b";

export const laraConversation: ChatStep[] = [
  // ---------- ABERTURA ----------
  {
    id: "welcome-1",
    type: "message",
    text: "Ooooi coração 😘",
    showTyping: true,
    typingDuration: 1200,
    delay: 400,
    next: "welcome-2",
  },
  {
    id: "welcome-2",
    type: "message",
    text: "Que bom que você me mandou mensagem ❤️",
    showTyping: true,
    typingDuration: 1400,
    delay: 600,
    next: "ask-name",
  },
  {
    id: "ask-name",
    type: "message",
    text: "Antes de tudo... me fala seu nome? 🥰",
    showTyping: true,
    typingDuration: 1200,
    delay: 600,
    next: "input-name",
  },

  // ---------- CAPTURA DE NOME ----------
  {
    id: "input-name",
    type: "input-name",
    placeholder: "Digite seu nome",
    buttonLabel: "Enviar",
    next: "greet-name",
  },

  // ---------- SAUDAÇÃO PERSONALIZADA ----------
  {
    id: "greet-name",
    type: "message",
    text: "Prazer, {{name}} 😍",
    showTyping: true,
    typingDuration: 1000,
    delay: 400,
    next: "greet-name-2",
  },
  {
    id: "greet-name-2",
    type: "message",
    text: "Adorei seu nome...",
    showTyping: true,
    typingDuration: 1200,
    delay: 500,
    next: "intro-1",
  },

  // ---------- APRESENTAÇÃO / HISTÓRIA DA LARA ----------
  {
    id: "intro-1",
    type: "message",
    text: "Deixa eu me apresentar melhor pra você 🥰",
    showTyping: true,
    typingDuration: 1200,
    delay: 500,
    next: "intro-2",
  },
  {
    id: "intro-2",
    type: "message",
    text: "Tenho 24 aninhos, sou bem novinha ainda kkkk 🙈",
    showTyping: true,
    typingDuration: 1500,
    delay: 600,
    next: "intro-3",
  },
  {
    id: "intro-3",
    type: "message",
    text: "Sabe, {{name}}... eu comecei tudo isso porque sempre sonhei em ser independente, em não depender de ninguém pra construir minha vida 💭",
    showTyping: true,
    typingDuration: 2200,
    delay: 700,
    next: "intro-4",
  },
  {
    id: "intro-4",
    type: "message",
    text: "Hoje eu vivo disso, e é a coisa que mais me faz feliz... poder ser eu mesma, sem medo, sem julgamento, e ainda realizar meus sonhos 🥹✨",
    showTyping: true,
    typingDuration: 2400,
    delay: 700,
    next: "intro-5",
  },
  {
    id: "intro-5",
    type: "message",
    text: "E o melhor de tudo é poder compartilhar isso com quem realmente me valoriza... como você, {{name}} 😏💕",
    showTyping: true,
    typingDuration: 2000,
    delay: 600,
    next: "ask-stories",
  },

  // ---------- PERGUNTA SOBRE STORIES ----------
  {
    id: "ask-stories",
    type: "buttons",
    text: "Você veio porque viu meus stories? 👀",
    showTyping: true,
    typingDuration: 1000,
    delay: 500,
    buttons: [
      {
        id: "btn-stories-yes",
        label: "Sim ❤️",
        next: "after-stories-yes",
      },
      {
        id: "btn-stories-no",
        label: "Não, achei por outro lugar",
        next: "after-stories-no",
      },
    ],
  },

  // ---------- RAMO: VEIO DO STORIES ----------
  {
    id: "after-stories-yes",
    type: "message",
    text: "Que bom, {{name}} ❤️",
    showTyping: true,
    typingDuration: 1000,
    delay: 400,
    next: "tease-1",
  },

  // ---------- RAMO: NÃO VEIO DO STORIES ----------
  {
    id: "after-stories-no",
    type: "message",
    text: "Que bom que me achou de qualquer jeito, {{name}} 😏",
    showTyping: true,
    typingDuration: 1200,
    delay: 400,
    next: "tease-1",
  },

  // ---------- ENGAJAMENTO / TEASE ----------
  {
    id: "tease-1",
    type: "message",
    text: "Nossa, {{name}}... você tem cara de ser bem safad{{o_a}} 😏",
    showTyping: true,
    typingDuration: 1600,
    delay: 500,
    next: "tease-2",
  },
  {
    id: "tease-2",
    type: "message",
    text: "Tenho algumas prévias bem quentes aqui... e um segredinho pra te contar 🤫🔥",
    showTyping: true,
    typingDuration: 1800,
    delay: 500,
    next: "send-audio-oferta",
  },

  // ---------- ÁUDIO ANTES DA OFERTA ----------
  {
    id: "send-audio-oferta",
    type: "audio",
    src: "/audios/messages/oferta-vip.mp3",
    duration: 15,
    showTyping: true,
    typingDuration: 1200,
    delay: 500,
    advanceOnPlaybackEnd: true,
    next: "offer-choice",
  },

  // ---------- ESCOLHA PRINCIPAL (3 caminhos) ----------
  {
    id: "offer-choice",
    type: "buttons",
    text: "O que você quer, {{name}}? 🔥",
    showTyping: true,
    typingDuration: 900,
    delay: 400,
    buttons: [
      {
        id: "btn-preview",
        label: "Ver prévia",
        emoji: "🔥",
        next: "send-preview-video",
      },
      {
        id: "btn-subscribe-now",
        label: "Assinar agora",
        emoji: "💎",
        next: "send-subscribe-link",
      },
      {
        id: "btn-gift",
        label: "Quero te mandar um presentinho",
        emoji: "🎁",
        next: "gift-intro",
      },
    ],
  },

  // ---------- RAMO: PRÉVIA ----------
  {
    id: "send-preview-video",
    type: "video",
    src: "/videos/previews/preview-1.mp4",
    thumbnail: "/images/preview/preview-1-thumb.jpg",
    showTyping: true,
    typingDuration: 1000,
    delay: 600,
    next: "after-preview",
  },
  {
    id: "after-preview",
    type: "message",
    text: "Gostou, {{name}}? 😏",
    showTyping: true,
    typingDuration: 1000,
    delay: 700,
    next: "after-preview-2",
  },
  {
    id: "after-preview-2",
    type: "message",
    text: "Isso é só 2% do que tem lá no meu Privacy...",
    showTyping: true,
    typingDuration: 1400,
    delay: 500,
    next: "final-offer",
  },

  // ---------- OFERTA FINAL (vem da prévia) ----------
  {
    id: "final-offer",
    type: "buttons",
    text: "Vem ver tudo, {{name}} ❤️",
    showTyping: true,
    typingDuration: 900,
    delay: 500,
    buttons: [
      {
        id: "btn-enter-privacy",
        label: "Entrar no Privacy",
        emoji: "💎",
        next: "send-subscribe-link",
      },
    ],
  },

  // ---------- RAMO: ASSINAR DIRETO ----------
  {
    id: "send-subscribe-link",
    type: "message",
    text: "Toma, {{name}}... é só clicar aqui embaixo 👇",
    showTyping: true,
    typingDuration: 1000,
    delay: 500,
    next: "end-cta",
  },
  {
    id: "end-cta",
    type: "buttons",
    showTyping: false,
    delay: 300,
    buttons: [
      {
        id: "btn-final-link",
        label: "Acessar meu Privacy",
        emoji: "💋",
        href: PRIVACY_LINK,
        next: "end-cta", // último step, fica travado aqui
        variant: "primary",
      },
    ],
  },

  // ---------- RAMO: PRESENTINHO ----------
  {
    id: "gift-intro",
    type: "message",
    text: "Ai {{name}}... que gesto lindo o seu 🥹💕",
    showTyping: true,
    typingDuration: 1200,
    delay: 500,
    next: "gift-intro-2",
  },
  {
    id: "gift-intro-2",
    type: "message",
    text: "Você escolhe o valor, do jeitinho que seu coração mandar... e eu te retribuo com carinho no chat 😈",
    showTyping: true,
    typingDuration: 1800,
    delay: 600,
    next: "gift-security",
  },
  {
    id: "gift-security",
    type: "message",
    text: "Fica tranquil{{o_a}}, é tudo 100% discreto e seguro, {{name}}. Ninguém fica sabendo de nada, pode confiar 🔒❤️",
    showTyping: true,
    typingDuration: 1800,
    delay: 600,
    next: "gift-generosity",
  },
  {
    id: "gift-generosity",
    type: "message",
    text: "Quanto mais generos{{o_a}} você for, mais safad{{o_a}} eu fico pra te mandar aqui 🙈🔥",
    showTyping: true,
    typingDuration: 1800,
    delay: 500,
    next: "gift-instructions",
  },
  {
    id: "gift-instructions",
    type: "message",
    text: "Depois de mandar, me manda o comprovante lá no Instagram ou no Face mesmo, no privado, do jeitinho que você já me achou 😏 Assim que eu ver, já te retribuo com vídeo e fotos bem gostosas 📸",
    showTyping: true,
    typingDuration: 2400,
    delay: 600,
    next: "gift-buttons",
  },
  {
    id: "gift-buttons",
    type: "buttons",
    showTyping: false,
    delay: 300,
    buttons: [
      {
        id: "btn-gift-pay",
        label: "Mandar presentinho",
        emoji: "🎁",
        href: GIFT_LINK,
        next: "gift-buttons", // fica travado aqui, igual ao end-cta
        variant: "primary",
      },
    ],
  },
];