import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
import { useNavigate } from 'react-router-dom';

dotenv.config();

const pool = mysql2.createPool({
    host: '10.161.135.5',
    port: 3306,
    user: 'root',
    password: 'suhanimahi',
    database: 'athelink',
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ DB Connected Successfully!");
        connection.release();
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        throw error;
    }
};

export { pool, checkConnection };
