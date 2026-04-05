# Zorvyn_financeDashboard_assignment

#  Finance Dashboard Backend API

##  Overview

This project is a backend system for a Finance Dashboard Application that allows users to manage financial records and view insights through aggregated APIs.

It supports:

* User authentication and role-based access
* Financial record management (CRUD)
* Dashboard analytics (summary, trends, category insights)
* Secure and scalable API design

The system is built using Node.js, Express, and MongoDB.

##  Features

###  Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (RBAC)

###  Roles

* Admin → Full access (create, update, delete records)
* Analyst → Can create and view records
* Viewer → Read-only access


###  Financial Records Management

* Create records (income/expense)
* View records with filtering
* Update records
* Delete records
* Search records
* Pagination support


###  Dashboard APIs

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Monthly trends
* Recent activity


##  Project Structure

finance-dashboard/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
└── .env

finance-dashboard/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── recordController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Record.js
│
├── routes/
│   ├── userRoutes.js
│   └── recordRoutes.js
│
├── app.js
├── .env
└── package.json

##  Setup Instructions

###  Clone the Repository


git clone <your-repo-url>
cd finance-dashboard


###  Install Dependencies


npm install



###  Setup Environment Variables

Create a `.env` file:


MONGO_URI=mongodb://127.0.0.1:27017/financeDB
JWT_SECRET=your_secret_key




###  Run the Server


node app.js


Server will run at:

http://localhost:5000


##  API Endpoints

###  User APIs

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | /api/users/register | Register new user   |
| POST   | /api/users/login    | Login and get token |



###  Record APIs

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| POST   | /api/records     | Create record                          |
| GET    | /api/records     | Get records (filter/search/pagination) |
| PUT    | /api/records/:id | Update record                          |
| DELETE | /api/records/:id | Delete record                          |



###  Dashboard APIs

| Method | Endpoint                     | Description       |
| ------ | ---------------------------- | ----------------- |
| GET    | /api/records/summary         | Financial summary |
| GET    | /api/records/category-totals | Category insights |
| GET    | /api/records/monthly-trends  | Monthly trends    |
| GET    | /api/records/recent          | Recent activity   |



##  Authentication Usage

All protected APIs require a token:
Authorization: Bearer <your_token>



##  Assumptions Made

* Each record belongs to a single user
* Only admins can update/delete records
* Data is stored in MongoDB
* Token expiry is set to 1 day
* Dates are provided in valid ISO format



##  Tradeoffs Considered

* Used MongoDB (flexible schema) instead of relational DB
* Kept validation simple (manual checks instead of libraries)
* Aggregations handled at DB level for performance
* No frontend included (backend-focused implementation)



##  Security Features

* Password hashing using bcrypt
* JWT authentication
* Role-based access control
* Protected routes using middleware



##  Optional Enhancements (Future Scope)

* Frontend dashboard (React)
* Graph visualization
* Advanced analytics
* Email notifications
* Soft delete functionality
* Rate limiting



##  Conclusion

This project demonstrates:

* Clean backend architecture
* Secure API design
* Real-world financial data handling
* Scalable and maintainable code structure



##  Author

Developed as part of a backend assignment/project.

