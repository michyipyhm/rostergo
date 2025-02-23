"use client";
import React, { useEffect, useState } from "react";
import styles from "./PositionList.module.scss";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import EditGrade from "./EditGrade";
import EditPosition from "./EditPosition";
import AddPosition from "./AddPosition";
import AddGrade from "./AddGrade";
import { EditPositionProps, GradeData, PositionData } from "@/lib/models";
import { Plus, GraduationCap, Briefcase, Edit } from "lucide-react";

function PositionList() {
  const [positionData, setPositionData] = useState<PositionData[] | null>(null);
  const [grades, setGrades] = useState<GradeData[] | null>(null);
  const [gradeData, setGradeData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditPosition, setShowEditPosition] = useState(false);
  const [showEditGrade, setShowEditGrade] = useState(false);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [showAddGrade, setShowAddGrade] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<{
    grade_id: number;
    grade_name: string;
    annual_leave_quota: number;
  } | null>(null);
  const [currentPosition, setCurrentPosition] =
    useState<EditPositionProps | null>(null);

  useEffect(() => {
    const fetchPositionData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token has been found.");
        }

        const response = await fetch(`/api/admin/getposition`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch position data: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setPositionData(result.positions);
        setGrades(result.grades);
        setGradeData(result.grades);
      } catch (err: any) {
        console.error("Error fetching position data:", err.message);
        setError(err.message || "Failed to fetch position data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
  }, []);

  if (loading) {
    return <div>Loading position data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditPosition = (position: PositionData) => {
    setCurrentPosition({
      onClose: closeEdit,
      id: position.id,
      name: position.name,
      gradeId: position.grade_id,
      gradeName: position.grade_name,
      type: position.type,
      partTimeWage: position.part_time_hour_wage,
      fullTimeWage: position.full_time_wage,
      weekendRestDay: position.weekend_restDay,
      restDayPerWeek: position.restDay_per_week,
      restDayCountBy: position.restDay_countBy,
      grades: grades,
    });
    setShowEditPosition(true);
  };

  const handleEditGrade = (grade: {
    grade_id: number;
    grade_name: string;
    annual_leave_quota: number;
  }) => {
    setCurrentGrade(grade);
    setShowEditGrade(true);
  };

  const handleAddPosition = () => {
    setShowAddPosition(true);
  };

  const handleAddGrade = () => {
    setShowAddGrade(true);
  };

  const closeEdit = () => {
    setShowEditPosition(false);
    setShowAddPosition(false);
    setShowEditGrade(false);
    setShowAddGrade(false);
    setCurrentGrade(null);
    setCurrentPosition(null);
  };

  if (loading)
    return <div className={styles.loading}>Loading position data...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Briefcase className={styles.icon} size={20} />
          <h2>Positions and Grades</h2>
          <button
            className={styles.addButton}
            onClick={() => setShowAddPosition(true)}
          >
            <Plus size={20} />
            Add Position
          </button>
        </div>
        {/* <div className={styles.cardContent}> */}
          <table className={styles.listTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Type</th>
                <th>Part Time Salary (per hour)</th>
                <th>Full Time Salary</th>
                <th>Fixed Rest day</th>
                <th>Rest day (per week)</th>
                <th>Rest day starts</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {positionData?.length > 0 ? (
                positionData.map((position) => (
                  <tr key={position.id}>
                    <td>{position.name}</td>
                    <td>{position.grade_name}</td>
                    <td>{position.type}</td>
                    <td>
                      {position.part_time_hour_wage != null
                        ? `$${position.part_time_hour_wage}`
                        : "N/A"}
                    </td>
                    <td>
                      {position.full_time_wage != null
                        ? `$${position.full_time_wage}`
                        : "N/A"}
                    </td>
                    <td>{position.weekend_restDay ? "Yes" : "No"}</td>
                    <td>
                      {position.restDay_per_week != null
                        ? position.restDay_per_week
                        : "N/A"}
                    </td>
                    <td>
                      {position.restDay_countBy != null
                        ? position.restDay_countBy
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditPosition(position)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className={styles.noData}>
                    No position data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* </div> */}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <GraduationCap className={styles.icon} size={20} />
          <h2>Grades</h2>
          <button
            className={styles.addButton}
            onClick={() => setShowAddGrade(true)}
          >
            <Plus size={20} />
            Add Grade
          </button>
        </div>
        {/* <div className={styles.cardContent}> */}
          <table className={styles.listTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Annual Leave Quota</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gradeData?.length > 0 ? (
                gradeData.map((grade) => (
                  <tr key={grade.id}>
                    <td>{grade.name}</td>
                    <td>{grade.annual_leave_quota}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() =>
                          handleEditGrade({
                            grade_id: grade.id,
                            grade_name: grade.name,
                            annual_leave_quota: grade.annual_leave_quota,
                          })
                        }
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.noData}>
                    No grade data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* </div> */}
      </div>

      {showEditPosition && currentPosition && (
        <EditPosition {...currentPosition} />
      )}
      {showEditGrade && currentGrade && (
        <EditGrade
          onClose={closeEdit}
          id={currentGrade.grade_id}
          name={currentGrade.grade_name}
          annualLeaveQuota={currentGrade.annual_leave_quota}
        />
      )}
      {showAddGrade && <AddGrade onClose={closeEdit} />}
      {showAddPosition && <AddPosition onClose={closeEdit} grades={grades} />}
    </div>
  );
}

export default PositionList;
