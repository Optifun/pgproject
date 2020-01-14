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
    if (id && parseInt(id > 0)) {
      let qstring = `DELETE FROM public.transport_type 
      WHERE id=${parseInt(id)}`;
      return await this.client.query(qstring);
    }
  };

  insert = async type => {
    await this.connect();
    if (point) {
      let qstring = `INSERT INTO public.transport_type 
      name VALUES(${transport.name})`;
    }
  };

  update = async type => {
    await this.connect();
    if (point) {
      let qstring = `UPDATE public.transport_type 
      SET name=${type.login}
      WHERE id=${parseInt(type.id)}`;
      return await this.client.query(qstring);
    }
  };
}
module.exports = TransportType;
