module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const { pugCompile } = require("../pug");

  const Routes = require("../Routes");
  const TransportTypes = require("../editor_transport/TransportType");
  const EndPoints = require("../editor_endpoints/EndPoints");

  //меню заказа билетов
  app.get("/order", async (req, res) => {
    let routeTypes = await new TransportTypes().getAllItems();
    let endPoints = await new EndPoints().getAllItems();
    let found = await new Routes().loadData();
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
};
