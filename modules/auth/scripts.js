const Login = path => {
  let inpts = document.querySelectorAll("input");
  const user = { login: inpts[0].value, password: inpts[1].value };
  console.log(user);
  PostData(user, path);
};

const PostData = (data, path) => {
  fetch(`/${path}`, {
    method: "POST",
    body: data ? JSON.stringify(data) : [],
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => data.text())
    .then(data => {
      document.body.innerHTML = data;
    });
};
