// ✅ Load environment variables first
require("dotenv").config();

// ✅ Then import other modules that rely on environment variables
const connect = require('./configs/db');
const app = require('./index');

// ✅ Use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// ✅ Start the server after establishing DB connection
app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});
