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
    if (args && args.length > 0) {
      let count = args.length;
      qstring += " WHERE ";

      if (args.startPoint) {
        qstring += `point_begin=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }

      if (args.endPoint) {
        qstring += `point_end=${startPoint}`;
        count--;
        qstring += count > 0 ? " AND " : "";
      }
      if (args.startTime) {
        qstring += `time_start>=${startPoint}`;
        count--;
        qstring += count > 0 ? "AND " : "";
      }
      if (args.endTime) {
        qstring += `time_arrive<=${startPoint}`;
      }
    }
    return await this.client.query(qstring);
  };

  loadData = async args => {
    const dbResponse = await this.query(args);
    const routes = dbResponse.rows || null;
    return routes;
  };
}
module.exports = Routes;
