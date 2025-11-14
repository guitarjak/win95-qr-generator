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

interface QRCustomizerProps {
  onCustomizationChange: (customization: QRCustomization) => void;
}

export interface QRCustomization {
  fgColor: string;
  bgColor: string;
  size: number;
  errorLevel: "L" | "M" | "Q" | "H";
}

export function QRCustomizer({ onCustomizationChange }: QRCustomizerProps) {
  const { t } = useLanguage();
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("H");

  const handleChange = () => {
    onCustomizationChange({
      fgColor,
      bgColor,
      size,
      errorLevel,
    });
  };

  const handleFgColorChange = (color: string) => {
    setFgColor(color);
    onCustomizationChange({
      fgColor: color,
      bgColor,
      size,
      errorLevel,
    });
  };

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
    onCustomizationChange({
      fgColor,
      bgColor: color,
      size,
      errorLevel,
    });
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    onCustomizationChange({
      fgColor,
      bgColor,
      size: newSize,
      errorLevel,
    });
  };

  const handleErrorLevelChange = (level: "L" | "M" | "Q" | "H") => {
    setErrorLevel(level);
    onCustomizationChange({
      fgColor,
      bgColor,
      size,
      errorLevel: level,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{t("customize")}</CardTitle>
        <CardDescription>{t("customizeDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Foreground Color */}
        <div>
          <Label htmlFor="fg-color">{t("fgColor")}</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="fg-color"
              type="color"
              value={fgColor}
              onChange={(e) => handleFgColorChange(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={fgColor}
              onChange={(e) => handleFgColorChange(e.target.value)}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Background Color */}
        <div>
          <Label htmlFor="bg-color">{t("bgColor")}</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => handleBgColorChange(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={bgColor}
              onChange={(e) => handleBgColorChange(e.target.value)}
              className="flex-1"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        {/* Size */}
        <div>
          <Label htmlFor="size">{t("size")}: {size}px</Label>
          <Input
            id="size"
            type="range"
            min="100"
            max="500"
            value={size}
            onChange={(e) => handleSizeChange(parseInt(e.target.value))}
            className="mt-2"
          />
        </div>

        {/* Error Correction Level */}
        <div>
          <Label htmlFor="error-level">{t("errorLevel")}</Label>
          <Select value={errorLevel} onValueChange={(value) => handleErrorLevelChange(value as "L" | "M" | "Q" | "H")}>
            <SelectTrigger id="error-level" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">{t("errorL")} (7%)</SelectItem>
              <SelectItem value="M">{t("errorM")} (15%)</SelectItem>
              <SelectItem value="Q">{t("errorQ")} (25%)</SelectItem>
              <SelectItem value="H">{t("errorH")} (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
