import config from "config"
import express from "express"
import mongoose from "mongoose"
import router from "./routes/sale.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || config.get("port") || 5000

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));
// app.get("/", (req, res) => {
//   res.end("<div><ul><li><a href='/'>Home</a></li><li><a href='/about'>About</a></li></ul><h1>Home page</h1></div>")
// })
//
// app.get("/about", (req, res) => {
//   res.end("<div><ul><li><a href='/'>Home</a></li><li><a href='/about'>About</a></li></ul><h1>About page</h1></div>")
// })
//
// app.use("/", router)



async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {

    })
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start()