const DB = require("../modules/DB");

class RouteTicketView extends DB {
  constructor() {
    super();
  }
  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM public."routeTicket"`;
    return await this.client.query(qstring);
  };

  loadData = async args => {
    const dbResponse = await this.query();
    const types = dbResponse.rows || null;
    return types;
  };
}
module.exports = RouteTicketView;
