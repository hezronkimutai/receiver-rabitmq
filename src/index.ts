import express from "express";
import RabitMq from "./services/rabitMq";
import firebase from "./services/firebase";
import * as dotenv from "dotenv";
import * as uuid from "uuid";

dotenv.config();
const database = firebase.database();
const writeUserData = (id: any, data: any) => {
  database.ref("/" + id).set(data);
};
const PORT = process.env.port || 3001;

const app = express();
app.get("/", (req, res) => {
  RabitMq("codingtest", "receive", null, (value: any) => {
    const id: string = uuid.v4();
    const data = JSON.parse(JSON.stringify(value));
    console.log(data);
    writeUserData(id, data);
  });
  res.send("RabitMQ Receiver");
});

app.listen(PORT, () => {
  console.log("App listening to port" + PORT);
});
