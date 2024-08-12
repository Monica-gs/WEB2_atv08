import { Router } from 'express';

import cursoController from '../controllers/curso_controller.mjs';

const cursoRouter = Router();

cursoRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

cursoRouter.get('/', cursoController.all);
cursoRouter.get('/:id', cursoController.one);
cursoRouter.post('/', cursoController.new);
cursoRouter.put('/', cursoController.edit);
cursoRouter.delete('/', cursoController.remove);

export default cursoRouter;