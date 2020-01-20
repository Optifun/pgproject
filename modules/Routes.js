const DB = require("./DB");
const { formatDate, formatTime } = require("./DateFormates");

const format = date => {
  date.formatDate = formatDate;
  date.formatTime = formatTime;
  return `${date.formatDate()} ${date.formatTime()}:00+7`;
};

class Routes extends DB {
  constructor() {
    super();
  }

  getAllItems = async args => {
    await this.connect();
    let qstring = `SELECT * FROM named_route`;
    let responce = await this.client.query(qstring);
    return responce.rows || null;
  };

  delete = async id => {
    await this.connect();
    let qstring = `DELETE FROM public.route WHERE id=${parseInt(id)}`;
    return await this.client.query(qstring);
  };

  insert = async route => {
    await this.connect();
    let qstring = `INSERT INTO public.route 
      (point_start, point_end, time_start, time_arrive, cost, count_tickets, transport_id)
        VALUES('${route.point_start}', ${route.point_end},
        '${format(new Date(route.time_start))}', 
        '${format(new Date(route.time_arrive))}',
        ${route.cost}, ${route.count_tickets},
        ${route.transport_id}) 
        RETURNING id;`;
    return await this.client.query(qstring);
  };

  update = async (id, route) => {
    await this.connect();
    let qstring = `UPDATE public.route 
      SET point_start=${route.point_start}, 
      point_end = ${route.point_end},
      time_start = '${format(new Date(route.time_start))}', 
      time_arrive = '${format(new Date(route.time_arrive))}', 
      cost = ${route.cost}, 
      count_tickets = ${route.count_tickets}, 
      transport_id = ${route.transport_id}
      WHERE id = ${parseInt(id)}`;
    console.log(qstring);
    return (await this.client.query(qstring).rows) || route;
  };

  query = async args => {
    await this.connect();
    let qstring = `SELECT * FROM named_route`;
    if (JSON.stringify(args) != "{}") {
      let count = Object.keys(args).length;
      qstring += " WHERE ";

      if (args.point_start) {
        qstring += `point_start_id=${args.point_start}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }

      if (args.point_end) {
        qstring += `point_end_id=${args.point_end}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }
      if (args.transport) {
        qstring += `transport_type_id=${args.transport}`;
      }
      /*
      if (args.time_start) {
        qstring += `time_start>=${args.time_start}`;
        count--;
        qstring += count > 0 ? "AND " : "";
      }
      if (args.time_arrive) {
        qstring += `time_arrive<=${args.time_arrive}`;
      }
      */
    }
    console.log(qstring);
    return await this.client.query(qstring);
  };

  loadData = async args => {
    const dbResponse = await this.query(args);
    const routes = dbResponse.rows || null;
    return routes;
  };
}
module.exports = Routes;
