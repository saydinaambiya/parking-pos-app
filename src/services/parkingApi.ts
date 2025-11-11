export interface TicketInfo {
  ticketId: string,
  vehiclePlateNumber: string,
  vehicleType: string,
  checkInTime: string,
  checkOutTime: string,
  durationMinutes: number,
  totalPrice: number
}

export interface ApiResponse<T = any> {
  status: string,
  message?: string,
  data?: T
}

const API_BASE_URL = 'http://localhost:8080' + '/v1/parking'

export const parkingApi = {
  async checkIn(vehiclePlateNumber: string, vehicleType: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehiclePlateNumber, vehicleType }),
    })
    
    return await response.json();
  },

  async getTicket(vehiclePlateNumber: string): Promise<ApiResponse<TicketInfo>> {
    const response = await fetch(`${API_BASE_URL}/ticket/${vehiclePlateNumber}`);
    return await response.json();
  },

  async checkOut(vehiclePlateNumber: string, paymentMethod: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/check-out`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehiclePlateNumber: vehiclePlateNumber, paymentMethod: paymentMethod }),
    })
    
    return await response.json();
  }
}