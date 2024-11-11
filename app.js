if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const PORT = process.env.PORT || 3000;

const express = require("express");
const upload = require("./routes/upload");
const app = express();
// const config = require("./configs/config");
// require("dotenv").config();
// const port = config.port;

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.use("/api/v1", upload);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});