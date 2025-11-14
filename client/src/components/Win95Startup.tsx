import { useState, useEffect } from "react";

interface Win95StartupProps {
  onComplete: () => void;
}

export default function Win95Startup({ onComplete }: Win95StartupProps) {
  const [progress, setProgress] = useState(0);
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    // Auto-complete after 2 seconds
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setShowStartup(false);
        onComplete();
      }, 300);
    }, 2000);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  if (!showStartup) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        backgroundColor: "#000080",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
      }}
    >
      {/* Windows 95 Logo */}
      <div
        style={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          Windows 95
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#c0c0c0",
            letterSpacing: "2px",
          }}
        >
          QR Code Generator
        </div>
      </div>

      {/* Loading Bar Container */}
      <div
        style={{
          width: "300px",
          height: "20px",
          border: "2px solid",
          borderTopColor: "#dfdfdf",
          borderLeftColor: "#dfdfdf",
          borderRightColor: "#808080",
          borderBottomColor: "#808080",
          backgroundColor: "#c0c0c0",
          padding: "2px",
          marginBottom: "20px",
        }}
      >
        {/* Loading Bar Fill */}
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#000080",
            transition: "width 0.1s ease-out",
          }}
        />
      </div>

      {/* Loading Text */}
      <div
        style={{
          color: "#ffffff",
          fontSize: "13.75px",
          marginTop: "20px",
        }}
      >
        กำลังโหลด Thai QR Code Generator...
      </div>

      {/* Version Text */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          color: "#c0c0c0",
          fontSize: "11px",
        }}
      >
        Version 1.0
      </div>
    </div>
  );
}
