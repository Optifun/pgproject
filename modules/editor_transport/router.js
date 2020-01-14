module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Transport = require("./Transport");
  const TransportType = require("./TransportType");
  const { pugCompile } = require("../pug");

  app.get("/editor_transport", async (req, res) => {
    const transport = await new Transport().getAllItems();
    const types = await new TransportType().getAllItems();
    console.log(types);
    res.send(
      pugCompile(
        path.resolve(projectPath, "editor_transport", "editor_transport.pug"),
        {
          data: { transport, types }
        }
      )
    );
  });
};
