import React, { useEffect, useState } from "react";
import BranchInfo from "@/component/BranchInfo";
import PositionList from "@/component/PositionList";

export default function Branch() {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Branch Management</h1>
      <div style={styles.content}>
        <BranchInfo />
        <PositionList />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  pageTitle: {
    fontSize: "30px",
    fontWeight: 600,
    color: "#1a1f36",
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
};
