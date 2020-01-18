const Add = () => {
  document.querySelectorAll(`tbody #add`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    //const name = elem.children[1].firstElementChild.value;
    //const fio = elem.children[2].firstElementChild.value;
    data = { name };
  });
  PostData(-1, "insert", data);
  location.reload(1000);
};

const Save = id => {
  document.querySelectorAll(`tbody #id_${id}`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    //const name = elem.children[1].firstElementChild.value;
    //const fio = elem.children[2].firstElementChild.value;
    data = { name };
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
  fetch(`/editor_points/${typeFunct}/${id}`, {
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
        console.log(data);
        return data.rows || null;
        //document.querySelector(`#row_${id}`).remove();
        //alert("Error" + error);
      }
    });
};
