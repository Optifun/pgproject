const DB = require("../modules/DB");

class RouteTypes extends DB {
  constructor() {
    super();
  }
  query = async () => {
    await this.connect();
    return await this.client.query(`SELECT * FROM public."routeType"`);
  };

  loadData = async () => {
    const dbResponse = await this.query();
    const types = dbResponse.rows || null;
    return types;
  };
}
module.exports = RouteTypes;
