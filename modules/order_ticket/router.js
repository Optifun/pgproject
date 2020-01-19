module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const Routes = require("../Routes");
  const Tickets = require("./Tickets");
  const TransportTypes = require("../editor/editor_transport/TransportType");
  const EndPoints = require("../editor/editor_endpoints/EndPoints");

  const { pugCompile } = require("../pug");
  const { formatDate, formatTime } = require("../DateFormates");

  const Format = date => {
    date.formatDate = formatDate;
    date.formatTime = formatTime;
    return `${date.formatDate()}T${date.formatTime()}`;
  };

  //меню заказа билетов
  app.get("/order", async (req, res) => {
    let routeTypes = await new TransportTypes().getAllItems();
    let endPoints = await new EndPoints().getAllItems();
    let found = await new Routes().loadData();
    found.forEach((value, index) => {
      value.time_start = Format(new Date(value.time_start));
      value.time_arrive = Format(new Date(value.time_arrive));
    });
    let startPoints = endPoints;
    console.log(routeTypes);
    let obj = pugCompile(
      path.resolve(projectPath, "order_ticket", "order_ticket.pug"),
      {
        data: {
          startPoints,
          endPoints,
          routeTypes,
          found
        }
      }
    );
    res.send(obj);
  });

  app.post("/order/:typeOfFunct/", async (req, res) => {
    const { typeOfFunct } = req.params;
    console.log(typeOfFunct);
    const data = req.body;
    data.user_id = req.userData.id;
    console.log(data);
    let result = false;
    switch (typeOfFunct) {
      case "insert":
        result = await new Tickets().insert(data);
        break;
    }
    res.send(result);
  });
};
