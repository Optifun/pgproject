const DB = require("../modules/DB");

class EndPoints extends DB {
  constructor() {
    super();
  }
  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM public."endPoint"`;
    if (args && args.except) qstring += ` WHERE ep_name=${args.except}`;
    return await this.client.query(qstring);
  };

  loadData = async args => {
    const dbResponse = await this.query(args);
    const points = dbResponse.rows || null;
    return points;
  };
}
module.exports = EndPoints;
