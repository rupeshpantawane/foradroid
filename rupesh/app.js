require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require('express-fileupload');

// const i18n = require("i18n");

//Custome Plugins
const config = require("./services/app.service");
const adminRouter = require("./routes/admin.router");
const baseRouter = require("./routes/base.router");


// end 

app.use(fileupload());

//ejs Plugin 
app.engine('html', require('ejs').renderFile);
// end

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use('/storage', express.static(__dirname + '/public'));
app.use('/storage', express.static(__dirname + '/storage'));
app.use('/language', express.static(__dirname + '/languages'));

//User Routes
app.use("/api/admin", adminRouter);
app.use("/", baseRouter);
// app.use("/api/chess", chessRouter);

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to MedX API application." });
});

// localization
// i18n.configure({
//   locales: ['th', 'en'],
//   directory: __dirname + '/languages',
//   defaultLocale: "en"
// });
// app.use(i18n.init);

// set port, listen for requests
// const PORT = process.env.APP_PORT;

const PORT = process.env.PORT || config["port"];
let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
