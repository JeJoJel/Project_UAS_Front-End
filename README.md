Project UAS Semester 3

========================================================================================

Tiap bikin pages / file baru yang wajib di import: (Pathnya sesuain sendiri)

URUTAN WAJIB CSS-ANGULAR-SERVICE-CONTROLLER

ICON WEBSITE 
<link rel="icon" href="../../assets/components/icon/icon.png" type="image/png"/>
CSS
<link rel="stylesheet" href="../style/register.css">
ANGULAR
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
SERVICE
<script src="../auth/auth.service.js"></script>
CONTROLLER
<script src="../controller/register.controller.js"></script>    


========================================================================================

ALUR SINGKAT FRONTEND-BACKEND

Frontend (HTML/AngularJS):
Pengguna memasukkan data → Controller AngularJS → Service AngularJS.

Backend (Node.js):
Router menerima data dari service → Controller memproses → Validasi data di middleware.

Database (MongoDB):
Controller menyimpan data ke MongoDB menggunakan model.

Respons:
MongoDB → Controller backend → Router → Service AngularJS → View (tampilan hasil di HTML).

========================================================================================

Flow Frontend hingga Backend
HTML (User Input)

- Pengguna mengisi data pada form HTML yang terhubung dengan AngularJS melalui ng-model.
- Data input akan terikat secara two-way binding dengan variabel di AngularJS (controller).
CONTOH:
<form ng-submit="register()">
    <input type="text" ng-model="user.username" placeholder="Username" required>
    <input type="email" ng-model="user.email" placeholder="Email" required>
    <input type="password" ng-model="user.password" placeholder="Password" required>
    <button type="submit">Register</button>
</form>

========================================================================================

Controller AngularJS

- Controller AngularJS menerima data dari view (HTML) melalui ng-model.
- Data ini diproses (jika perlu validasi di frontend) lalu diteruskan ke service AngularJS untuk dikirim ke backend.
CONTOH:
app.controller('RegisterController', function($scope, AuthService) {
    $scope.user = {}; // Variabel yang terikat ke form

    $scope.register = function() {
        if ($scope.user.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Kirim data ke AuthService untuk diteruskan ke backend
        AuthService.register($scope.user)
        .then(response => {
            alert('Registration successful!');
        })
        .catch(error => {
            alert('Error: ' + error.data.message);
        });
    };
});

========================================================================================

Service AngularJS

- Service AngularJS bertugas mengirimkan data ke backend menggunakan $http (HTTP request).
- Biasanya service berisi endpoint API yang menghubungkan AngularJS dengan server Node.js.

Contoh Service:
app.service('AuthService', function($http) {
    const baseUrl = 'http://localhost:3000/api/auth';

    this.register = function(user) {
        return $http.post(`${baseUrl}/register`, user); // Mengirim data ke backend
    };
});

========================================================================================

Router Backend (Node.js)

- Data yang dikirimkan oleh AngularJS diterima oleh backend melalui route (misalnya, /api/auth/register).
- Router meneruskan permintaan ke controller backend untuk diproses.

Contoh Router (Express.js):
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute untuk registrasi
router.post('/register', authController.register);

module.exports = router;


========================================================================================

Controller Backend

- Controller backend bertanggung jawab untuk menerima data dari router dan menjalankan logika bisnis.
- Biasanya, controller memvalidasi data, memanggil middleware, atau berinteraksi dengan database (MongoDB).

Contoh Controller:
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi data
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Simpan pengguna ke database
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

========================================================================================

Model MongoDB

- Data dari controller disimpan di MongoDB melalui model yang mendefinisikan struktur data menggunakan Mongoose.
- Contoh Model (Mongoose):

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);


========================================================================================

Middleware (Opsional)

- Middleware digunakan untuk logika tambahan, seperti autentikasi, logging, atau validasi request sebelum masuk ke controller.
- Contoh penggunaan: validasi token JWT, hashing password.

Contoh Middleware (Hashing Password):
const bcrypt = require('bcrypt');

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


========================================================================================

Database (MongoDB)

Setelah validasi dan proses lainnya selesai, data disimpan ke MongoDB.
MongoDB adalah database NoSQL yang menyimpan data dalam format JSON-like.
Contoh Data di MongoDB:

{
    "_id": "648c9a0d98abf3c123456789",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "$2b$10$hashedpassword"
}

========================================================================================

Response ke Frontend

Setelah data berhasil disimpan, server memberikan respons ke frontend (AngularJS).
Respons ini bisa berupa pesan sukses, error, atau data yang diminta.
Contoh Response:

res.status(201).json({ message: 'User registered successfully' });

AuthService.register($scope.user)
.then(response => {
    alert(response.data.message); // Menampilkan pesan sukses
})
.catch(error => {
    alert('Error: ' + error.data.message); // Menampilkan pesan error
});