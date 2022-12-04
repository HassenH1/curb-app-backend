import mongoose from "mongoose";

const connectionString = process.env.CONNECTION_URI || "localhost";

mongoose.connect(connectionString);

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to successfully`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose error: ", err);
});
