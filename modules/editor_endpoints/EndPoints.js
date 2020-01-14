const DB = require("../DB");

class EndPoints extends DB {
  constructor() {
    super();
  }
  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM public."points"`;
    if (args && args.except) qstring += ` WHERE name=${args.except}`;
    return await this.client.query(qstring);
  };

  delete = async id => {
    await this.connect();
    if (id && parseInt(id > 0)) {
      let qstring = `DELETE FROM public."points" WHERE id=${parseInt(id)}`;
      return await this.client.query(qstring);
    }
  };

  insert = async point => {
    await this.connect();
    if (point) {
      let qstring = `INSERT INTO public.points 
      name VALUES(${point.name})`;
    }
  };

  update = async point => {
    await this.connect();
    if (point) {
      let qstring = `UPDATE public.points 
      SET name=${usr.login}, 
      WHERE id=${parseInt(point.id)}`;
      return await this.client.query(qstring);
    }
  };

  getAllItems = async args => {
    const dbResponse = await this.query(args);
    return dbResponse.rows || null;
  };
}
module.exports = EndPoints;
