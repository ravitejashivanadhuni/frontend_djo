import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

export default function QuickCategories({ SidebarWidget,QuickLink, C }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/quick-job-categories`
        );

        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: 18,
        marginBottom: 16,
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .skeleton-line {
          height: 18px;
          border-radius: 6px;
          margin-bottom: 12px;
          background: linear-gradient(
            90deg,
            #f1f5f9 25%,
            #e2e8f0 50%,
            #f1f5f9 75%
          );
          background-size: 200px 100%;
          animation: shimmer 1.4s infinite linear;
        }
      `}</style>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13.5,
          marginBottom: 14,
        }}
      >
        ⚡ Quick Categories
      </div>

      {loading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                className="skeleton-line"
                style={{
                  width: "65%",
                  marginBottom: 0,
                }}
              />

              <div
                className="skeleton-line"
                style={{
                  width: 40,
                  height: 20,
                  marginBottom: 0,
                  borderRadius: 20,
                }}
              />
            </div>
          ))}
        </>
      ) : (
        categories.map((cat) => (
          <QuickLink
            key={cat.label}
            label={cat.label}
            count={`${cat.count}+`}
          />
        ))
      )}
    </div>
  );
}