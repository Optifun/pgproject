const DB = require("../../DB");

class Transport extends DB {
  constructor() {
    super();
  }

  getAllItems = async () => {
    await this.connect();
    const dbResponse = await this.client.query(`SELECT * FROM named_transport`);
    return dbResponse.rows || null;
  };

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.transport WHERE id=${parseInt(id)}`;
    return await this.client.query(qstring);
  };

  insert = async transport => {
    await this.connect();
    let qstring = `INSERT INTO public.transport 
      (name, transport_type_id)  VALUES('${transport.name}', ${transport.transport_type}) RETURNING id;`;
    return await this.client.query(qstring);
  };

  update = async (id, transport) => {
    await this.connect();
    let qstring = `UPDATE public.transport 
      SET name = '${transport.name}',
      transport_type_id = ${transport.transport_type}
      WHERE id = ${parseInt(id)}`;
    return await this.client.query(qstring);
  };
}

module.exports = Transport;
