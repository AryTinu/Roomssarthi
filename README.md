# 🏡 Roomsaarthi

A modern MERN-based platform to help **students**, **job seekers**, and **newcomers** easily find **PGs, flats, and rental rooms** in a new city.

This project solves a real problem: finding a comfortable and verified accommodation without running around or falling for fake listings.

Roomsaarthi simplifies house-hunting through a clean UI, reliable backend, cloud-based image storage, and secure communication features.

---

## 🚀 Tech Stack

### **Frontend**

* React.js
* React Router DOM
* Axios
* TailwindCSS / CSS Modules (if used)
* Cloudinary Upload Widget (for client-side uploads)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Nodemailer (Contact system)
* Cloudinary API (Image storage)
* CORS
* Nodemon (Development)

### **Cloud & Storage**

* **Cloudinary** for storing room images
* MongoDB Atlas (Cloud DB)

---

## ✨ Features

### 🔍 **Browse Rooms & PGs**

Users can browse verified room listings with pictures, rent details, location, and all necessary info.

### 🏙️ **Upload Listings**

Owners or agents can add listings with:

* Photos (stored on Cloudinary)
* Description
* Rent
* Address
* Amenities

### 📸 **Cloudinary Integration**

Images are uploaded to Cloudinary directly from the frontend.
Cloudinary returns a secure URL stored in MongoDB.

### 📬 **Contact Owners via Email**

Using **Nodemailer**, users can directly reach out to listing owners.
This ensures secure and easy communication.

### 🔐 **Authentication (Optional)**

Login/Signup using JWT (if implemented).

### 📡 **Fully Responsive UI**

Works perfectly on:

* Mobile
* Tablet
* Desktop

---

## 🧠 MERN Concepts Used

### **1. MongoDB + Mongoose**

* Schema design for rooms, users, bookings
* CRUD operations
* Query filters (location, price, type)

### **2. Express.js**

* REST API development
* Routing
* Middleware (CORS, Error handling, Body parser)

### **3. React (Frontend)**

* Component-based UI
* Routing with **React Router DOM**
* State management using Hooks (useState, useEffect)
* API requests using Axios
* Image previews before upload

### **4. Node.js**

* Backend server
* Handling requests/responses
* Using async/await for database operations

### **5. Cloudinary Storage**

* Cloudinary SDK
* Secure image uploads
* Auto-optimization of images

### **6. Nodemailer**

* SMTP mail transporter
* Sending email notifications to listing owners

---

## 📁 Folder Structure (Sample)

```
Roomsaarthi/
├── roomssarthi/ (Frontend)
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
└── roomssarthi-backend/ (Backend)
    ├── routes/
    ├── models/
    ├── controllers/
    ├── utils/
    └── ...
```

---

## ⚙️ How To Run Locally

### **Frontend**

```
cd roomssarthi
npm install
npm start
```

### **Backend**

```
cd roomssarthi-backend
npm install
npm run dev
```

Make sure you add a **.env** file in the backend:

```
MONGO_URI=your_mongodb_connection
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
CLOUDINARY_CLOUD_NAME=xxxxx
SMTP_USER=email
SMTP_PASS=password
```

---

## 🌥 Deployment

You can deploy on:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway / Cyclic
* **Database:** MongoDB Atlas
* **Images:** Cloudinary

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 📄 License

This project is **open-source** under the MIT License.

---

## ❤️ Made with MERN

A complete solution to finding a room, hassle-free!
