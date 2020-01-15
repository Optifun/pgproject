module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const EndPoints = require("./EndPoints");
  const { pugCompile } = require("../pug");

  app.get("/editor_points", async (req, res) => {
    const data = await new EndPoints().getAllItems();

    res.send(
      pugCompile(
        path.resolve(projectPath, "editor_endpoints", "editor_endpoints.pug"),
        {
          data
        }
      )
    );
  });

  app.post("/editor_points/:typeOfFunct/:id", async (req, res) => {
    const { id, typeOfFunct } = req.params;
    const data = req.body;
    let result = false;
    switch (typeOfFunct) {
      case "update":
        result = await new EndPoints().update(id, data);
        break;
      case "delete":
        result = await new EndPoints().delete(id);
        break;
      case "insert":
        result = await new EndPoints().insert(data);
        break;
    }
    res.send(result);
  });
};
