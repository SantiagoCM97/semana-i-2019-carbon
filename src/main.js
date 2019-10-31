import {CarbonLDP} from "carbonldp";

export default function getKeywords() {
    const carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");

    return carbonldp.documents.$executeSELECTQuery(
            `
            SELECT ?label (COUNT(?label) AS ?count) ?id
            WHERE {
                <https://data-itesm.lab.base22.com/movies/> <http://www.w3.org/ns/ldp#contains> ?movie .
                ?movie <http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#Keyword> ?keyword .
                ?keyword <http://www.w3.org/2000/01/rdf-schema#label> ?label .
                ?keyword <https://data-itesm.lab.base22.com/vocabularies/main/#theMovieDBId> ?id
            }
            GROUP BY ?label ?id
            ORDER BY DESC(?count)
            LIMIT 200
            `
        ).then((response) => {
            return response.bindings;
    });
}

export function getMovies(id) {
    const carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");

    return carbonldp.documents.$executeSELECTQuery(
        `
            SELECT ?movieTitles
            WHERE {
                <https://data-itesm.lab.base22.com/keywords/${id}/> <http://schema.org/Movie> ?movies .
                ?movies <https://data-itesm.lab.base22.com/vocabularies/main/#label> ?movieTitles .
            }
        `
    )
}
