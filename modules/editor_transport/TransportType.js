const DB = require("../DB");

class TransportType extends DB {
  constructor() {
    super();
  }
  query = async () => {
    await this.connect();
    return await this.client.query(`SELECT * FROM public.transport_type`);
  };

  getAllItems = async () => {
    const dbResponse = await this.query();
    const types = dbResponse.rows || null;
    return types;
  };

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.transport_type 
      WHERE id=${parseInt(id)}`;
    return await this.client.query(qstring);
  };

  insert = async type => {
    await this.connect();
    let qstring = `INSERT INTO public.transport_type(name)
       VALUES('${type.name}') RETURNING id;`;
    return await this.client.query(qstring);
  };

  update = async (id, type) => {
    await this.connect();
    let qstring = `UPDATE public.transport_type 
      SET name='${type.name}'
      WHERE id=${parseInt(id)}`;
    return await this.client.query(qstring);
  };
}
module.exports = TransportType;
