const mongoose = require("mongoose");
const chalk = require("chalk");

if (process.env.ENVIRONMENT === "development") {
    mongoose.set("autoCreate", true);
}

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);
mongoose.connection.on("connected", () => {
    console.log(chalk.green("✓"), `Welcome Developer connection establish successfully`);
});

// If the connection throws an error
mongoose.connection.on("error", error => {
    console.log(chalk.red("X"), "Mongoose default connection error: ", error);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
    console.log(chalk.red("-X-"), "Mongoose default connection disconnected");
});
