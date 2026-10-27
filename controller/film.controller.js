
// import service
import { filmService } from '../service/film.service.js';


class FilmController {

   // get films
   async get(req, res) {
      try {
         const data = await filmService.getAll();
         return res.status(200).json(data);
      }
      catch(error) {
         console.error('❌ Internal error at Get films: ', error.message);
         return res.status(500).json({ 
            title: 'Erro ao buscar filmes',
            message: error.message 
         });
      }
   }

}
export const filmController = new FilmController();