const Add = () => {
  document.querySelectorAll(`tbody #add`).forEach(elem => {
    const point_start = elem.children[0].firstElementChild.value;
    const point_end = elem.children[1].firstElementChild.value;
    const time_start = new Date(
      elem.children[2].firstElementChild.value.replace("T", " ")
    );
    const time_arrive = new Date(
      elem.children[3].firstElementChild.value.replace("T", " ")
    );
    const transport_id = elem.children[4].firstElementChild.value;
    const cost = elem.children[5].firstElementChild.value;
    const count_tickets = elem.children[6].firstElementChild.value;
    data = {
      point_start,
      point_end,
      time_start,
      time_arrive,
      transport_id,
      cost,
      count_tickets
    };
  });
  PostData(-1, "insert", data);
  location.reload(1000);
};

const Save = id => {
  document.querySelectorAll(`tbody #id_${id}`).forEach(elem => {
    const point_start = elem.children[0].firstElementChild.value;
    const point_end = elem.children[1].firstElementChild.value;
    const time_start = new Date(
      elem.children[2].firstElementChild.value.replace("T", " ")
    );
    const time_arrive = new Date(
      elem.children[3].firstElementChild.value.replace("T", " ")
    );
    const transport_id = elem.children[4].firstElementChild.value;
    const cost = elem.children[5].firstElementChild.value;
    const count_tickets = elem.children[6].firstElementChild.value;
    data = {
      point_start,
      point_end,
      time_start,
      time_arrive,
      transport_id,
      cost,
      count_tickets
    };
  });
  PostData(id, "update", data);
};

const Delete = id => {
  if (confirm("Вы уверены?")) {
    document.querySelectorAll(`tbody #id_${id}`)[0].remove();
    PostData(id, "delete");
  }
};

const PostData = (id, typeFunct, data = null) => {
  fetch(`/editor_routes/${typeFunct}/${id}`, {
    method: "POST",
    body: data ? JSON.stringify(data) : [],
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => data.json())
    .then(data => {
      if (data.error) alert("Error" + data.error);
      else {
        return data.rows || null;
        //document.querySelector(`#row_${id}`).remove();
        //alert("Error" + error);
      }
    });
};
