"use client";

import { useEffect, useRef, useState } from "react";

/* =====================================================
   CHAT LARA - DETECÇÃO DE INTENÇÃO DE SAÍDA
   Desktop: mouse sai pela parte de cima da tela
   Mobile: botão "voltar" do navegador
===================================================== */

export function useExitIntent(enabled: boolean) {
  const [showExitModal, setShowExitModal] = useState(false);
  const alreadyTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // ---------- DESKTOP: mouse saindo pelo topo da tela ----------
    function handleMouseLeave(e: MouseEvent) {
      if (alreadyTriggeredRef.current) return;
      if (e.clientY <= 0) {
        alreadyTriggeredRef.current = true;
        setShowExitModal(true);
      }
    }

    // ---------- MOBILE: botão "voltar" ----------
    // Empilha um estado extra no histórico. Se o usuário voltar,
    // interceptamos antes de sair da página de verdade.
    window.history.pushState({ exitGuard: true }, "");

    function handlePopState() {
      if (alreadyTriggeredRef.current) return;
      alreadyTriggeredRef.current = true;
      setShowExitModal(true);
      // Empurra o estado de novo, pra manter a pessoa na página
      window.history.pushState({ exitGuard: true }, "");
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled]);

  function closeExitModal() {
    setShowExitModal(false);
  }

  return { showExitModal, closeExitModal };
}