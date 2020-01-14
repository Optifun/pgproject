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

  insert = async usr => {
    await this.connect();
    const response = await this.client.query(
      `INSERT INTO public.users 
      fio, login, password 
      VALUES(${usr.fio}, ${usr.login}, ${usr.password})`
    );
  };

  update = async usr => {
    await this.connect();
    if (usr) {
      let response = await this.client.query(
        `UPDATE public.users 
        SET login=${usr.login}, 
        password=${usr.password}, 
        fio=${usr.fio} 
        WHERE id=${parseInt(id)}`
      );
    }
  };

  deleteByID = async id => {
    await this.connect();
    if (id && parseInt(id) > 0)
      await this.client.query(
        `DELETE FROM public.users WHERE id=${parseInt(id)}`
      );
  };
}
module.exports = Users;
