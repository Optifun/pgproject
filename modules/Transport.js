const DB = require("DB");

class Transport extends DB {
  constructor() {
    super();
  }
  query = async () => {
    await this.connect();
    return await this.client.query(`SELECT * FROM transport`);
  };

  formArray = async () => {
    const dbResponse = await this.query();
    const transp = dbResponse.rows || null;
    return transp;
  };
}

module.exports = Transport;
