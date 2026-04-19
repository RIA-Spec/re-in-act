import { ImageResponse } from "next/og";
import {
  OG_IMAGE_ALT,
  SITE_HERO_SUPPORT,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_VALUE_PROPS,
} from "@/lib/constants";

export const runtime = "edge";
export const alt = OG_IMAGE_ALT;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top right, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.12) 18%, transparent 18%), radial-gradient(circle at bottom left, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.08) 22%, transparent 22%), linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%)",
        color: "#1e293b",
        padding: "48px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          border: "1px solid rgba(148, 163, 184, 0.22)",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.82)",
          boxShadow: "0 24px 60px rgba(37, 99, 235, 0.08)",
          padding: "44px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: "28px",
            width: "100%",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "68%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  gap: "12px",
                  border: "1px solid rgba(37, 99, 235, 0.14)",
                  borderRadius: "999px",
                  background: "rgba(37, 99, 235, 0.08)",
                  color: "#2563eb",
                  padding: "14px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "12px",
                    width: "12px",
                    borderRadius: "999px",
                    background: "#2563eb",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    fontSize: "20px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {SITE_TAGLINE}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  maxWidth: "820px",
                  fontSize: "118px",
                  lineHeight: 0.88,
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                  color: "#0f172a",
                }}
              >
                {SITE_NAME}
              </div>

              <div
                style={{
                  display: "flex",
                  maxWidth: "760px",
                  fontSize: "52px",
                  lineHeight: 1.02,
                  fontWeight: 650,
                  color: "#0f172a",
                }}
              >
                {SITE_HERO_SUPPORT}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "32%",
              gap: "16px",
            }}
          >
            {SITE_VALUE_PROPS.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  border: "1px solid rgba(37, 99, 235, 0.18)",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(180deg, rgba(219,234,254,0.92) 0%, rgba(255,255,255,0.96) 100%)",
                  color: "#0f172a",
                  minHeight: "108px",
                  padding: "20px 22px",
                  boxShadow: "0 14px 32px rgba(37, 99, 235, 0.10)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    fontSize: "30px",
                    lineHeight: 1,
                    fontWeight: 800,
                    color: "#111827",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            color: "#64748b",
            fontSize: "22px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex" }}>re-in-act.org</div>
        </div>
      </div>
    </div>,
    size,
  );
}
