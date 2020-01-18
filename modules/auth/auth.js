const DB = require("../DB");
const jwt = require("jsonwebtoken");
const secret = "123";
class Auth extends DB {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
  }
  getUser = async () => {
    const dbResponse = await this.client.query(
      `SELECT * FROM users WHERE login='${this.login}' 
                            AND password='${this.password}'`
    );

    const hasUser = dbResponse.rows[0] || null;
    return hasUser;
  };

  addUser = async () => {
    await this.connect();
    try {
      const dbResponseTestUser = await this.client.query(
        `SELECT * FROM users WHERE login='${this.login}'`
      );
      if (dbResponseTestUser.rows === null) {
        const dbResponse = await this.client.query(
          `INSERT INTO public.users(
                    login, password)
                    VALUES ('${this.login}', '${this.password}');`
        );
      } else {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  auth = async res => {
    await this.connect();
    const userData = await this.getUser();
    if (Boolean(userData)) {
      const token = Auth.updateOrCreateToken(userData);
      Auth.saveToken(res, token);
      return true;
    } else {
      return false;
    }
  };

  static checkToken = token => {
    try {
      const userData = jwt.verify(token, secret);
      return userData;
    } catch (e) {
      return null;
    }
  };
  static updateOrCreateToken = data => {
    const ignoreFields = ["iat", "exp"];

    const newData = Object.keys(data).reduce(
      (acc, curr) =>
        ignoreFields.includes(curr) ? acc : { ...acc, [curr]: data[curr] },
      {}
    );

    return jwt.sign(newData, secret, { expiresIn: 60 * 60 * 3 });
  };
  static saveToken = (res, token) => {
    res.cookie("token", token);
  };
}

module.exports = Auth;
