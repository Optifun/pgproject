const AddTransport = () => {
  document.querySelectorAll(`tbody#transport #add`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    const transport_type = elem.children[1].firstElementChild.value;
    data = { name, transport_type };
  });
  PostData(-1, "insertTransport", data);
  location.reload(1000);
};

const SaveTransport = id => {
  document.querySelectorAll(`tbody#transport #id_${id}`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    const transport_type = elem.children[1].firstElementChild.value;
    data = { name, transport_type };
  });
  PostData(id, "updateTransport", data);
};

const DeleteTransport = id => {
  if (confirm("Вы уверены?")) {
    document.querySelectorAll(`tbody#transport #id_${id}`)[0].remove();
    PostData(id, "deleteTransport");
  }
};

const AddType = () => {
  document.querySelectorAll(`tbody#types #add`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    data = { name };
  });
  PostData(-1, "insertType", data);
  location.reload(1000);
};

const SaveType = id => {
  document.querySelectorAll(`tbody#types #id_${id}`).forEach(elem => {
    const name = elem.children[0].firstElementChild.value;
    data = { name };
  });
  PostData(id, "updateType", data);
};

const DeleteType = id => {
  if (confirm("Вы уверены?")) {
    document.querySelectorAll(`tbody#types #id_${id}`)[0].remove();
    PostData(id, "deleteType");
  }
};

const PostData = (id, typeFunct, data = null) => {
  fetch(`/editor_transport/${typeFunct}/${id}`, {
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
