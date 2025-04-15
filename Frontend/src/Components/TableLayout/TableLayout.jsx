import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useAuth } from '../../Context/AuthContext'

const TableLayout = () => {
  // Get current user information
  const { user } = useAuth();

  // Create ref for table rows animation
  const tableRowsRef = useRef([]);

  // Mock table reservation data
  const [tables, setTables] = useState([
    { id: 1, capacity: 4, status: 'occupied', reservedBy: null },
    { id: 2, capacity: 2, status: 'available', reservedBy: null },
    { id: 3, capacity: 6, status: 'reserved', reservedBy: { id: user?.id || 'user123', name: user?.username || 'Current User' }, reservationDate: '2023-07-15', reservationTime: '19:00' },
    { id: 4, capacity: 4, status: 'available', reservedBy: null },
    { id: 5, capacity: 8, status: 'reserved', reservedBy: { id: 'user456', name: 'Another User' } },
    { id: 6, capacity: 2, status: 'reserved', reservedBy: { id: user?.id || 'user123', name: user?.username || 'Current User' }, reservationDate: '2023-07-20', reservationTime: '20:30' }
  ]);

  // Clear and reset refs when component mounts
  useEffect(() => {
    tableRowsRef.current = [];
  }, []);

  // Animate table rows after they're added to the refs
  useEffect(() => {
    // Add a small delay to ensure refs are populated
    const timer = setTimeout(() => {
      if (tableRowsRef.current.length > 0) {
        gsap.fromTo(tableRowsRef.current,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2
          }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add items to tableRowsRef
  const addToRefs = (el) => {
    if (el && !tableRowsRef.current.includes(el)) {
      tableRowsRef.current.push(el);
    }
  };

  // Check if a table is reserved by the current user
  const isReservedByCurrentUser = (table) => {
    return table.reservedBy && table.reservedBy.id === (user?.id || 'user123');
  };

  // Filter tables booked by the current user
  const myTables = tables.filter(isReservedByCurrentUser);
  const otherTables = tables.filter(table => !isReservedByCurrentUser(table));

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {/* My Reservations Section */}
      {myTables.length > 0 && (
        <div className="my-tables-section">
          <h3 className="my-tables-title">My Reservations</h3>
          <div className="table-layout-container my-tables-container">
            <table className="table-layout">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell">Table No</th>
                  <th className="table-header-cell">Capacity</th>
                  <th className="table-header-cell">Date</th>
                  <th className="table-header-cell">Time</th>
                  <th className="table-header-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {myTables.map((table, index) => (
                  <tr
                    key={`my-${table.id}`}
                    className="table-row my-table-row slide-in-right"
                    ref={addToRefs}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <td className="table-cell">{table.id}</td>
                    <td className="table-cell">{table.capacity}</td>
                    <td className="table-cell">{formatDate(table.reservationDate)}</td>
                    <td className="table-cell">{table.reservationTime || '19:00'}</td>
                    <td className="table-cell">
                      <button className="view-table-btn my-reservation-btn">
                        Manage Booking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Tables Section */}
      <div className="all-tables-section">
        <h3 className="all-tables-title">All Tables</h3>
        <div className="table-layout-container">
          <table className="table-layout">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Table No</th>
                <th className="table-header-cell">Capacity</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr
                  key={table.id}
                  className={`table-row slide-in-right ${isReservedByCurrentUser(table) ? 'my-reservation' : ''}`}
                  ref={addToRefs}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <td className="table-cell">{table.id}</td>
                  <td className="table-cell">{table.capacity}</td>
                  <td className="table-cell">
                    <span className={`status-badge status-${table.status}`}>
                      {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <button
                      className={`view-table-btn ${table.status === 'occupied' || table.status === 'reserved' ? 'disabled-btn' : 'book-btn'}`}
                      disabled={table.status === 'occupied' || table.status === 'reserved'}
                      title={table.status === 'occupied' || table.status === 'reserved' ? 'This table is not available' : 'Book this table'}
                    >
                      {table.status === 'available' ? 'Book Table' : 'Not Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableLayout