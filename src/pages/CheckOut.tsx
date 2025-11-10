import {useState} from 'react'
import {parkingApi, TicketInfo} from '../services/parkingApi.ts'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import {formatCurrency} from '../utils/formatCurrency'
import {convertMinutesToTime} from "../utils/convertMinutesToTime.ts";

const CheckOut = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetTicket = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!plateNumber.trim()) {
            setErrorMessage('Please enter a plate number');
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        setTicketInfo(null);

        try {
            const result = await parkingApi.getTicket(plateNumber.replace(/\s/g, '').trim());

            if (result.data) {
                setTicketInfo(result.data);
            } else {
                setErrorMessage(result.message || 'Vehicle not found in parking area');
            }
        } catch (error) {
            setErrorMessage('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    }

    const handleTotalDurations = (totalMinutes: number): string => {
        const result = convertMinutesToTime(totalMinutes);
        return `${result.days}days ${result.hours}hours ${result.minutes}min`;
    }

    const handleCheckOut = async () => {
        if (!ticketInfo) return;
        if (!paymentMethod){
            setErrorMessage('Please select a payment method');
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const result = await parkingApi.checkOut(ticketInfo.vehiclePlateNumber, paymentMethod);

            if (result.status === 'CHECKED_OUT') {
                setSuccessMessage(`Vehicle ${ticketInfo.vehiclePlateNumber} checked out successfully!`);
                setTicketInfo(null);
                setPlateNumber('');
            } else {
                setErrorMessage(result.message || 'Error during checkout');
            }
        } catch (error) {
            setErrorMessage('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID');
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <Card title="Vehicle Check-Out">
                        <form onSubmit={handleGetTicket}>
                            <div className="mb-4">
                                <label htmlFor="plateNumber" className="form-label fs-5 fw-semibold">
                                    Vehicle Plate Number:
                                </label>
                                <input
                                    type="text"
                                    id="plateNumber"
                                    value={plateNumber}
                                    onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                                    placeholder="B 1010 A"
                                    disabled={isLoading}
                                    className="form-control form-control-lg"
                                    autoComplete="off"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Cari Tiket'}
                            </Button>
                        </form>

                        {ticketInfo && (
                            <div className="card mt-4 border-danger">
                                <div className="card-header bg-danger text-white">
                                    <h5 className="card-title mb-0 fs-4 fw-bold">Parking Ticket Information</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100">
                                                <strong className="text-muted d-block mb-1">Plate Number:</strong>
                                                <span
                                                    className="fs-5 fw-semibold">{ticketInfo.vehiclePlateNumber}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100">
                                                <strong className="text-muted d-block mb-1">Vehicle Type:</strong>
                                                <span className="fs-5 fw-semibold">{ticketInfo.vehicleType}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100">
                                                <strong className="text-muted d-block mb-1">Check-in Time:</strong>
                                                <span className="fs-6">{formatDateTime(ticketInfo.checkInTime)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100">
                                                <strong className="text-muted d-block mb-1">Check-out Time:</strong>
                                                <span className="fs-6">{formatDateTime(ticketInfo.checkOutTime)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100">
                                                <strong className="text-muted d-block mb-1">Duration:</strong>
                                                <span
                                                    className="fs-5 fw-semibold">{handleTotalDurations(ticketInfo.durationMinutes)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border rounded p-3 h-100 bg-info bg-opacity-10">
                                                <strong className="text-muted d-block mb-1">Total Price:</strong>
                                                <span
                                                    className="fs-4 fw-bold text-info">Rp {formatCurrency(ticketInfo.totalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="mb-4">
                                            <label htmlFor="paymentMethod" className="form-label fs-5 fw-semibold">
                                                Payment Method:
                                            </label>
                                            <select
                                                id="paymentMethod"
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                disabled={isLoading}
                                                className="form-select form-select-lg"
                                            >
                                                <option value="">Select payment method</option>
                                                <option value="CASH">Cash</option>
                                                <option value="CARD">Card</option>
                                            </select>
                                        </div>
                                        <Button
                                            onClick={handleCheckOut}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Check-Out'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {successMessage && (
                            <div className="alert alert-success mt-4 fw-semibold">{successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger mt-4 fw-semibold">
                                {errorMessage}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CheckOut;