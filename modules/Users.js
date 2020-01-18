const DB = require("./DB");

class Users extends DB {
  constructor() {
    super();
  }

  getAllItems = async args => {
    await this.connect();
    let qstring = `SELECT * FROM users`;
    let responce = await this.client.query(qstring);
    return responce.rows || null;
  };

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.users WHERE id=${parseInt(id)}`;
    return await this.client.query(qstring);
  };

  insert = async user => {
    await this.connect();
    let qstring = `INSERT INTO public.users 
        (login, password, fio)
        VALUES('${user.login}', '${user.password}', '${user.fio}') 
        RETURNING id;`;
    return await this.client.query(qstring);
  };

  update = async (id, user) => {
    await this.connect();
    let qstring = `UPDATE public.users 
        SET login = '${user.login}', 
        password = '${user.password}',
        fio = '${user.fio}' 
        WHERE id = ${parseInt(id)}`;
    console.log(qstring);
    return (await this.client.query(qstring).rows) || route;
  };
}
module.exports = Users;
