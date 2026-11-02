import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "NAVEEN R: Ideas Engineered. Intelligence Created.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0e0d12 0%, #16141b 55%, #2a1a26 100%)",
          color: "#f8f4e9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>
          <span>NAVEEN</span>
          <span style={{ color: "#d89bbb" }}>R</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Building the Future with AI.</div>
          <div style={{ fontSize: 30, color: "#b8b1a6" }}>AI engineering, educational video production and software projects.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#b8b1a6" }}>
          <span>{SITE.tagline}</span>
          <span>Personal AI Engineering</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
