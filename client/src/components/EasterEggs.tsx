import { useState, useEffect } from 'react';

interface EasterEgg {
  trigger: string;
  message: string;
  animation: 'bounce' | 'spin' | 'flash' | 'rainbow';
}

const easterEggs: EasterEgg[] = [
  {
    trigger: 'konami',
    message: '🎮 You found the Konami Code! Windows 95 lives forever!',
    animation: 'rainbow'
  },
  {
    trigger: 'qr',
    message: '🤖 QR codes are watching you... or are you watching them?',
    animation: 'spin'
  },
  {
    trigger: 'thai',
    message: '🇹🇭 สวัสดีครับ! Welcome to the Thai QR Generator!',
    animation: 'bounce'
  },
  {
    trigger: 'windows',
    message: '🪟 Windows 95: The best operating system ever made!',
    animation: 'flash'
  }
];

export const EasterEggNotification = ({ trigger, onClose }: { trigger: string; onClose: () => void }) => {
  const egg = easterEggs.find(e => e.trigger === trigger);

  if (!egg) return null;

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const animationStyle = {
    bounce: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      animation: bounce 0.6s ease-in-out;
    `,
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      animation: spin 0.6s linear;
    `,
    flash: `
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      animation: flash 0.6s ease-in-out;
    `,
    rainbow: `
      @keyframes rainbow {
        0% { color: red; }
        20% { color: orange; }
        40% { color: yellow; }
        60% { color: green; }
        80% { color: blue; }
        100% { color: purple; }
      }
      animation: rainbow 1s linear;
    `
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#000080',
        color: '#dfdfdf',
        padding: '20px 30px',
        border: '3px solid',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        fontSize: '14px',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        fontWeight: 'bold',
        zIndex: 9999,
        textAlign: 'center',
        maxWidth: '400px'
      }}
    >
      <style>{animationStyle[egg.animation]}</style>
      <div>{egg.message}</div>
    </div>
  );
};

export const useEasterEggs = () => {
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const [keySequence, setKeySequence] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
      const newSequence = keySequence + e.key;
      setKeySequence(newSequence.slice(-10));

      // Check for easter eggs
      if (newSequence.includes('qr')) {
        setActiveEgg('qr');
      }
      if (newSequence.includes('thai')) {
        setActiveEgg('thai');
      }
      if (newSequence.includes('windows')) {
        setActiveEgg('windows');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  return { activeEgg, setActiveEgg };
};
