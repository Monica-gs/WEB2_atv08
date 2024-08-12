import { Sequelize } from "sequelize";

const sequelize =  new Sequelize("postgresql://dewii_atividade08_user:mW00OKq0vyq60O4Nv9NykYEdQ5q0fdM6@dpg-cqt889ggph6c73emtutg-a/dewii_atividade08");
sequelize.sync();

export default sequelize;