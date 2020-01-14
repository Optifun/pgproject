module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const EndPoints = require("./EndPoints");
  const { pugCompile } = require("../pug");

  app.get("/editor_endpoints", async (req, res) => {
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
};
