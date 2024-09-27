const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
