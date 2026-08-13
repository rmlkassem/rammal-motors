# 🚗 Rammal Motors

Rammal Motors is a full-stack car listing website designed for displaying and managing cars available for sale.

The platform provides a simple public website where customers can browse available cars, view detailed information and photos, filter cars, and contact the seller directly through WhatsApp.

It also includes a protected administration area where the website owner can add, edit, delete, and manage car listings.

---

## 🌐 Website Structure

The project consists of three main parts:

- **Frontend:** React
- **Backend:** Laravel REST API
- **Database:** MySQL

The frontend communicates with the Laravel backend through HTTP API requests. Laravel processes these requests, communicates with the MySQL database, and returns the required data to React as JSON.

Car images are stored externally using ImageKit.

---

## 🛠 Technologies Used

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React
- React Icons

### Backend

- Laravel
- PHP
- Laravel Sanctum
- REST API

### Database

- MySQL
- Aiven for cloud database hosting

### Image Storage

- ImageKit

### Deployment

- Render

---

# 👤 Public Website

The public part of Rammal Motors is designed for customers looking for cars.

## Home Page

The home page introduces Rammal Motors and provides quick access to the available vehicles.

It includes:

- Main navigation
- Hero section
- Car filtering
- Available car listings
- Information about Rammal Motors
- Social media links
- Contact options

---

## Cars Page

The Cars page displays the cars currently available for sale.

Each car card can contain information such as:

- Brand
- Model
- Manufacturing year
- Price
- Mileage
- Main image

Customers can select a car to open its detailed page.

---

## Car Details Page

Each vehicle has its own detailed page.

The page displays:

- Brand
- Model
- Price
- Manufacturing year
- Mileage
- Color
- Transmission type
- Fuel type
- Condition
- Description
- Multiple vehicle images

The image gallery allows users to select different images.

Clicking the main image opens a fullscreen image viewer where the original image can be viewed without cropping.

The fullscreen viewer supports:

- Previous image
- Next image
- Image counter
- Keyboard arrow navigation
- Escape key to close
- Full image display

Customers can also contact the seller directly through WhatsApp from the vehicle page.

---

## About Page

The About page provides information about Rammal Motors and the purpose of the business.

---

## Contact Page

The Contact page provides customers with methods to communicate with Rammal Motors.

The website also integrates WhatsApp to make communication between customers and the seller easier.

---

# 🔎 Car Filtering

Customers can filter available cars according to information such as:

- Brand
- Model
- Year
- Condition

This makes it easier to find vehicles matching their requirements.

---

# 🔐 Administration System

Rammal Motors includes a protected administration area.

The administration pages are not intended for normal customers.

The administrator must log in before accessing the management system.

Laravel Sanctum is used to protect authenticated backend operations.

---

## Admin Dashboard

The administration dashboard allows the website owner to manage the vehicle inventory.

The administrator can:

- View all cars
- Search cars
- Add new cars
- Edit existing cars
- Delete cars
- Upload multiple images
- Delete individual images
- Mark cars as available
- Mark cars as sold

The dashboard also displays information about the number of available and sold vehicles.

---

## Adding Cars

The administrator can create a new vehicle listing and provide information such as:

- Brand
- Model
- Year
- Price
- Mileage
- Color
- Transmission
- Fuel type
- Condition
- Description
- Status
- Multiple images

The images are uploaded to ImageKit while the corresponding image information is stored in the database.

---

## Vehicle Status

Cars can have different statuses.

### Available

Available cars are displayed on the public website.

### Sold

When a vehicle is sold, the administrator can mark it as sold.

Additional information can be recorded, including:

- Sale date
- Commission

Sold vehicles are no longer displayed in the normal public list of available vehicles.

They remain accessible to the administration system for management and analytics.

---

# 📊 Analytics

The administration system includes an analytics section for monitoring the business.

It can use information about:

- Total cars
- Available cars
- Sold cars
- Sales
- Commissions

This allows the website owner to keep track of vehicle activity and business performance.

---

# 🖼 Image Management

Vehicle images are stored using ImageKit instead of storing the actual image files directly inside the application server.

The database stores information associated with each image.

Each car can have multiple images.

The relationship is approximately:

```text
Car
 │
 ├── Image 1
 ├── Image 2
 ├── Image 3
 └── ...
