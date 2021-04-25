module.exports = function () {
  let operations = {
    GET,
  };


  const URL_PELIS = "https://m.filmaffinity.com/es/search.php?stext=alien";
  //const URL_PELIS = "https://www.filmaffinity.com/es/search.php?stext=alien";
  const Cheerio = require('cheerio');
  const axios = require('axios');



  function GET(req, res, next) {
    const seccion = [];
    async function recuperartitulo() {


      return await axios.get(URL_PELIS).then((res) => {


        const datosweb = Cheerio.load(res.data);


        datosweb(".se-it").each(function (i, elemento) {

          const actors = [];

          const titulo = datosweb(elemento)
            .find(".mc-title").text().trim();

          const anio = datosweb(elemento)
            .find(".ye-w").text().trim();

          const nota = datosweb(elemento)
            .find(".mr-rating")
            .find(".avgrat-box").text().trim();

          const director = datosweb(elemento)
            .find(".mc-director")
            .find("a").text().trim();


          datosweb(elemento).find(".mc-cast").find(".nb").map(function (i, v) {
            actors.push(datosweb(v).text().trim());
          });



          let reparto = datosweb(elemento)
            .find(".mc-cast")
            .find(".nb").text().trim();



          const enlace = datosweb(elemento)
            .find(".mc-title")
            .find("a")
            .attr("href");
          //console.log(enlace);

          // para la sinopsis

          // const textorecuperado =  recusinopsis(enlace);
          // console.log(textorecuperado);
          console.log(actors);



          if (titulo) {
            seccion[i] = {
              titulo: titulo,
              anio: anio,
              nota: nota,
              director: director,
              reparto: JSON.stringify(actors),
              url: enlace

            }
          }
        });


        return seccion;
      });

    };

    const blablabla = async () => {

      const resultJSON = {
        busqueda: await recuperartitulo()
      };

      console.log(resultJSON);

      res.status(200).json({
        resultJSON
      });
    }

    blablabla();


  }



  GET.apiDoc = {
    summary: "Fetch todos.",
    operationId: "getTodos",
    responses: {
      200: {
        description: "Busqueda.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Todo",
          },
        },
      },
    },
  };




  return operations;
};
