import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";

const Disciplina = sequelize.define('Disciplina', {
    nome:DataTypes.STRING,
    professor:DataTypes.STRING,
    cargaH:DataTypes.STRING,
    requisito:DataTypes.STRING,
    sala:DataTypes.STRING

});

export default Disciplina;
