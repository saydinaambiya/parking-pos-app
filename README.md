# Parking POS App

A React TypeScript application for parking management system with check-in and check-out functionality.

## Features

- Vehicle check-in with plate number and vehicle type
- Ticket printing
- Vehicle check-out with payment calculation
- Bootstrap UI components
- Real-time parking duration and cost calculation

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/saydinaambiya/parking-pos-app.git
cd parking-pos-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file: .env

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://<spring-boot_app_url>/api || http://localhost:8080/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Navbar.tsx
├── pages/
│   ├── CheckIn.tsx
│   └── CheckOut.tsx
├── services/
│   └── api.ts
├── utils/
│   ├── formatCurrency.ts
│   └── printTicket.ts
└── App.tsx
```

## API Endpoints

The application expects the following backend endpoints:

- `POST /api/v1/check-in` - Vehicle check-in
- `GET /api/v1/ticket/{vehiclePlateNumber}` - Get ticket information
- `POST /api/v1/check-out` - Vehicle check-out

## Technologies Used

- React 18
- TypeScript
- Vite
- Bootstrap 5