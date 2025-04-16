"use client";

import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface QRCodeProps {
  text: string;
  width?: number;
  className?: string;
}

export default function QRCodeCanvas({
  text,
  width = 140,
  className = "",
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;

    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width,
        margin: 1,
        color: {
          dark: "#000000", // Black dots
          light: "#ffffff", // White background
        },
      },
      (error: Error | null | undefined) => {
        if (error) console.error("Error generating QR code:", error);
      }
    );
  }, [text, width]);

  return <canvas ref={canvasRef} className={className} />;
}
