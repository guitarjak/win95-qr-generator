import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

interface PromptPayGeneratorProps {
  onQRGenerate: (qrValue: string) => void;
}

export function PromptPayGenerator({ onQRGenerate }: PromptPayGeneratorProps) {
  const { t } = useLanguage();
  const [idType, setIdType] = useState<"phone" | "id">("phone");
  const [idValue, setIdValue] = useState("");
  const [amount, setAmount] = useState("");

  const generatePromptPayQR = () => {
    if (!idValue) return;

    // PromptPay QR code format (EMVCo standard)
    // This is a simplified version - for production, use a proper library
    let payload = "00020101051100053000000";

    if (idType === "phone") {
      // Phone number format: 0066812345678 -> 66812345678
      const cleanPhone = idValue.replace(/^0/, "66").replace(/[^0-9]/g, "");
      payload += `0215${cleanPhone}`;
    } else {
      // ID number (Thai National ID)
      const cleanId = idValue.replace(/[^0-9]/g, "");
      payload += `0216${cleanId}`;
    }

    // Add amount if provided (in satang, so multiply by 100)
    if (amount) {
      const amountInSatang = (parseFloat(amount) * 100).toString();
      payload += `540${amountInSatang.length}${amountInSatang}`;
    }

    // Add country code and currency (Thailand = TH, THB = 764)
    payload += "5802TH";
    payload += "5303764";

    // Add checksum (CRC-16)
    const crc = calculateCRC(payload + "6304");
    const finalPayload = payload + "6304" + crc.toString(16).toUpperCase().padStart(4, "0");

    onQRGenerate(finalPayload);
  };

  const calculateCRC = (data: string): number => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{t("promptpay")}</CardTitle>
        <CardDescription>{t("promptpayDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ID Type Selection */}
        <div>
          <Label htmlFor="id-type">{t("idType")}</Label>
          <Select value={idType} onValueChange={(value) => setIdType(value as "phone" | "id")}>
            <SelectTrigger id="id-type" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">{t("phoneNumber")}</SelectItem>
              <SelectItem value="id">{t("nationalId")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ID Value Input */}
        <div>
          <Label htmlFor="id-value">
            {idType === "phone" ? t("phoneNumber") : t("nationalId")}
          </Label>
          <Input
            id="id-value"
            placeholder={idType === "phone" ? "0812345678" : "1234567890123"}
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Amount (Optional) */}
        <div>
          <Label htmlFor="amount">{t("amount")} (THB) - {t("optional")}</Label>
          <Input
            id="amount"
            type="number"
            placeholder="100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2"
            step="0.01"
            min="0"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePromptPayQR}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {t("generatePromptpay")}
        </button>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-blue-900 dark:text-blue-200">
          <p className="font-semibold mb-1">{t("promptpayInfo")}</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>{t("promptpayInfo1")}</li>
            <li>{t("promptpayInfo2")}</li>
            <li>{t("promptpayInfo3")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
