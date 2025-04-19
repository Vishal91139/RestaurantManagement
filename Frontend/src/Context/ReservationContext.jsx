import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
    const [tables, setTables] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, token } = useAuth();

    const BACKEND_URL = 'http://localhost:5001';

    // Fetch tables
    const fetchTables = useCallback(async (date, time) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${BACKEND_URL}/api/reservations/tables`;
            if (date && time) {
                url += `?date=${date}&time=${time}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch tables');
            }
            
            const data = await response.json();
            setTables(data);
            return data;
        } catch (err) {
            console.error('Error fetching tables:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch user reservations
    const fetchReservations = useCallback(async () => {
        if (!isAuthenticated || !token) return;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            
            const data = await response.json();
            setReservations(data);
            return data;
        } catch (err) {
            console.error('Error fetching reservations:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    // Create a reservation
    const createReservation = useCallback(async (reservationData) => {
        if (!isAuthenticated || !token) return null;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return data.reservationId;
        } catch (err) {
            console.error('Error creating reservation:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Update a reservation
    const updateReservation = useCallback(async (reservationId, reservationData) => {
        if (!isAuthenticated || !token) return false;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return true;
        } catch (err) {
            console.error('Error updating reservation:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Cancel a reservation
    const cancelReservation = useCallback(async (reservationId) => {
        if (!isAuthenticated || !token) return false;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to cancel reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return true;
        } catch (err) {
            console.error('Error cancelling reservation:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Load reservations when auth state changes
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchReservations();
        } else {
            setReservations([]);
        }
    }, [isAuthenticated, token, fetchReservations]);

    return (
        <ReservationContext.Provider value={{
            tables,
            reservations,
            loading,
            error,
            fetchTables,
            fetchReservations,
            createReservation,
            updateReservation,
            cancelReservation
        }}>
            {children}
        </ReservationContext.Provider>
    );
}

export const useReservation = () => useContext(ReservationContext);
