# Railway Management System

## Before running this script, ensure you have installed dependencies and started the server.
## Run the following commands:
```
## npm install
## node server.js
```

## User Registration

### To register a user, you can use the following command:
```
curl -X POST http://localhost:3000/api/add_user \
-H "Content-Type: application/json" \
-d '{
  "email": "example@example.com",
  "password": "examplepassword",
  "roles": ["admin"],
  "secretKey": "your-secret-key"
}'
```
### For example:
```
curl --location 'http://localhost:3000/api/add_user' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "abc@example.com",
  "password": "1111",
  "roles": ["admin","user"],
  "secretKey": "123"
}'
```
### If the user is not an admin, leave the `secretKey` empty.

## Authentication

### To authenticate a user, use the following command:
```
curl -X POST http://localhost:3000/api/auth_check \
-H "Content-Type: application/json" \
-d '{
  "email": "example@example.com",
  "password": "examplepassword",
  "secretKey": "your-secret-key"
}'
```
### For example (admin):
```
curl --location 'http://localhost:3000/api/auth_check' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "raj@hello.com",
  "password": "12345678",
  "secretKey":"22446688"
}'
```
### For example (user):
```
curl --location 'http://localhost:3000/api/auth_check' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "raj1@hello.com",
  "password": "12345678",
  "secretKey":""
}'
```
## Train Management

### Adding a Train

#### To add a train, use the following command:
```
curl -X POST http://localhost:3000/add_train \
-H "Content-Type: application/json" \
-H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBoZWxsby5jb20iLCJyb2xlcyI6IltcImFkbWluXCIsXCJ1c2VyXCJdIiwiaWF0IjoxNzE0MzUzNDc0LCJleHAiOjE3MTQzNTcwNzR9.HigKNIWH_g2fpkA_1W1zX3dnZcM45Nbev21f71U0Vl8" \
-d '{
  "name": "Express Train",
  "source": "Station A",
  "destination": "Station B",
  "stations": ["Station A", "Station B", "Station C"],
  "departureTime": "2024-04-30T08:00:00Z",
  "totalSeats": 100,
  "bookedSeats": 0
}'
```
#### For example:
```
curl --location 'http://localhost:3000/api/add_train' \
--header 'Content-Type: application/json' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBoZWxsby5jb20iLCJyb2xlcyI6IltcImFkbWluXCIsXCJ1c2VyXCJdIiwiaWF0IjoxNzE0MzUzNDc0LCJleHAiOjE3MTQzNTcwNzR9.HigKNIWH_g2fpkA_1W1zX3dnZcM45Nbev21f71U0Vl8' \
--data '{
  "name": "Express Train3",
  "source": "Station A",
  "destination": "Station B",
  "stations": ["Station A", "Station B", "Station C"],
  "departureTime": "2024-04-30T08:00:00Z",
  "totalSeats": 100,
  "bookedSeats": 0
}'
```
### Fetching Trains

#### To fetch available trains between two stations, use the following command:
```
curl -X POST http://localhost:3000/fetch_train \
-H "Content-Type: application/json" \
-H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBoZWxsby5jb20iLCJyb2xlcyI6IltcImFkbWluXCIsXCJ1c2VyXCJdIiwiaWF0IjoxNzE0MzUzNDc0LCJleHAiOjE3MTQzNTcwNzR9.HigKNIWH_g2fpkA_1W1zX3dnZcM45Nbev21f71U0Vl8" \
-d '{
  "source": "Station A",
  "destination": "Station B"
}'
```
#### For example:
```
curl --location 'http://localhost:3000/api/fetch_train' \
--header 'Content-Type: application/json' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBoZWxsby5jb20iLCJyb2xlcyI6IltcImFkbWluXCIsXCJ1c2VyXCJdIiwiaWF0IjoxNzE0MzUzNDc0LCJleHAiOjE3MTQzNTcwNzR9.HigKNIWH_g2fpkA_1W1zX3dnZcM45Nbev21f71U0Vl8' \
--data '{
  "source": "Station A",
  "destination": "Station B"
}'
```
### Booking a Seat

#### To book a seat on a train, use the following command:
```
curl -X POST http://localhost:3000/book_seat \
-H "Content-Type: application/json" \
-d '{
  "id": "TRAIN_ID_HERE",
  "userId": "USER_ID_HERE"
}'
```
#### For example:
```
curl --location 'http://localhost:3000/api/book_seat' \
--header 'Content-Type: application/json' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBoZWxsby5jb20iLCJyb2xlcyI6IltcImFkbWluXCIsXCJ1c2VyXCJdIiwiaWF0IjoxNzE0MzUzNDc0LCJleHAiOjE3MTQzNTcwNzR9.HigKNIWH_g2fpkA_1W1zX3dnZcM45Nbev21f71U0Vl8' \
--data '{
  "id": 1,
  "userId": 1
}'
```

### Get Specific Booking Details

#### ### Get Specific Booking Details

#### There are no specific criteria mentioned in the problem statement, and I have not implemented 
#### this feature. The Requirement overlaps with the "Booking a Seat". If specific booking details #### are required, please provide the necessary criteria, and I can implement it accordingly. Feel free to reach out with any requirements.
