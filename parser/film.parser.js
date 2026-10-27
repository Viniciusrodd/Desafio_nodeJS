
// "$6 milhões" -> 6000000
const toNumber = (value) => {
   // scientific notation
   const UNITS = { 
      milhão: 1e6, milhões: 1e6, 
      bilhão: 1e9, bilhões: 1e9 
   };

   const [amount, unit] = value.replace('$', '').split(' '); // "$6 milhões" -> ["6", "milhões"]
   return parseFloat(amount) * UNITS[unit];
};

// 1400000000 -> "$1.4 bilhões"
const formatMoney = (value) => {
   // billion check
   const isBillion = value >= 1e9;
   
   const n = Number((value / (isBillion ? 1e9 : 1e6)).toFixed(1));
   return `$${n} ${isBillion ? 'bilhões' : 'milhões'}`;
};


class FilmParser {

   parse(film) {
      // get "IMDb" ratings
      const imdb = film.ratings.find(r => r.fonte === 'IMDb');
      
      // get most relevant award
      const award = [...film.premios].sort((a, b) => {
         return b.relevancia - a.relevancia;
      })[0];

      // get synopsis, preference order -> (pt-br or en)
      const synopsis = film.sinopse.find(s => s.idioma === 'pt-br')
         ?? film.sinopse.find(s => s.idioma === 'en')
         ?? film.sinopse[0];

      return {
         titulo: film.titulo,
         ano: film.ano,
         diretor: film.diretor,
         genero: film.genero,
         duracaoSegundos: film.duracao * 60,
         notaIMDb: String(imdb?.valor),
         lucro: formatMoney(toNumber(film.bilheteria) - toNumber(film.orcamento)),
         maiorPremiacao: award?.nome,
         sinopse: synopsis?.texto
      };
   }

}
export const filmParser = new FilmParser();