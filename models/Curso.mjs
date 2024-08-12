import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";
import Disciplina from "./Disciplina.mjs";

const Curso = sequelize.define('Curso', {
    nomeC: DataTypes.STRING,
    reitorC: DataTypes.STRING,
    tipo: DataTypes.STRING
});

Curso.belongsTo(Disciplina);

export default Curso;