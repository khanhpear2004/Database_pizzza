const sql = require('mssql');

// Cấu hình kết nối SQL Server
const config = {
  user: 'sa',                      // Tên người dùng SQL Server
  password: 'TrunTrun_TramCam3004',       // Mật khẩu người dùng
  server: 'truntrun.ddns.net',   // IP hoặc hostname của SQL Server
  database: 'TUANEMTRAMTINH',  // Tên cơ sở dữ liệu
  options: {
    encrypt: false,                // Đặt false nếu không dùng SSL
    trustServerCertificate: true,  // Bypass SSL nếu không dùng chứng chỉ
  },
  requestTimeout: 50000 // 5 phút (tính bằng ms)
};

module.exports = {sql,config}

// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mysql.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "Thanhphat2408",
//     database: "restaurant",
// });

// export default pool;
