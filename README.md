# Backend API Documentation

## User Endpoints

### `/api/users/signup`

- **Method:** POST
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

### `/api/users/login`

- **Method:** POST
- **Description:** Authenticates a user.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

### `/api/users/logout`

- **Method:** POST
- **Description:** Logs out the user.
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### `/api/users/checkAuth`

- **Method:** GET
- **Description:** Checks if the user is authenticated.
- **Response:**
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

## Admin Endpoints

### `/api/admins/signup`

- **Method:** POST
- **Description:** Registers a new admin.
- **Request Body:**
  ```json
  {
    "name": "Admin",
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "name": "Admin",
    "email": "admin@example.com",
    "api_key": "123456789"
  }
  ```

### `/api/admins/login`

- **Method:** POST
- **Description:** Authenticates an admin.
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "name": "Admin",
    "email": "admin@example.com"
  }
  ```

### `/api/admins/logout`

- **Method:** POST
- **Description:** Logs out the admin.
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### `/api/admins/checkAuth`

- **Method:** GET
- **Description:** Checks if the admin is authenticated.
- **Response:**
  ```json
  {
    "id": "1",
    "name": "Admin",
    "email": "admin@example.com"
  }
  ```

## Admin Actions Endpoints

### `/api/trains/addTrain`

- **Method:** POST
- **Description:** Adds a new train.
- **Query Parameters:**
  - `api_key` (string, required): The API key of the admin.
- **Request Body:**
  ```json
  {
    "start_station": "Station A",
    "end_station": "Station B",
    "seats_available": 100
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "start_station": "Station A",
    "end_station": "Station B",
    "seats_available": 100,
    "seats_filled": 0
  }
  ```

### `/api/trains/modifyAvailability`

- **Method:** POST
- **Description:** Modifies seat availability for a train.
- **Query Parameters:**
  - `api_key` (string, required): The API key of the admin.
- **Request Body:**
  ```json
  {
    "id": "1",
    "seats_available": 150
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "start_station": "Station A",
    "end_station": "Station B",
    "seats_available": 150,
    "seats_filled": 0
  }
  ```

### `/api/trains/generateApiKey`

- **Method:** POST
- **Description:** Generates a new API key for the admin.
- **Query Parameters:**
  - `api_key` (string, required): The API key of the admin.
- **Response:**
  ```json
  {
    "API_KEY": "987654321"
  }
  ```

## User Actions Endpoints

### `/api/bookings/checkTrains`

- **Method:** POST
- **Description:** Checks train availability between stations.
- **Request Body:**
  ```json
  {
    "start_station": "Station A",
    "end_station": "Station B"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "1",
      "start_station": "Station A",
      "end_station": "Station B",
      "seats_available": 100,
      "seats_filled": 50
    }
  ]
  ```

### `/api/bookings/checkSeatsAvailability`

- **Method:** POST
- **Description:** Checks seat availability for a train.
- **Request Body:**
  ```json
  {
    "trainId": "1"
  }
  ```
- **Response:**
  ```json
  {
    "seats_filled": 50
  }
  ```

### `/api/bookings/bookTickets`

- **Method:** POST
- **Description:** Books tickets for a train.
- **Request Body:**
  ```json
  {
    "trainId": "1"
  }
  ```
- **Response:**
  ```json
  {
    "booking_id": "123456789",
    "user_name": "John Doe",
    "user_email": "john.doe@example.com",
    "start_station": "Station A",
    "end_station": "Station B"
  }
  ```

### `/api/bookings/getBookingDetails`

- **Method:** POST
- **Description:** Retrieves booking details for a booking ID.
- **Request Body:**
  ```json
  {
    "booking_id": "123456789"
  }
  ```
- **Response:**
  ```json
  {
    "booking_id": "123456789",
    "user_name": "John Doe",
    "user_email": "john.doe@example.com",
    "start_station": "Station A",
    "end_station": "Station B"
  }
  ```



