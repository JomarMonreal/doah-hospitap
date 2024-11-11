import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentComponent.css'; // Import the CSS file

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
                            <h2>{appointment.service}</h2>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
                            <p><strong>User ID:</strong> {appointment.userId}</p>
                            <p><strong>Message:</strong> {appointment.message}</p>
                            <p><strong>Status:</strong> {appointment.isDone ? 'Completed' : 'Pending'}</p>
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
