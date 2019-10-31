import {CarbonLDP} from "carbonldp";

export default function init() {
    const carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");

    return carbonldp.documents.$executeSELECTQuery(
        `
            SELECT ?keyword ?label (COUNT(?label) AS ?count)
            WHERE {
                <https://data-itesm.lab.base22.com/movies/> <http://www.w3.org/ns/ldp#contains> ?movie .
                ?movie <http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#Keyword> ?keyword .
                ?keyword <http://www.w3.org/2000/01/rdf-schema#label> ?label .
            }
            GROUP BY ?keyword ?label
            ORDER BY DESC(?count)
            LIMIT 200
            `
    ).then((response) => {
        return response.bindings;
    });
}
