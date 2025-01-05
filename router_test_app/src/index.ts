import express from "express";
import { getRouter } from "the-router";
import "./routes";

const app = express();
app.use(getRouter());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
