const { request, response } = require("express");
const express = require("express");
const User = require("../Models/User.js");

const router = express.Router();

router.route("/users").get(async (request, response) => {
  const users = await User.find();
  response.send(users);
});

router.route("/create-user").post(async (request, response) => {
  try {
    const { name, email, job } = request.body;
    const user = new User({ name, email, job });
    await user.save();
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({ message: "Server Error" });
  }
});

router
  .route("/edit/:id")
  .get(async (request, response) => {
    try {
      const id = request.params.id;
      const user = await User.findById(id);
      response.status(200).send(user);
    } catch (error) {
      response.status(500).send({ message: "Server Error" });
    }
  })
  .patch(async (request, response) => {
    try {
      const id = request.params.id;
      const { name, email, job } = request.body;
      const user = await User.findById(id);
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (job) {
        user.job = job;
      }
      await user.save();
      response.status(200).send(user);
    } catch (error) {
      response.status(500).send({ message: "Server Error" });
    }
  })
  .delete(async (request, response) => {
    try {
      const id = request.params.id;
      await User.deleteOne({ _id: id });
      response.status(200).send({ message: "User Deleted" });
    } catch (error) {
      response.status(500).send({ message: "Server Error" });
    }
  });

module.exports = router;
