import Table from 'react-bootstrap/Table';
import styles from './ManpowerTable.module.scss';

function ManpowerTable() {

  const manpowerEachHour = () => {
    const rows = [];
    for (let hour = 6; hour < 30; hour++) {
      const displayHour = hour % 24
      const time = displayHour.toString().padStart(2, '0') + ':00'
      const staff = 1
      rows.push(
        <tr key={time}>
          <td>{time}</td>
          <td>{staff}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className={styles.manpowerTable}>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Number of Staff</th>
          </tr>
        </thead>
        <tbody>
          {manpowerEachHour()}
        </tbody>
      </Table>
    </div>
  );
}

export default ManpowerTable;