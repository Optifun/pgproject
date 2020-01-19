module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const { pugCompile } = require("../pug");
  const Auth = require("./Auth");
  const Users = require("../Users");

  isNotEmpty = (...fields) => {
    return fields.some(item => item === "" || item === null);
  };

  app.get("/quit", (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth");
  });

  app.post("/auth", async (req, res) => {
    const { login, password } = req.body;
    console.log("POST AUTH");
    console.log(login, password);
    if (isNotEmpty(login, password)) {
      res.send(
        pugCompile(path.resolve(projectPath, "auth", "auth.pug"), {
          errorr: "Введены не полные данные",
          auth: true
        })
      );
      return;
    }
    //при успешной авторизации редирект на главную
    const authResult = await new Auth(login, password).auth(res);
    if (authResult) {
      console.log("redirect");
      res.redirect("/");
      return;
    }
    res.send(
      pugCompile(path.resolve(projectPath, "auth", "auth.pug"), {
        errorr: "Ошибка авторизации",
        auth: true,
        hello: "Hello"
      })
    );
    return;
  });

  //Регистрация
  app.post("/register", async (req, res) => {
    const { login, password } = req.body;
    if (isNotEmpty(login, password)) {
      res.send(
        pugCompile(path.resolve(projectPath, "auth", "register.pug"), {
          errorr: "Введены не полные данные",
          auth: true
        })
      );
      return;
    }
    const result = await new Auth(login, password).addUser();
    if (!result) {
      res.send(
        pugCompile(path.resolve(projectPath, "auth", "register.pug"), {
          errorr: "Ошибка регистрации",
          auth: true
        })
      );
    } else {
      const authResult = await new Auth(login, password).auth(res);
      if (authResult) {
        res.redirect("/");
      } else {
        res.redirect("/auth");
      }
    }
  });

  app.get("/auth", async (req, res) => {
    console.log("GET AUTH");
    res.send(
      pugCompile(path.resolve(projectPath, "auth", "auth.pug"), {
        auth: true,
        hello: "Hello2"
      })
    );
  });

  app.get("/register", async (req, res) => {
    res.send(
      pugCompile(path.resolve(projectPath, "auth", "register.pug"), {
        auth: true
      })
    );
  });
};
