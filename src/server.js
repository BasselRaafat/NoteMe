const { app } = require("./app");
const { connectDB } = require("./db");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

app.listen(PORT, () => {
	connectDB();
	console.log(`http://localhost:${PORT}`);
});
