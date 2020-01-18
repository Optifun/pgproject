module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Transport = require("./Transport");
  const TransportType = require("./TransportType");
  const { pugCompile } = require("../../pug");

  app.get("/editor_transport", async (req, res) => {
    const transport = await new Transport().getAllItems();
    const types = await new TransportType().getAllItems();
    res.send(
      pugCompile(
        path.resolve(projectPath, "editor_transport", "editor_transport.pug"),
        {
          data: { transport, types }
        }
      )
    );
  });

  app.post("/editor_transport/:typeOfFunct/:id", async (req, res) => {
    const { id, typeOfFunct } = req.params;
    const data = req.body;
    let result = false;
    switch (typeOfFunct) {
      case "updateTransport":
        result = await new Transport().update(id, data);
        break;
      case "deleteTransport":
        result = await new Transport().delete(id);
        break;
      case "insertTransport":
        result = await new Transport().insert(data);
        break;
      case "updateType":
        result = await new TransportType().update(id, data);
        break;
      case "deleteType":
        result = await new TransportType().delete(id);
        break;
      case "insertType":
        result = await new TransportType().insert(data);
        break;
    }
    res.send(result);
  });
};
