import { useState } from 'react';

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  onClick: () => void;
}

export const DraggableDesktopIcon = ({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  onClick: () => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 100
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          cursor: 'pointer',
          textAlign: 'center',
          maxWidth: '80px'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderTopColor: '#dfdfdf',
            borderLeftColor: '#dfdfdf',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: '11px',
            fontFamily: '"MS Sans Serif", Arial, sans-serif',
            color: '#000000',
            backgroundColor: '#c0c0c0',
            padding: '2px 4px',
            borderRadius: '2px',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const DesktopIconsContainer = ({ 
  icons 
}: { 
  icons: DesktopIcon[];
}) => {
  return (
    <>
      {icons.map(icon => (
        <DraggableDesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onClick={icon.onClick}
        />
      ))}
    </>
  );
};

// Retro Desktop Background
export const RetroDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#008080',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            #008080,
            #008080 10px,
            #009999 10px,
            #009999 20px
          )
        `,
        zIndex: -1
      }}
    >
      {children}
    </div>
  );
};
