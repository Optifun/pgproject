module.exports = app => {
  const moment = require("moment");
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Routes = require("../Routes");
  const Points = require("../editor_endpoints/EndPoints");
  const Transport = require("../editor_transport/Transport");
  const TransportType = require("../editor_transport/TransportType");
  const { pugCompile } = require("../pug");
  const { formatDate, formatTime } = require("../DateFormates");

  Date.prototype.today = formatDate;
  Date.prototype.timeNow = formatTime;

  const FormatDate = datetime => {
    let split = datetime.indexOf(" ");
    let date = new Date(datetime);
    date.formatDate = formatDate;
    date.formatTime = formatTime;
    return `${date.formatDate()}T${date.formatTime()}`;
  };

  app.get("/editor_routes", async (req, res) => {
    const routes = await new Routes().getAllItems();
    routes.forEach((val, index, routes) => {
      val.time_start = FormatDate(val.time_start);
      val.time_arrive = FormatDate(val.time_arrive);
    });

    console.log(routes);
    const points = await new Points().getAllItems();
    const transport = await new Transport().getAllItems();
    const types = await new TransportType().getAllItems();
    let date = new Date().today();
    let time = new Date().timeNow();
    res.send(
      pugCompile(
        path.resolve(projectPath, "editor_routes", "editor_routes.pug"),
        {
          data: {
            routes,
            points,
            transport,
            types,
            date,
            time
          }
        }
      )
    );
  });

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
};
