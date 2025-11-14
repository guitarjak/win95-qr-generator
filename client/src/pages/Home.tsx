import { useState, useRef, useCallback } from "react";
import { Download, Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/hooks/useLanguage";
import { APP_TITLE } from "@/const";
import Win95Startup from "@/components/Win95Startup";
import { playSuccessChime, playButtonClick } from "@/utils/soundEffects";
import { TaskbarNotification, useRetroAnimation } from "@/components/RetroAnimations";

// Windows 95 Button Component
const Win95Button = ({ onClick, children, active = false, style: customStyle = {}, ...props }: any) => (
  <button
    onClick={onClick}
    style={{
      padding: '3px 12px',
      fontSize: '13.75px',
      fontWeight: 'bold',
      border: '2px outset',
      borderTopColor: active ? '#808080' : '#dfdfdf',
      borderLeftColor: active ? '#808080' : '#dfdfdf',
      borderRightColor: active ? '#dfdfdf' : '#808080',
      borderBottomColor: active ? '#dfdfdf' : '#808080',
      backgroundColor: '#c0c0c0',
      color: '#000000',
      cursor: 'pointer',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      ...customStyle
    }}
    {...props}
  >
    {children}
  </button>
);

// Windows 95 Panel Component
const Win95Panel = ({ children, title, style: customStyle = {} }: any) => (
  <div style={{
    backgroundColor: '#c0c0c0',
    border: '2px solid',
    borderTopColor: '#dfdfdf',
    borderLeftColor: '#dfdfdf',
    borderRightColor: '#808080',
    borderBottomColor: '#808080',
    ...customStyle
  }}>
    {title && (
      <div style={{
        backgroundColor: '#000080',
        color: '#dfdfdf',
        padding: '2px 2px',
        fontWeight: 'bold',
        fontSize: '13.75px',
        fontFamily: '"MS Sans Serif", Arial, sans-serif'
      }}>
        {title}
      </div>
    )}
    <div style={{ padding: '4px', backgroundColor: '#c0c0c0' }}>
      {children}
    </div>
  </div>
);

// Windows 95 Input Component
const Win95Input = ({ value, onChange, placeholder, type = "text", style: customStyle = {}, ...props }: any) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      padding: '3px 4px',
      fontSize: '13.75px',
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      border: '2px inset',
      borderTopColor: '#808080',
      borderLeftColor: '#808080',
      borderRightColor: '#dfdfdf',
      borderBottomColor: '#dfdfdf',
      backgroundColor: '#ffffff',
      color: '#000000',
      ...customStyle
    }}
    {...props}
  />
);

