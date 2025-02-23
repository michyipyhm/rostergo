"use client";
import React, { useEffect, useState } from "react"
import styles from './BranchInfo.module.scss'
import { Building } from "lucide-react"

interface BranchData {
  id: number
  address: string
}

function BranchInfo() {
  const [branchData, setBranchData] = useState<BranchData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBranchData = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token has been found.");
        }

        const response = await fetch(`/api/admin/getbranch`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data.`
          )
        }

        const data: BranchData = await response.json();
        setBranchData(data);
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, []);

  if (loading) {
    return <div>Loading branch data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.card}>
    <div className={styles.cardHeader}>
      <Building className={styles.icon} size={20} />
      <h2>Branch Information</h2>
    </div>
    <div className={styles.cardContent}>
      {branchData ? (
        <div className={styles.branchDetails}>
          <div className={styles.detail}>
            <span className={styles.label}>Branch ID:</span>
            <span className={styles.value}>{branchData.id}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Address:</span>
            <span className={styles.value}>{branchData.address}</span>
          </div>
        </div>
      ) : (
        <div className={styles.noData}>No branch data found.</div>
      )}
    </div>
  </div>
  )
}

export default BranchInfo;