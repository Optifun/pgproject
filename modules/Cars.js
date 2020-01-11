const DB = require("../modules/DB")

class Cars extends DB {
    constructor() {
        super();
    }
    //Возвращяет результат запроса к бд
    getCars = async () => {  
        await this.connect();
        return  await this.client.query(
            `SELECT * FROM cars`);
    }; 

    //формирует ассоциативный массив
    formArray = async () =>{
        const dbResponse = await this.getCars();
        const carsList = dbResponse.rows || null;
        return carsList;
    }

    cloneCars = () =>{
        let data = this.formArray();
        console.log("clone Cars "+ data);
        return data;
    }    
}

module.exports = Cars;