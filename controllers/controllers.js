const saySomething = (req, res, next) => {
  console.log("i want data pleas");
  res.status(200).send({
    body: "Hello from the server!",
  });
};

module.exports.saySomething = saySomething;
