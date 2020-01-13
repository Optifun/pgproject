const DB = require("../modules/DB");

class Routes extends DB {
  constructor() {
    super();
  }
  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM named_route`;
    if (args && args.length > 0) {
      let count = args.length;
      qstring += " WHERE ";

      if (args.startPoint) {
        qstring += `begin_point=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }

      if (args.endPoint) {
        qstring += `end_point=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }
      if (args.startTime) {
        qstring += `start_time=${startPoint}`;
        count--;
        qstring += count > 0 ? "AND " : "";
      }
      if (args.endTime) {
        qstring += `arrive_time=${startPoint}`;
      }
    }
    return await this.client.query(qstring);
  };

  loadData = async args => {
    const dbResponse = await this.query(args);
    const routes = dbResponse.rows || null;
    return routes;
  };
}
module.exports = Routes;
