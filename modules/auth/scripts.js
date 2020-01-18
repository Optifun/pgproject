const Login = () => {
  let inpts = document.querySelectorAll("input");
  let data = {};
  data.user = { login: inpts[0].value, password: inpts[1].value };
  console.log(data);
  PostData(data);
};

const PostData = data => {
  fetch(`/auth`, {
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
        if (data.login) alert("Вход выполнен");
        else alert("Не удалось войти");
        return data || null;
        //document.querySelector(`#row_${id}`).remove();
        //alert("Error" + error);
      }
    });
};
