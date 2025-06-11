// ✅ Load environment variables first
require("dotenv").config();

// ✅ Then import other modules that rely on environment variables
const connect = require('./configs/db');
const app = require('./index');
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connect();
        console.log("Connected to the database successfully");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});
