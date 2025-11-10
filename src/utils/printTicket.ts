import { formatCurrency } from './formatCurrency'

interface TicketData {
  vehiclePlateNumber: string,
  vehicleType: string,
  ticketId?: string,
  checkInTime?: string,
  ratePerHour?: number
}

export const printTicket = (data: TicketData) => {
  const bodyContent = `
    <div style="font-family: monospace; width: 300px; margin: 0 auto; text-align: left;">
      <h2>PARKING TICKET</h2>
      <hr>
      <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
      <p><strong>Plate Number:</strong> ${data.vehiclePlateNumber}</p>
      <p><strong>Vehicle Type:</strong> ${data.vehicleType}</p>
      <p><strong>Check-in Time:</strong> ${data.checkInTime}</p>
      <hr>
      <p>Please keep this ticket</p>
      <p>Rate: Rp ${formatCurrency(data.ratePerHour || 0)}/hour</p>
    </div>
  `
  
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head><title>Parking Ticket</title></head>
        <body>${bodyContent}</body>
      </html>
    `)
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }
}