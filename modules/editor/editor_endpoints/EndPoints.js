const DB = require("../../DB");

class EndPoints extends DB {
  constructor() {
    super();
  }
  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM public.points`;
    if (args && args.except) qstring += ` WHERE name='${args.except}'`;
    return await this.client.query(qstring);
  };

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.points WHERE id=${id}`;
    return await this.client.query(qstring);
  };

  insert = async data => {
    await this.connect();
    let qstring = `INSERT INTO public.points(name) VALUES('${data.name}') RETURNING id;`;
    return await this.client.query(qstring);
  };

  update = async (id, data) => {
    await this.connect();
    let qstring = `UPDATE public.points SET name='${data.name}' WHERE id=${id}`;
    return await this.client.query(qstring);
  };

  getAllItems = async args => {
    const dbResponse = await this.query(args);
    return dbResponse.rows || null;
  };
}
module.exports = EndPoints;
