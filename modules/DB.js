const { Client } = require("pg");

class DB {
  connect = async () => {
    this.client = new Client();
    await this.client.connect();
  };    
}
module.exports = DB;
