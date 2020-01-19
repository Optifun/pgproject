const DB = require("../DB");

class Tickets extends DB {
  constructor() {
    super();
  }

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.tickets WHERE id=${id}`;
    return await this.client.query(qstring);
  };

  insert = async data => {
    await this.connect();
    let qstring = `SELECT * FROM public.route WHERE id=${data.route_id}`;
    let dbRes = await this.client.query(qstring);
    let route = dbRes.rows[0];

    qstring = `SELECT * FROM public.tickets WHERE route_id=${data.route_id}`;
    dbRes = await this.client.query(qstring);
    let tickets = dbRes.rows;

    if (route) {
      if (route.count_tickets >= tickets.length + 1)
        qstring = `INSERT INTO public.tickets(route_id, user_id) VALUES(${data.route_id}, ${data.user_id}) RETURNING id;`;
      else return { msg: "Билеты закончились." };
    } else
      qstring = `INSERT INTO public.tickets(route_id, user_id) VALUES(${data.route_id}, ${data.user_id}) RETURNING id;`;
    return { msg: "Билет успешно приобретён." };
  };

  update = async (id, data) => {
    await this.connect();
    let qstring = `UPDATE public.tickets SET route_id=${data.route_id}, user_id=${data.user_id} WHERE id=${id}`;
    return await this.client.query(qstring);
  };

  getAllItems = async args => {
    await this.connect();
    let qstring = `SELECT * FROM public.route_ticket`;
    if (args) {
      qstring += ` WHERE `;
      if (Boolean(args.user_id)) qstring += `user_id='${args.user_id}'`;
      if (Boolean(args.user_id) && Boolean(args.route_id)) qstring += " AND ";
      if (Boolean(args.route_id)) qstring += `route_id='${args.route_id}'`;
    }
    const dbResponse = await this.client.query(qstring);
    return dbResponse.rows || null;
  };
}
module.exports = Tickets;
