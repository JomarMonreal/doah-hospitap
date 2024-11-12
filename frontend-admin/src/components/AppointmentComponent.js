import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentComponent.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newPrescription, setNewPrescription] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('https://doah-backend.vercel.app/api/appointments/');
                const result = []
                for (const appointment of response.data) {
                    const user = await axios.get('https://doah-backend.vercel.app/api/user/' + appointment.userId)
                    result.push({...appointment, username: user.data.name })
                }
                setAppointments(result);
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
            await axios.patch(`https://doah-backend.vercel.app/api/appointments/${appointmentId}`, {
                isDone: !currentStatus
            });
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

    const handleDelete = async (appointmentId) => {
        try {
            await axios.delete(`https://doah-backend.vercel.app/api/appointments/${appointmentId}`);
            setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
        } catch (err) {
            console.error('Error deleting appointment', err);
            setError('Error deleting appointment');
        }
    };

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPrescription('');
    };

    const handleAddPrescription = async () => {
        if (!newPrescription) return;

        try {
            await axios.patch(`https://doah-backend.vercel.app/api/appointments/${selectedAppointment._id}`, {
                prescription: [...selectedAppointment.prescription, newPrescription]
            });
            setAppointments(appointments.map((appointment) => 
                appointment._id === selectedAppointment._id
                    ? { ...appointment, prescription: [...appointment.prescription, newPrescription] }
                    : appointment
            ));
            closeModal();
        } catch (err) {
            console.error('Error adding prescription', err);
            setError('Error adding prescription');
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
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(appointment._id)}
                                >
                                    X
                                </button>
                            </div>
                            <h2>{appointment.service}</h2>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
                            <p><strong>Patient:</strong> {appointment.username}</p>
                            <p><strong>Message:</strong> {appointment.message}</p>
                            {appointment.prescription && appointment.prescription.length > 0 && (
                                <p><strong>Prescription:</strong> {appointment.prescription.join(', ')}</p>
                            )}
                            <button 
                                className="add-prescription-button" 
                                onClick={() => openModal(appointment)}
                            >
                                Add Prescription
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Prescription</h2>
                        <input 
                            type="text"
                            placeholder="Enter prescription"
                            value={newPrescription}
                            onChange={(e) => setNewPrescription(e.target.value)}
                        />
                        <button onClick={handleAddPrescription}>Add</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
