module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Users = require("./Users");
  const { pugCompile } = require("../pug");

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

  app.post("/editor_transport/:typeOfFunct/:id", async (req, res) => {
    const { id } = req.params;
    const data = await new Users().getAllItems();
  });
};
