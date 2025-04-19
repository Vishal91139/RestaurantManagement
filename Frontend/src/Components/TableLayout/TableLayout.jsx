import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../Context/AuthContext';
import { useReservation } from '../../Context/ReservationContext';
import BookingModal from './BookingModal';
import LoginPrompt from './LoginPrompt';

const TableLayout = () => {
  const { isAuthenticated } = useAuth();
  const {
    tables,
    reservations,
    loading,
    error,
    fetchTables,
    fetchReservations,
    createReservation,
    cancelReservation
  } = useReservation();

  const tableRowsRef = useRef([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [dateOptions, setDateOptions] = useState([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Generate date options for the next 7 days and check for past times
  useEffect(() => {
    const generateDateOptions = () => {
      const options = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dateString = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = date.getDate();
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });

        options.push({
          value: dateString,
          label: `${dayName}`,
          fullLabel: `${dayName}, ${monthName} ${dayNumber}`,
          isToday: i === 0
        });
      }

      setDateOptions(options);

      // If it's a new day, update the selected date to today
      const todayString = today.toISOString().split('T')[0];
      if (selectedDate < todayString) {
        setSelectedDate(todayString);
      }
    };

    generateDateOptions();

    // Check if the currently selected time is in the past for today
    const checkTimeValidity = () => {
      const now = new Date();
      const todayString = now.toISOString().split('T')[0];

      if (selectedDate === todayString) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const selectedHour = parseInt(selectedTime.split(':')[0]);

        // Check if all available times for today have passed (after 9 PM)
        if (currentHour >= 21) {
          // If it's already past 9 PM, automatically select tomorrow's date
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          const tomorrowString = tomorrow.toISOString().split('T')[0];
          setSelectedDate(tomorrowString);
          setSelectedTime('12:00'); // Reset to opening time
          fetchTables(tomorrowString, '12:00');
          return;
        }

        // If the selected time is in the past, select the next available time
        if (selectedHour < currentHour || (selectedHour === currentHour && currentMinute > 0)) {
          // Find the next available hour (current hour + 1, or next hour if we're past the half-hour)
          let nextAvailableHour;
          if (currentMinute > 30) {
            nextAvailableHour = Math.min(21, currentHour + 2); // Skip to hour after next if we're past half hour
          } else {
            nextAvailableHour = Math.min(21, currentHour + 1); // Otherwise just use next hour
          }

          // If the next available hour is past our latest time (9 PM), move to tomorrow
          if (nextAvailableHour >= 21 && currentMinute > 0) {
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            const tomorrowString = tomorrow.toISOString().split('T')[0];
            setSelectedDate(tomorrowString);
            setSelectedTime('12:00'); // Reset to opening time
            fetchTables(tomorrowString, '12:00');
          } else {
            const nextTime = `${nextAvailableHour.toString().padStart(2, '0')}:00`;
            setSelectedTime(nextTime);
            fetchTables(selectedDate, nextTime);
          }
        }
      }
    };

    checkTimeValidity();
  }, [selectedDate, selectedTime, fetchTables]);

  // Clear and reset refs when tables change
  useEffect(() => {
    tableRowsRef.current = [];
  }, [tables, reservations]);

  // Fetch tables when component mounts or date/time changes
  useEffect(() => {
    fetchTables(selectedDate, selectedTime);
  }, [fetchTables, selectedDate, selectedTime]);

  // GSAP animations
  useEffect(() => {
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
  }, [tables, reservations]);

  const addToRefs = (el) => {
    if (el && !tableRowsRef.current.includes(el)) {
      tableRowsRef.current.push(el);
    }
  };

  const isReservedByCurrentUser = (tableNumber) => {
    return reservations.some(res =>
      res.table_number === tableNumber &&
      new Date(res.date).toISOString().split('T')[0] === selectedDate &&
      res.time === selectedTime
    );
  };

  // Date and time selection is now handled directly in the date and time slot buttons

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleBookTable = (table) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setSelectedTable(table);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    setBookingInProgress(true);
    try {
      await createReservation(bookingData);

      // Refresh tables after booking
      await fetchTables(selectedDate, selectedTime);
      await fetchReservations();

      // Close the modal
      setShowBookingModal(false);
      setSelectedTable(null);
    } catch (err) {
      console.error('Error booking table:', err);
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedTable(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get user's reservations
  const myReservations = reservations || [];

  return (
    <div>
      {/* Advanced Date and Time Selector */}
      <div className="advanced-date-time-selector">
        <div className="selector-instructions">Select date and time to find available tables:</div>
        <div className="selector-content">
          <div className="date-selector">
            <div className="date-label">Date</div>
            <div className="date-slots">
              {dateOptions.map(date => (
                <button
                  key={date.value}
                  className={`date-slot ${selectedDate === date.value ? 'active' : ''} ${date.isToday ? 'today' : ''}`}
                  onClick={() => {
                    setSelectedDate(date.value);
                    fetchTables(date.value, selectedTime);
                  }}
                  title={date.fullLabel}
                >
                  <div className="date-day">{date.label}</div>
                  <div className="date-number">{new Date(date.value).getDate()}</div>
                  {date.isToday && <div className="today-marker">Today</div>}
                </button>
              ))}
            </div>
          </div>

          <div className="time-selector">
            <div className="time-label">Time</div>
            <div className="time-slots">
              {[
                { value: "12:00", label: "12:00 PM" },
                { value: "13:00", label: "1:00 PM" },
                { value: "14:00", label: "2:00 PM" },
                { value: "15:00", label: "3:00 PM" },
                { value: "16:00", label: "4:00 PM" },
                { value: "17:00", label: "5:00 PM" },
                { value: "18:00", label: "6:00 PM" },
                { value: "19:00", label: "7:00 PM" },
                { value: "20:00", label: "8:00 PM" },
                { value: "21:00", label: "9:00 PM" }
              ].map(time => {
                // Check if this time is in the past for today
                const now = new Date();
                const isToday = selectedDate === now.toISOString().split('T')[0];
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const timeHour = parseInt(time.value.split(':')[0]);

                // Time is past if it's today and the hour is earlier than current hour,
                // or if it's the same hour but we're already past the start of that hour
                const isPastTime = isToday && (timeHour < currentHour ||
                  (timeHour === currentHour && currentMinute > 0));

                // If it's after 9 PM, all times for today should be disabled
                const isAfterClosing = isToday && currentHour >= 21;

                return (
                  <button
                    key={time.value}
                    className={`time-slot ${selectedTime === time.value ? 'active' : ''} ${isPastTime || isAfterClosing ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!isPastTime && !isAfterClosing) {
                        setSelectedTime(time.value);
                        fetchTables(selectedDate, time.value);
                      }
                    }}
                    disabled={isPastTime || isAfterClosing}
                    title={isPastTime ? 'This time has already passed' : isAfterClosing ? 'Booking not available after 9 PM for same day' : undefined}
                  >
                    {time.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Searching for available tables...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {myReservations.length > 0 && (
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
                {myReservations.map((reservation, index) => (
                  <tr
                    key={`my-${reservation.id}`}
                    className="table-row my-table-row slide-in-right"
                    ref={addToRefs}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <td className="table-cell">{reservation.table_number}</td>
                    <td className="table-cell">{reservation.capacity}</td>
                    <td className="table-cell">{formatDate(reservation.date)}</td>
                    <td className="table-cell">{reservation.time}</td>
                    <td className="table-cell">
                      <button
                        className="view-table-btn my-reservation-btn"
                        onClick={() => cancelReservation(reservation.id)}
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="all-tables-section">
        <div className="available-tables-header">
          <span className="available-date">{formatDate(selectedDate)}</span>
          <span className="available-time">{selectedTime}</span>
        </div>
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
                  key={table.table_number}
                  className={`table-row slide-in-right ${isReservedByCurrentUser(table.table_number) ? 'my-reservation' : ''}`}
                  ref={addToRefs}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <td className="table-cell">{table.table_number}</td>
                  <td className="table-cell">{table.capacity}</td>
                  <td className="table-cell">
                    <span className={`status-badge status-${table.status}`}>
                      {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <button
                      className={`view-table-btn ${table.status !== 'available' ? 'disabled-btn' : 'book-btn'}`}
                      disabled={table.status !== 'available' || bookingInProgress}
                      onClick={() => handleBookTable(table)}
                      title={table.status !== 'available' ? 'This table is not available' : 'Book this table'}
                    >
                      {table.status === 'available' ? 'Book Table' : 'Not Available'}
                    </button>
                  </td>
                </tr>
              ))}
              {tables.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="table-cell text-center">
                    No tables available. Please try a different date or time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTable && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={handleCloseModal}
          table={selectedTable}
          onConfirmBooking={handleConfirmBooking}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}

      {/* Login Prompt */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </div>
  );
}

export default TableLayout