const Add = () => {};

const Save = id => {
  const result = document.querySelectorAll(`.id_${id}`);
  console.log(result);

  //.forEach(item => {

  // let value = null;
  // value = item.value;
  // data.push({
  //   name: item.id.replace("_" + id, ""),
  //   value: value
  // });
  //});

  //   if (validate(data)) {
  //     api
  //       .post(`/${apiType}/edit/${id}`, data)
  //       .then(data => data.json())
  //       .then(({ error, message }) => notify(message, error));
  //   } else {
  //     notify("Ошибка сохранения", true);
  //   }
  // };
};

const Delete = id => {
  if (confirm("Вы уверены?")) {
    PostData(id, "DeleteTT");
  }
};

const PostData = (id, typeFunct, data = null) => {
  fetch(`/editor_transport/${typeFunct}/${id}`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => data.json())
    .then(({ error }) => {
      if (error) alert("Error" + error);
      else {
        document.querySelector(`#row_${id}`).remove();
        alert("Error" + error);
      }
    });
};
