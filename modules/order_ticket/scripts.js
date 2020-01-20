const Buy = route_id => {
  let route = document.querySelector(`tbody #id_${route_id}`);
  let from = route.children[0].innerText;
  let to = route.children[1].innerText;
  if (confirm(`Вы покупаете билет из пункта \"${from}\" в пункт \"${to}\"?`)) {
    PostData({ route_id }, "insert", "POST");
  }
};

const Filter = (field, elem) => {
  let filter = {};
  let options = document.querySelector("#options").className.split(" ");
  let reducer = (others, val, index) => {
    val != elem.value && val != "" ? others.push(val) : others;
    return others;
  };
  //получаю полный набор опций фильтрации
  options = options.reduce(reducer, []);
  if (elem.value != "") options.push(field);
  console.log("Набор опций");
  console.log(options);

  //получаю значения полей фильтра
  options.forEach((val, index) => {
    let element = document.querySelector(`#${val}`);
    if (element) filter[val] = element.value;
  });
  console.log(filter);

  let pairs = Object.entries(filter);
  let k = pairs.length;
  //создаю строку запроса
  let query = Object.entries(filter).reduce((prev, val, index) => {
    k--;
    return prev + `${val[0]}=${val[1]}` + (k > 0 ? "&" : "");
  }, "");
  console.log(query);
  GetData("?" + query);
};

const GetData = path => {
  fetch(`order/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => data.text())
    .then(data => {
      document.body.innerHTML = data;
    });
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
