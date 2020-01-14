const DB = require("../DB");

class Transport extends DB {
  constructor() {
    super();
  }

  getAllItems = async () => {
    await this.connect();
    const dbResponse = await this.client.query(`SELECT * FROM transport`);
    console.log(dbResponse);
    return dbResponse.rows || null;
  };

  delete = async id => {
    await this.connect();
    if (id && parseInt(id > 0)) {
      let qstring = `DELETE FROM public.transport WHERE id=${parseInt(id)}`;
      return await this.client.query(qstring);
    }
  };

  insert = async transport => {
    await this.connect();
    if (point) {
      let qstring = `INSERT INTO public.transport 
      name, transport_type  VALUES(${type.name}, ${type.transport_type})`;
    }
  };

  update = async transport => {
    await this.connect();
    if (point) {
      let qstring = `UPDATE public.transport 
      SET name=${transport.login},
      transport_type=${type.transport_type}
      WHERE id=${parseInt(transport.id)}`;
      return await this.client.query(qstring);
    }
  };
}

module.exports = Transport;
