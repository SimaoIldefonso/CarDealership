# Car Dealership

Welcome to the **Car Dealership** project! This is a responsive web application built using **React** that allows users to browse, filter, and view details of available cars. The app connects to a **MongoDB** database to fetch car data, including details like brand, model, year, price, mileage, fuel type, horsepower, and more.

## Features

- **Car Listing**: Displays a list of cars available for purchase.
- **Filters**: Users can filter cars by brand, price, year, mileage, fuel type, color, and horsepower range.
- **Car Details Page**: Displays detailed information about each car, including multiple images and specifications.
- **Carousel**: Home page includes a carousel displaying featured cars.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries**: 
  - `rc-slider` for price range sliders
  - `react-router-dom` for routing
  - `mongoose` for database interaction
  - `axios` for HTTP requests

## Setup Instructions

To run the project locally, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/SimaoIldefonso/CarDealership.git
   cd car-dealership
    ```
2. Install the required dependencies:

   ```bash
   npm install
    ```
3. Start the server with two consoles:
```bash
node server.js
```
```bash
npm start
```

## Future Improvements
- Admin Panel: Add a feature for dealership admins to manage car listings.
- User Authentication: Implement user login to save favorite cars.
- Enhanced Filters: Add more advanced filters like transmission type and seating capacity.
