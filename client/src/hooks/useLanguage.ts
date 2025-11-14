import { useCallback } from "react";

const translations: Record<string, string> = {
  // Main sections
  generator: "สร้าง QR Code",
  generatorDesc: "สร้าง QR Code ได้ง่ายๆ เพียงไม่กี่ขั้นตอน",
  
  // QR Code types
  url: "ลิงค์เว็บไซต์",
  text: "ข้อความ",
  wifi: "WiFi",
  email: "อีเมล",
  phone: "โทรศัพท์",
  sms: "SMS",
  
  // Input labels with helpful hints
  enterUrl: "ป้อนลิงค์เว็บไซต์",
  urlHint: "เช่น https://www.example.com",
  enterText: "ป้อนข้อความ",
  textPlaceholder: "ป้อนข้อความของคุณที่นี่",
  
  wifiSsid: "ชื่อ WiFi",
  wifiSsidPlaceholder: "ชื่อเครือข่าย WiFi ของคุณ",
  wifiPassword: "รหัสผ่าน WiFi",
  wifiPasswordPlaceholder: "รหัสผ่าน WiFi ของคุณ",
  
  emailAddress: "ที่อยู่อีเมล",
  emailHint: "เช่น example@gmail.com",
  
  phoneNumber: "หมายเลขโทรศัพท์",
  phoneHint: "เช่น 0812345678",
  
  message: "ข้อความ",
  messagePlaceholder: "ข้อความเพิ่มเติม (ไม่บังคับ)",
  
  // Preview and actions
  preview: "ตัวอย่าง QR Code",
  download: "ดาวน์โหลด PNG",
  copy: "คัดลอกไปยังคลิปบอร์ด",
  copied: "คัดลอกแล้ว!",
  noQrYet: "ป้อนข้อมูลเพื่อสร้าง QR Code",
  
  // Customization
  customize: "ปรับแต่ง QR Code",
  customizeDesc: "เปลี่ยนสี ขนาด และรูปแบบของ QR Code",
  fgColor: "สีของ QR Code",
  bgColor: "สีพื้นหลัง",
  size: "ขนาด QR Code",
  errorLevel: "ระดับความชัดเจน",
  errorL: "ต่ำ",
  errorM: "ปานกลาง",
  errorQ: "สูง",
  errorH: "สูงมาก",
  
  // Logo
  uploadLogo: "อัปโหลดโลโก้ (ไม่บังคับ)",
  logoHint: "อัปโหลดรูปภาพขนาดเล็ก (PNG, JPG) เพื่อวางไว้ตรงกลาง QR Code",
  logoSize: "ขนาดโลโก้",
  showLogo: "แสดงโลโก้ตรงกลาง",
  
  // Advanced customization
  cornerStyle: "รูปแบบมุม",
  dotStyle: "รูปแบบจุด",
  cornerSquare: "สี่เหลี่ยม",
  cornerRounded: "มนมน",
  cornerDot: "จุด",
  dotRounded: "มนมน",
  dotDots: "จุดตัวเนื้อ",
  dotClassy: "คลาสสิก",
  dotClassyRounded: "คลาสสิกมนมน",
  dotExtraRounded: "มนมนมาก",
  transparentBg: "พื้นหลังโปร่งใส",
  
  // Export options
  exportFormat: "รูปแบบไฟล์",
  exportSize: "ขนาดไฟล์",
  jpeg: "JPEG",
  png: "PNG",
  svg: "SVG",
  
  // PromptPay
  promptpay: "PromptPay (ชำระเงิน)",
  promptpayDesc: "สร้าง QR Code สำหรับชำระเงินผ่าน PromptPay",
  idType: "ประเภท ID",
  nationalId: "เลขประชาชน",
  promptpayPhoneNumber: "หมายเลขโทรศัพท์",
  amount: "จำนวนเงิน (บาท)",
  amountHint: "ปล่อยว่างไว้ให้ผู้ชำระตัดสิน",
  optional: "ไม่บังคับ",
  generatePromptpay: "สร้าง QR Code PromptPay",
  promptpayInfo: "ข้อมูล PromptPay",
  promptpayInfo1: "✓ ทำงานได้กับธนาคารไทยทั้งหมด",
  promptpayInfo2: "✓ สามารถกำหนดจำนวนหรือปล่อยให้ผู้ชำระตัดสิน",
  promptpayInfo3: "✓ สแกนด้วยแอพพอร์ทรรมบางใดก็ได้",
};

export function useLanguage() {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return {
    t,
  };
}
