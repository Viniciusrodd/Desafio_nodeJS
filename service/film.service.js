
// env
import dotenv from 'dotenv';
dotenv.config({});

// import parser
import { filmParser } from '../parser/film.parser.js';


class FilmService {

   // get all films (already parsed)
   async getAll() {
      const res = await fetch(process.env.API_FILMS);

      // error check
      if(!res.ok) throw new Error(`Error status: ${res.status}`);
      
      // get data + parsing each film
      const data = await res.json();
      return data.filmes.map(film => filmParser.parse(film));
   }

}
export const filmService = new FilmService();