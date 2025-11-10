import {useState} from 'react'
import {parkingApi} from '../services/parkingApi.ts'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import {printTicket} from '../utils/printTicket'

const CheckIn = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!plateNumber.trim()) {
            setErrorMessage('Please enter a plate number');
            return
        }

        if (!vehicleType) {
            setErrorMessage('Please select vehicle type');
            return
        }

        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const result = await parkingApi.checkIn(plateNumber.replace(/\s/g, '').trim(), vehicleType);

            if (result.status === 'CHECKED_IN') {
                setSuccessMessage(`Vehicle ${plateNumber} checked in successfully!`);

                printTicket({
                    vehiclePlateNumber: plateNumber,
                    vehicleType: vehicleType,
                    ticketId: result.data?.ticketId,
                    checkInTime: result.data?.checkInTime,
                    ratePerHour: result.data?.ratePerHour
                })

                setPlateNumber('');
                setVehicleType('');
            } else {
                setErrorMessage(result.message || 'Vehicle is already in parking area');
            }
        } catch (error) {
            setErrorMessage('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <Card title="Vehicle Check-In">
                        <form onSubmit={handleSubmit}>
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

                            <div className="mb-4">
                                <label htmlFor="vehicleType" className="form-label fs-5 fw-semibold">
                                    Vehicle Type:
                                </label>
                                <select
                                    id="vehicleType"
                                    value={vehicleType}
                                    onChange={(e) => setVehicleType(e.target.value)}
                                    disabled={isLoading}
                                    className="form-select form-select-lg"
                                >
                                    <option value="">Select vehicle type</option>
                                    <option value="MOTORCYCLE">Motorcycle</option>
                                    <option value="CAR">Car</option>
                                    <option value="TRUCK">Truck</option>
                                </select>
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Cetak Tiket'}
                            </Button>
                        </form>

                        {successMessage && (
                            <div className="alert alert-success mt-4 fw-semibold">{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger mt-4 fw-semibold">{errorMessage}</div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CheckIn;