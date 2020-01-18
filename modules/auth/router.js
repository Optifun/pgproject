module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const { pugCompile } = require("../pug");

  app.get("/auth", async (req, res) => {
    res.send(pugCompile(path.resolve(projectPath, "auth", "auth.pug"), {}));
  });

  /*
  app.post("/editor_routes/:typeOfFunct/:id", async (req, res) => {
    const { id, typeOfFunct } = req.params;
    const data = req.body;
    let result = false;
    console.log(data);
    switch (typeOfFunct) {
      case "update":
        result = await new Routes().update(id, data);
        break;
      case "delete":
        result = await new Routes().delete(id);
        break;
      case "insert":
        result = await new Routes().insert(data);
        break;
    }
    res.send(result);
  });
  */
};
