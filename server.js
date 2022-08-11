const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");


const app = express();

app.use(
  "/mammoth.browser.min.js",
  express.static(
    path.join(__dirname, "node_modules/mammoth/mammoth.browser.min.js")
  )
);
app.use(
  "/axios.min.js",
  express.static(path.join(__dirname, "node_modules", "axios/dist/axios.js"))
);
app.use(express.static("static"));

app.use(fileUpload());
app.post("/upload", (req, res) => {
  const fileName = "/upload/" + Date.now() + ".png";
  const path = __dirname + "/static" + fileName;
  const imgdata = req.body.base64image;

  // to convert base64 format into random filename
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

  fs.writeFileSync(path, base64Data, { encoding: "base64" });

  return res.send({ path: fileName });
});

app.listen(3002, () => {
  console.log("server start at port 3002");
});
