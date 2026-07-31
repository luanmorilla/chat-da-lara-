"use client";

import { useEffect, useRef, useState } from "react";

export function useExitIntent(
  enabled: boolean,
  onStay?: () => void
) {
  const [showExitModal, setShowExitModal] = useState(false);
  const alreadyTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Desktop: mouse saindo pelo topo
    function handleMouseLeave(e: MouseEvent) {
      if (alreadyTriggeredRef.current) return;

      if (e.clientY <= 0) {
        alreadyTriggeredRef.current = true;
        setShowExitModal(true);
      }
    }

    // Mobile: botão voltar
    window.history.pushState({ exitGuard: true }, "");

    function handlePopState() {
      if (alreadyTriggeredRef.current) return;

      alreadyTriggeredRef.current = true;
      setShowExitModal(true);

      // Mantém o usuário na página
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

    // Executa o retorno do chat após fechar o modal
    if (onStay) {
      setTimeout(() => {
        onStay();
      }, 300);
    }
  }

  function stayOnPage() {
    setShowExitModal(false);

    if (onStay) {
      setTimeout(() => {
        onStay();
      }, 300);
    }
  }

  return {
    showExitModal,
    closeExitModal,
    stayOnPage,
  };
}