export default function Home() {
  const { t } = useLanguage();
  const [showStartup, setShowStartup] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { showNotification, notificationMessage, showNotify, setShowNotification } = useRetroAnimation();
  const [qrValue, setQrValue] = useState("");
  const [qrType, setQrType] = useState("url");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // URL state
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  // Customization state
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(40);
  const [showLogo, setShowLogo] = useState(true);
  const [transparentBg, setTransparentBg] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "svg" | "jpeg">("png");
  const [exportSize, setExportSize] = useState(200);

  const handleGenerateQR = (value: string) => {
    setQrValue(value);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = useCallback(() => {
    setLogoImage(null);
  }, []);

  const downloadQR = (format: "png" | "svg" | "jpeg") => {
    showNotify(`Downloading QR Code as ${format.toUpperCase()}...`);
    playSuccessChime();
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    if (format === "png" || format === "jpeg") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        canvas.width = exportSize;
        canvas.height = exportSize;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (logoImage && showLogo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;
            ctx.fillStyle = bgColor;
            ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            const link = document.createElement("a");
            link.href = canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.95);
            link.download = `qrcode-${Date.now()}.${format === "jpeg" ? "jpg" : "png"}`;
            link.click();
          };
          logoImg.src = logoImage;
        } else {
          const link = document.createElement("a");
          link.href = canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.95);
          link.download = `qrcode-${Date.now()}.${format === "jpeg" ? "jpg" : "png"}`;
          link.click();
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } else if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `qrcode-${Date.now()}.svg`;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    showNotify("QR Code copied to clipboard! ✓");
    playButtonClick();
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!));
        });
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {showStartup && <Win95Startup onComplete={() => setShowStartup(false)} />}
      <div style={{ backgroundColor: '#c0c0c0', minHeight: '100vh', padding: '8px', fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: '13.75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1400px' }}>
      {/* Windows 95 Taskbar-like Header */}
      <Win95Panel title={APP_TITLE} style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QrCode style={{ width: '20px', height: '20px', color: '#000080' }} />
            <span style={{ fontWeight: 'bold' }}>Thai QR Code Generator</span>
          </div>

        </div>
      </Win95Panel>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8px' }}>
        {/* QR Generator Panel */}
        <Win95Panel title={t('generator')}>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('customize')}:</label>
            <select
              value={qrType}
              onChange={(e) => setQrType(e.target.value)}
              style={{
                width: '100%',
                padding: '2px',
                fontSize: '13.75px',
                border: '2px inset',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf',
                backgroundColor: '#ffffff',
                fontFamily: '"MS Sans Serif", Arial, sans-serif'
              }}
            >
              <option value="url">{t('url')}</option>
              <option value="text">{t('text')}</option>
              <option value="wifi">{t('wifi')}</option>
              <option value="email">{t('email')}</option>
              <option value="phone">{t('phone')}</option>
              <option value="sms">{t('sms')}</option>
            </select>
          </div>

          {qrType === "url" && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('enterUrl')}:</label>
              <Win95Input
                value={urlInput}
                onChange={(e: any) => {
                  setUrlInput(e.target.value);
                  handleGenerateQR(e.target.value);
                }}
                placeholder="https://example.com"
                style={{ width: '100%' }}
              />
            </div>
          )}

          {qrType === "text" && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('enterText')}:</label>
              <textarea
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  handleGenerateQR(e.target.value);
                }}
                placeholder={t('textPlaceholder')}
                style={{
                  width: '100%',
                  padding: '3px 4px',
                  fontSize: '13.75px',
                  fontFamily: '"MS Sans Serif", Arial, sans-serif',
                  border: '2px inset',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  minHeight: '60px',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {qrType === "wifi" && (
            <>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('wifiSsid')}:</label>
                <Win95Input
                  value={wifiSsid}
                  onChange={(e: any) => {
                    setWifiSsid(e.target.value);
                    if (e.target.value) {
                      const wifiString = `WIFI:T:WPA;S:${e.target.value};P:${wifiPassword};;`;
                      handleGenerateQR(wifiString);
                    }
                  }}
                  placeholder="Network name"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('wifiPassword')}:</label>
                <Win95Input
                  value={wifiPassword}
                  onChange={(e: any) => {
                    setWifiPassword(e.target.value);
                    if (wifiSsid) {
                      const wifiString = `WIFI:T:WPA;S:${wifiSsid};P:${e.target.value};;`;
                      handleGenerateQR(wifiString);
                    }
                  }}
                  placeholder="Password"
                  type="password"
                  style={{ width: '100%' }}
                />
              </div>
            </>
          )}

          {qrType === "email" && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('emailAddress')}:</label>
              <Win95Input
                value={emailTo}
                onChange={(e: any) => {
                  setEmailTo(e.target.value);
                  if (e.target.value) {
                    handleGenerateQR(`mailto:${e.target.value}`);
                  }
                }}
                placeholder="email@example.com"
                style={{ width: '100%' }}
              />
            </div>
          )}

          {qrType === "phone" && (
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('phoneNumber')}:</label>
                <Win95Input
                  value={phoneNumber}
                  onChange={(e: any) => {
                    setPhoneNumber(e.target.value);
                  if (e.target.value) {
                    handleGenerateQR(`tel:${e.target.value}`);
                  }
                }}
                placeholder="+66812345678"
                style={{ width: '100%' }}
              />
            </div>
          )}

          {qrType === "sms" && (
            <>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('phoneNumber')}:</label>
                <Win95Input
                  value={smsPhone}
                  onChange={(e: any) => {
                    setSmsPhone(e.target.value);
                    if (e.target.value) {
                      const smsString = `smsto:${e.target.value}:${smsMessage}`;
                      handleGenerateQR(smsString);
                    }
                  }}
                  placeholder="+66812345678"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('message')}:</label>
                <textarea
                  value={smsMessage}
                  onChange={(e) => {
                    setSmsMessage(e.target.value);
                    if (smsPhone) {
                      const smsString = `smsto:${smsPhone}:${e.target.value}`;
                      handleGenerateQR(smsString);
                    }
                  }}
                  placeholder="Message"
                  style={{
                    width: '100%',
                    padding: '3px 4px',
                    fontSize: '13.75px',
                    fontFamily: '"MS Sans Serif", Arial, sans-serif',
                    border: '2px inset',
                    borderTopColor: '#808080',
                    borderLeftColor: '#808080',
                    borderRightColor: '#dfdfdf',
                    borderBottomColor: '#dfdfdf',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    minHeight: '60px',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </>
          )}
        </Win95Panel>

        {/* Customization Panel */}
        <Win95Panel title={t('customize')}>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('fgColor')}:</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{ width: '40px', height: '24px', cursor: 'pointer', border: '2px inset' }}
              />
              <Win95Input value={fgColor} onChange={(e: any) => setFgColor(e.target.value)} style={{ flex: 1 }} />
            </div>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('bgColor')}:</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '40px', height: '24px', cursor: 'pointer', border: '2px inset' }}
              />
              <Win95Input value={bgColor} onChange={(e: any) => setBgColor(e.target.value)} style={{ flex: 1 }} />
            </div>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('size')}: {size}px</label>
            <input
              type="range"
              min="100"
              max="400"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('errorLevel')}:</label>
            <select
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as any)}
              style={{
                width: '100%',
                padding: '2px',
                fontSize: '13.75px',
                border: '2px inset',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#dfdfdf',
                borderBottomColor: '#dfdfdf',
                backgroundColor: '#ffffff',
                fontFamily: '"MS Sans Serif", Arial, sans-serif',
                cursor: 'pointer'
              }}            >
              <option value="L">{t('errorL')} (7%)</option>
              <option value="M">{t('errorM')} (15%)</option>
              <option value="Q">{t('errorQ')} (25%)</option>
              <option value="H">{t('errorH')} (30%)</option>
            </select>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('uploadLogo')}:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{
                width: '100%',
                padding: '2px',
                fontSize: '13.75px',
                backgroundColor: '#ffffff',
                fontFamily: '"MS Sans Serif", Arial, sans-serif',
                border: 'none',
                outline: 'none'
              }}
            />
            <style>{`
              input[type="file"]::file-selector-button {
                padding: 4px 8px;
                border: 2px outset #dfdfdf;
                border-right-color: #808080;
                border-bottom-color: #808080;
                background-color: #c0c0c0;
                color: #000000;
                font-family: '"MS Sans Serif", Arial, sans-serif';
                font-size: 13.75px;
                cursor: pointer;
                margin-right: 8px;
              }
              input[type="file"]::file-selector-button:active {
                border-style: inset;
              }
            `}</style>
          </div>

          {logoImage && (
            <>
              <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontWeight: 'bold' }}>{t('showLogo')}:</label>
                <input
                  type="checkbox"
                  checked={showLogo}
                  onChange={(e) => setShowLogo(e.target.checked)}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('logoSize')}: {logoSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={logoSize}
                  onChange={(e) => setLogoSize(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <Win95Button onClick={removeLogo} style={{ width: '100%' }}>
                Remove Logo
              </Win95Button>
            </>
          )}

          <div style={{ marginBottom: '8px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontWeight: 'bold' }}>{t('transparentBg')}:</label>
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
            />
          </div>
        </Win95Panel>

        {/* Preview Panel */}
        <Win95Panel title={t('preview')}>
          {qrValue ? (
            <>
              <div
                ref={qrRef}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: transparentBg ? '#c0c0c0' : bgColor,
                  border: '2px inset',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#dfdfdf',
                  borderBottomColor: '#dfdfdf',
                  position: 'relative',
                  minHeight: '200px'
                }}
              >
                <QRCodeSVG
                  value={qrValue}
                  size={size}
                  level={errorLevel}
                  includeMargin={true}
                  fgColor={fgColor}
                  bgColor={transparentBg ? '#c0c0c0' : bgColor}
                />
                {logoImage && showLogo && (
                  <div
                    style={{
                      position: 'absolute',
                      width: `${logoSize}px`,
                      height: `${logoSize}px`,
                      backgroundColor: bgColor,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={logoImage}
                      alt="logo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{t('exportFormat')}:</label>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  <Win95Button
                    active={exportFormat === 'png'}
                    onClick={() => setExportFormat('png')}
                    style={{ flex: 1 }}
                  >
                    PNG
                  </Win95Button>
                  <Win95Button
                    active={exportFormat === 'svg'}
                    onClick={() => setExportFormat('svg')}
                    style={{ flex: 1 }}
                  >
                    SVG
                  </Win95Button>
                  <Win95Button
                    active={exportFormat === 'jpeg'}
                    onClick={() => setExportFormat('jpeg')}
                    style={{ flex: 1 }}
                  >
                    JPEG
                  </Win95Button>
                </div>
              </div>

              {exportFormat !== 'svg' && (
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Size:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', marginBottom: '8px' }}>
                    {[300, 500, 800, 1000, 1500, 2000].map((sizeOption) => (
                      <Win95Button
                        key={sizeOption}
                        active={exportSize === sizeOption}
                        onClick={() => setExportSize(sizeOption)}
                        style={{ fontSize: '12.5px', padding: '2px 4px' }}
                      >
                        {sizeOption}
                      </Win95Button>
                    ))}
                  </div>
                </div>
              )}

              <Win95Button onClick={() => downloadQR(exportFormat)} style={{ width: '100%', marginBottom: '4px' }}>
                Download
              </Win95Button>
              <Win95Button onClick={copyToClipboard} style={{ width: '100%' }}>
                {copied ? 'Copied!' : 'Copy'}
              </Win95Button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#808080' }}>
              Enter data to generate QR code
            </div>
          )}
        </Win95Panel>
      </div>
      {/* Footer with Sponsor Banners */}
      <div style={{ backgroundColor: '#c0c0c0', padding: '8px', borderTop: '2px solid #dfdfdf', marginTop: '8px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1400px' }}>
          {/* Sponsor Banners */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8px', marginBottom: '8px' }}>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid #808080', padding: '12px', textAlign: 'center', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#808080' }}>
              Sponsor 1
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid #808080', padding: '12px', textAlign: 'center', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#808080' }}>
              Sponsor 2
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid #808080', padding: '12px', textAlign: 'center', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#808080' }}>
              Sponsor 3
            </div>
          </div>

          {/* Made by Footer */}
          <div style={{ textAlign: 'center', padding: '8px', borderTop: '2px inset', borderTopColor: '#808080', fontSize: '11px', color: '#808080' }}>
            Made by <a href="https://www.jakkrapat.com" target="_blank" rel="noopener noreferrer" style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>Guitar DSP</a>
          </div>
        </div>
      </div>
      </div>
      </div>
      {showNotification && <TaskbarNotification message={notificationMessage} />}
    </>
  );
}
