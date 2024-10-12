const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const noteRoute = require("./routers/notes");
const accountRoute = require("./routers/account");
const authRouter = require("./routers/auth");

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/account", accountRoute);
app.use("/notes", noteRoute);

app.use((error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Internal Server error";
	res
		.status(statusCode)
		.json({ from: "ErroHandling Middelware", errorMessage: message });
});

app.use("*", (req, res, next) => {
	res.sendStatus(404);
});

module.exports = { app };
