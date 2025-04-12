import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./components/Product_suit_01";

export default function App() {
  const [color, setColor] = useState("champagne-gold");
  const [base, setBase] = useState("BaseA");
  const [panelOpen, setPanelOpen] = useState(false); // 初始状态为折叠

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f9f9f9", // 淡灰背景
      }}
    >
      {/* 控制面板 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: panelOpen ? 0 : "-240px", // 展开/折叠效果
          zIndex: 2,
          width: "240px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "1rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          transition: "right 0.3s ease",
          backdropFilter: "blur(6px)",
          borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <img
            src="/logo_1_black.png"
            alt="logo"
            style={{
              maxHeight: "60px",
              maxWidth: "150px",
              objectFit: "contain",
              filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.1))", // 阴影效果
            }}
          />
        </div>

        {/* Color Selector */}
        {panelOpen && (
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "0.5rem",
                fontWeight: "600",
              }}
            >
              Color
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div title="Champagne Gold">
                <button
                  onClick={() => setColor("champagne-gold")}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20%",
                    backgroundColor: "#D4AF37",
                    border:
                      color === "champagne-gold"
                        ? "3px solid #333"
                        : "2px solid #ccc",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              </div>
              <div title="Metallic Black">
                <button
                  onClick={() => setColor("metallic-black")}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20%",
                    backgroundColor: "#333",
                    border:
                      color === "metallic-black"
                        ? "3px solid #333"
                        : "2px solid #ccc",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Base Selector - 下拉列表 */}
        {panelOpen && (
          <div>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "0.5rem",
                fontWeight: "600",
              }}
            >
              Top Base
            </div>
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              {["BaseA", "BaseB", "BaseC", "BaseD"].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 45 }}>
        <Stage environment="city" intensity={0.6}>
          <Model color={color} base={base} />
        </Stage>
        <OrbitControls />
      </Canvas>

      {/* 展开/收缩按钮 */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        style={{
          position: "absolute",
          right: panelOpen ? "240px" : "0", // 调整到右侧
          top: "20px",
          zIndex: 3,
          background: "transparent", // 去掉背景
          color: "#333", // 按钮颜色
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px",
          transition: "right 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {panelOpen ? "→" : "←"} {/* 展开时显示左箭头，收起时显示右箭头 */}
      </button>
    </div>
  );
}
