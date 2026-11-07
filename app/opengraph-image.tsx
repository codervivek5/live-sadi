import { ImageResponse } from "next/og";

export const alt = "Live Shadi: watch weddings live, relive love stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "linear-gradient(135deg, #4a1226 0%, #701f3a 100%)",
          color: "#fffdf8",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 4, background: "#d4af75", marginBottom: 36 }} />
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2, display: "flex" }}>
          Live <span style={{ color: "#d4af75", marginLeft: 24 }}>Shadi</span>
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#f6eedf", maxWidth: 900, lineHeight: 1.3 }}>
          Every love story deserves a beautiful beginning. Watch weddings live, relive them forever.
        </div>
      </div>
    ),
    size,
  );
}
