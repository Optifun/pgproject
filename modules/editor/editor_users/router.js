module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Users = require("./Users");
  const { pugCompile } = require("../../pug");

  app.get("/editor_users", async (req, res) => {
    const data = await new Users().getAllItems();
    res.send(
      pugCompile(
        path.resolve(projectPath, "editor_users", "editor_users.pug"),
        {
          data
        }
      )
    );
  });

  app.post("/editor_users/:typeOfFunct/:id", async (req, res) => {
    const { id, typeOfFunct } = req.params;
    const data = req.body;
    let result = false;
    switch (typeOfFunct) {
      case "update":
        result = await new Users().update(id, data);
        break;
      case "delete":
        result = await new Users().delete(id);
        break;
      case "insert":
        result = await new Users().insert(data);
        break;
    }
    res.send(result);
  });
};
