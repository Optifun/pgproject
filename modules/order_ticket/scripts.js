const Buy = route_id => {
  let route = document.querySelector(`tbody #id_${route_id}`);
  let from = route.children[0].innerText;
  let to = route.children[1].innerText;
  if (confirm(`Вы покупаете билет из пункта \"${from}\" в пункт \"${to}\"?`)) {
    PostData({ route_id }, "insert");
  }
};

const PostData = (data, path) => {
  fetch(`order/${path}`, {
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
        if (data.msg) alert(data.msg);
        return data || null;
      }
    });
};
