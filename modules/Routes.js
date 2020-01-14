const DB = require("../modules/DB");

class Routes extends DB {
  constructor() {
    super();
  }

  getAllItems = async args => {
    await this.connect();
    let qstring = `SELECT * FROM named_route`;
    return await this.client.query(qstring);
  };

  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM named_route`;
    if (args && args.length > 0) {
      let count = args.length;
      qstring += " WHERE ";

      if (args.startPoint) {
        qstring += `point_begin=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }

      if (args.endPoint) {
        qstring += `point_end=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }
      if (args.startTime) {
        qstring += `time_start>=${startPoint}`;
        count--;
        qstring += count > 0 ? "AND " : "";
      }
      if (args.endTime) {
        qstring += `time_arrive<=${startPoint}`;
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
