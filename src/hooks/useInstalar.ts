import { useEffect, useState } from 'react';

interface EventoInstalar extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useInstalar() {
  const [evento, setEvento] = useState<EventoInstalar | null>(null);

  useEffect(() => {
    function guardar(e: Event) {
      e.preventDefault();
      setEvento(e as EventoInstalar);
    }

    const limpiar = () => setEvento(null);
    window.addEventListener('beforeinstallprompt', guardar);
    window.addEventListener('appinstalled', limpiar);
    return () => {
      window.removeEventListener('beforeinstallprompt', guardar);
      window.removeEventListener('appinstalled', limpiar);
    };
  }, []);

  async function instalar() {
    if (!evento) return;
    setEvento(null);
    await evento.prompt();
  }

  return { puedeInstalar: evento !== null, instalar };
}
