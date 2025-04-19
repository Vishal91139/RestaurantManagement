import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, table, onConfirmBooking, selectedDate, selectedTime }) => {
  const [bookingDate, setBookingDate] = useState(selectedDate);
  const [bookingTime, setBookingTime] = useState(selectedTime);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onConfirmBooking({
        table_number: table.table_number,
        capacity: table.capacity,
        date: bookingDate,
        time: bookingTime,
        special_requests: specialRequests
      });
      
      // Reset form
      setSpecialRequests('');
    } catch (error) {
      console.error('Error confirming booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <div className="booking-modal-header">
          <h2>Confirm Your Reservation</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="booking-modal-content">
          <div className="table-info">
            <h3>Table Details</h3>
            <p><span>Table Number:</span> {table.table_number}</p>
            <p><span>Capacity:</span> {table.capacity} people</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="booking-date">Date</label>
              <input
                type="date"
                id="booking-date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="booking-time">Time</label>
              <select
                id="booking-time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
                className="form-control"
              >
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="special-requests">Special Requests (Optional)</label>
              <textarea
                id="special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or dietary requirements?"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            
            <div className="booking-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="confirm-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
