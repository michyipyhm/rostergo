import React, { useEffect, useState } from "react";
import BranchInfo from "@/component/BranchInfo";
import PositionList from "@/component/PositionList";
import ShiftSlotList from "@/component/ShiftSlotList";

export default function ShiftSlot() {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Shift Slots</h1>
      <div style={styles.content}>
        <ShiftSlotList />
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
