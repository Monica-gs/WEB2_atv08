import { Router } from 'express';
import disciplinaController from '../controllers/disciplina_controller.mjs';

const disciplinaRouter = Router();

disciplinaRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

disciplinaRouter.get('/', disciplinaController.all)
disciplinaRouter.post('/', disciplinaController.new)
disciplinaRouter.put('/', disciplinaController.edit)
disciplinaRouter.delete('/', disciplinaController.remove)
disciplinaRouter.get('/:id', disciplinaController.one)

export default disciplinaRouter;