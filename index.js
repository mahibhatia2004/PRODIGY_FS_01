import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

// connecting with db
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listning at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });