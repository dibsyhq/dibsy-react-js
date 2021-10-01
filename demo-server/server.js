const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// This is your test secret API key.
const DIBSY_SECERT_API = process.env.DIBSY_SECERT_API;
const PORT = process.env.PORT || 4545;
const DIBSY_API_ENDPOINT = process.env.DIBSY_API_ENDPOINT;

app.use(express.static("."));
app.use(express.json());
app.use(cors());
app.options("*", cors());

// initiate payment
app.post("/init-payment", async (req, res) => {
  // get the amount from product id (req.body.productId) & add a simple description
  // for now I made static
  const amount = 50;
  const description = "Payment for Iphone 7 Gold";
  try {
    // Create a Payment with the order amount and currency
    const payment_response = await axios.post(
      `${DIBSY_API_ENDPOINT}/payments`,
      { amount, description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${DIBSY_SECERT_API}`,
        },
      }
    );
    //send the result
    res.send(payment_response.data);
  } catch (error) {
    console.log(error);
    //send the result
    res.status(400);
    res.send({
      message: "There was an error while trying to create payment",
    });
  }
});

// start the server
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
