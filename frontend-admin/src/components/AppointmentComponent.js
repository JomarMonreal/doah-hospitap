import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentComponent.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/appointments/');
                setAppointments(response.data);
            } catch (err) {
                setError('Error fetching appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleStatusToggle = async (appointmentId, currentStatus) => {
        try {
            await axios.patch(`http://localhost:3001/api/appointments/${appointmentId}`, {
                isDone: !currentStatus
            });
            // Update local state to reflect the new status
            setAppointments(appointments.map((appointment) => 
                appointment._id === appointmentId
                    ? { ...appointment, isDone: !currentStatus }
                    : appointment
            ));
        } catch (err) {
            console.error('Error updating appointment status', err);
            setError('Error updating appointment status');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="appointments-container">
            <h1>Appointments</h1>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="appointments-list">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="appointment-card">
                            <div className="status-toggle">
                                <input
                                    type="checkbox"
                                    checked={appointment.isDone}
                                    onChange={() => handleStatusToggle(appointment._id, appointment.isDone)}
                                />
                            </div>
                            <h2>{appointment.service}</h2>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
                            <p><strong>User ID:</strong> {appointment.userId}</p>
                            <p><strong>Message:</strong> {appointment.message}</p>
                            {appointment.prescription && appointment.prescription.length > 0 && (
                                <p><strong>Prescription:</strong> {appointment.prescription.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Appointments;
