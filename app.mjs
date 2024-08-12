import express from 'express'
import session from 'express-session';
import sequelize from './database/mysql.mjs';
import CSS from 'connect-session-sequelize';


import userRouter from './routers/user_router.mjs';
import disciplinaRouter from './routers/disciplina_router.mjs';
import cursoRouter from './routers//curso_router.mjs';

const app = express()
const port = 3000

const SequelizeStore = CSS(session.Store);

app.use(
    session({
        secret: '#7UIERU933E00LERI##327345&6',
        store: new SequelizeStore({
            db: sequelize
        })
    })
);

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/disciplinas', disciplinaRouter);
app.use("/cursos",cursoRouter);

app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`)
})

