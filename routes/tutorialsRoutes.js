module.exports = app => {
    const tutorials = require("../controllers/tutorialsController");
    const auth = require("../middleware/auth");

    const router = require("express").Router();
  
    router.post("/", auth, tutorials.create);
  
    router.get("/", tutorials.findAll);
  
    router.get("/:id", tutorials.findOne);
  
    router.put("/:id", auth, tutorials.update);
  
    router.delete("/:id", auth, tutorials.delete);
  
    router.delete("/", auth, tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };