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
  app.get("/order/", async (req, res) => {
    let routeTypes = await new TransportTypes().getAllItems();
    let endPoints = await new EndPoints().getAllItems();
    let startPoints = endPoints;
    let filter = req.query;
    let entries = Object.entries(filter);
    filter = {};
    console.log(entries);
    let options = "";
    if (entries.length > 0) {
      entries.forEach((val, index) => {
        if (val[1] != "") filter[val[0]] = parseInt(val[1]);
      });
      options = Object.keys(filter).reduce((str, val) => {
        return str + val + " ";
      }, "");
    }
    let found = await new Routes().loadData(filter);
    found.forEach((value, index) => {
      value.time_start = Format(new Date(value.time_start));
      value.time_arrive = Format(new Date(value.time_arrive));
    });
    console.log(filter);
    res.send(
      pugCompile(
        path.resolve(projectPath, "order_ticket", "order_ticket.pug"),
        {
          data: {
            startPoints,
            endPoints,
            routeTypes,
            found
          },
          filter: { ...filter, options }
        }
      )
    );
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
