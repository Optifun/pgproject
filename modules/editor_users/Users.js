const DB = require("../DB");

class Users extends DB {
  constructor() {
    super();
  }

  getAllItems = async () => {
    await this.connect();
    const response = await this.client.query(
      `SELECT id, login, password, fio FROM public.users`
    );
    return response.rows || null;
  };
}
module.exports = Users;
