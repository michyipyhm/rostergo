"use client";
import React, { useEffect, useState } from "react";
import styles from "./ShiftSlotList.module.scss";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import EditShiftSlot from "./EditShiftSlot";
import EditLeaveType from "./EditLeaveType";
import AddGrade from "./AddGrade";
import AddLeaveType from "./AddLeaveType";
import AddShiftSlot from "./AddShiftSlot";
import { Plus, Edit, Clock, Calendar } from "lucide-react"

function ShiftSlotList() {
  const [shiftSlotData, setShiftSlotData] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditShiftSlot, setShowEditShiftSlot] = useState(false);
  const [showEditLeaveType, setShowEditLeaveType] = useState(false);
  const [showAddShiftSlot, setShowAddShiftSlot] = useState(false);
  const [showAddLeaveType, setShowAddLeaveType] = useState(false);
  const [currentShiftSlot, setCurrentShiftSlot] = useState<any | null>(null);
  const [currentLeaveType, setCurrentLeaveType] = useState<any | null>(null);

  useEffect(() => {
    const fetchShiftSlotData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token has been found.");
        }

        const response = await fetch(`/api/admin/getshiftslot`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch shift slot data: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setShiftSlotData(result.shiftSlots);
        setLeaveTypeData(result.leaveTypes);
      } catch (err: any) {
        console.error("Error fetching shift data:", err.message);
        setError(err.message || "Failed to fetch shift data.");
      } finally {
        setLoading(false);
      }
    };

    fetchShiftSlotData();
  }, []);

  if (loading) {
    return <div>Loading shift slot data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddShiftSlot = () => setShowAddShiftSlot(true);
  const handleAddLeaveType = () => setShowAddLeaveType(true);

  const handleEditShiftSlot = (shiftSlot: any) => {
    setCurrentShiftSlot(shiftSlot);
    setShowEditShiftSlot(true);
  };

  const handleEditLeaveType = (leaveType: any) => {
    setCurrentLeaveType(leaveType);
    setShowEditLeaveType(true);
  };

  const closeWindow = () => {
    setShowEditShiftSlot(false);
    setShowEditLeaveType(false);
    setShowAddShiftSlot(false);
    setShowAddLeaveType(false);
    setCurrentShiftSlot(null);
    setCurrentLeaveType(null);
  };

  if (loading)
    return <div className={styles.loading}>Loading shift slot data...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Clock className={styles.icon} size={20} />
          <h2>Shift Slot List</h2>
          <button className={styles.addButton} onClick={handleAddShiftSlot}>
            <Plus size={20} />
            Add Shift Slot
          </button>
        </div>
        {/* <div className={styles.cardContent}> */}
          <table className={styles.listTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Short Title</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Work Hour</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shiftSlotData.length > 0 ? (
                shiftSlotData.map((shiftSlot: any) => (
                  <tr key={shiftSlot.id}>
                    <td>{shiftSlot.title}</td>
                    <td>{shiftSlot.short_title}</td>
                    <td>{shiftSlot.start_time}</td>
                    <td>{shiftSlot.end_time}</td>
                    <td>{shiftSlot.work_hour}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditShiftSlot(shiftSlot)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noData}>
                    No Shift Slot data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* </div> */}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Calendar className={styles.icon} size={20} />
          <h2>Leave Type List</h2>
          <button className={styles.addButton} onClick={handleAddLeaveType}>
            <Plus size={20} />
            Add Leave Type
          </button>
        </div>
        {/* <div className={styles.cardContent}> */}
          <table className={styles.listTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Quota</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveTypeData.length > 0 ? (
                leaveTypeData.map((leaveType: any) => (
                  <tr key={leaveType.id}>
                    <td>{leaveType.name}</td>
                    <td>{leaveType.short_name}</td>
                    <td>{leaveType.quota}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditLeaveType(leaveType)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    No Leave Type data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* </div> */}
      </div>

      {showEditShiftSlot && currentShiftSlot && (
        <EditShiftSlot
          onClose={closeWindow}
          id={currentShiftSlot.id}
          title={currentShiftSlot.title}
          shortTitle={currentShiftSlot.short_title}
          startTime={currentShiftSlot.start_time}
          endTime={currentShiftSlot.end_time}
          workHour={currentShiftSlot.work_hour}
        />
      )}
      {showEditLeaveType && currentLeaveType && (
        <EditLeaveType
          onClose={closeWindow}
          id={currentLeaveType.id}
          name={currentLeaveType.name}
          shortName={currentLeaveType.short_name}
          quota={currentLeaveType.quota}
        />
      )}
      {showAddShiftSlot && <AddShiftSlot onClose={closeWindow} />}
      {showAddLeaveType && <AddLeaveType onClose={closeWindow} />}
    </div>
  );
}

export default ShiftSlotList;
