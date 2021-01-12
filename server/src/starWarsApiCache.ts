import axios from "axios";
import { Categories, RawCategories, SwapiResponse } from "./categories/swapiResponse"
import { ApiLink } from "./categories/apiLink";
import { PersonAPI, RawPersonAPI } from "./categories/person"
import { PlanetAPI, RawPlanetAPI } from "./categories/planet"
import { FilmAPI, RawFilmAPI } from "./categories/film";

interface CategoryMap<T> {
    [id: number]: T;
}

export class StarWarsApiCache {
    static people: CategoryMap<PersonAPI>;
    static planets: CategoryMap<PlanetAPI>;
    static films: CategoryMap<FilmAPI>;

    //Loads the data from swapi.dev
    public static async loadAPI(): Promise<void> {
        return new Promise((res) => {
            let numFinished = 0;
            let target = 3;

            let isFinished = () => {
                numFinished++;
                if (target == numFinished) {
                    console.log(`there are ${Object.keys(this.people).length} people`);
                    console.log(`there are ${Object.keys(this.planets).length} planets`);
                    console.log(`there are ${Object.keys(this.films).length} films`);
                    res();
                }
            }

            this.loadPage("https://swapi.dev/api/people/?page=1").then((data) => {
                this.people = <CategoryMap<PersonAPI>>this.refineData(data);
                isFinished();
            });

            this.loadPage("https://swapi.dev/api/planets/?page=1").then((data) => {
                this.planets = <CategoryMap<PlanetAPI>>this.refineData(data);
                isFinished();
            });

            this.loadPage("https://swapi.dev/api/films/?page=1").then((data) => {
                this.films = <CategoryMap<FilmAPI>>this.refineData(data);
                isFinished();
            });
        });
    }

    public static dereference(link: string): Categories | undefined { // converts a link to the requested data
        let matches = (data: string, category: string) => {
            let returnData;

            if ((returnData = data.match(`http://swapi.dev/api/${category}`)) != null) {
                return returnData;
            }

            if ((returnData = data.match(this.convertToLocalLink(`http://swapi.dev/api/${category}`))) != null) {
                return returnData;
            }

            return null;
        }

        if (matches(link, "people") != null) {
            return this.people[this.getIdFromLink(link)];
        }
        if (matches(link, "planets") != null) {
            return this.planets[this.getIdFromLink(link)];
        }
        if (matches(link, "films") != null) {
            return this.films[this.getIdFromLink(link)];
        }
    }
    
    public static crossReferenceAll() {
        this.people = <CategoryMap<PersonAPI>>this.crossReference(this.people);
        this.planets = <CategoryMap<PlanetAPI>>this.crossReference(this.planets);
        this.films = <CategoryMap<FilmAPI>>this.crossReference(this.films);
    }

    private static crossReference(data: CategoryMap<Categories>) {
        let processData = (value: any) => {
            if ((value as ApiLink).link !== undefined && (value as ApiLink).text !== undefined) {
                value = <ApiLink>value;
                let newData: ApiLink = {
                    link: this.convertToLocalLink(value.link),
                    text: this.dereference(value.link) !== undefined ?
                        this.getName(<Categories>this.dereference(value.link)) :
                        "unknown"
                }

                return newData;
            }

            return value;
        }

        for (let id in data) {
            for (let property in data[id]) {
                let value = Reflect.get(data[id], property);

                let newValue;

                if (Array.isArray(value)) {
                    newValue = []
                    for (let i = 0; i < value.length; i++) {
                        newValue.push(processData(value[i]));
                    }
                } else {
                    newValue = processData(value);
                }

                Reflect.set(data[id], property, newValue);
            }
        }

        return data;
    }

    //converts swapi link to this api's link
    public static convertToLocalLink(link: string) {
        return link.replace("http://swapi.dev/api", "http://localhost:8001");
    }

    private static getIdFromLink(link: string) {
        return <number><any>link.match("\\d+")?.toString();
    }

    private static isLink(data: string) {
        return ((data + "").match("http") != null); // returns true when data contains "http"
    }

    private static getName(data: Categories) { //gets defining name. people have a 'name', films have a 'title', etc.
        if ((data as FilmAPI).title !== undefined) {
            return (data as FilmAPI).title;
        } else {
            return (data as PersonAPI).name;
        }
    }

    private static refineData(data: CategoryMap<RawCategories>): CategoryMap<Categories> { // convert "Raw" data to a more refined dataStructure
        let refine = (value: any) => {
            if(this.isLink(value) == true) {
                return <ApiLink>{link: value, text: ""};
            }

            return value;
        }

        let refinedData: CategoryMap<Categories> = {}; //to be returned

        for (let linkId in data) {
            let entry: any = {};//is a category

            for(let property in data[linkId]) {
                let value = <string>Reflect.get(data[linkId], property); //data[linkId].property = value

                let newValue;

                if (Array.isArray(value)) {
                    newValue = [];

                    for (let i = 0; i < value.length; i++) {
                        newValue.push(refine(value[i]))
                    }
                } else {
                    newValue = refine(value);
                }

                entry[property] = newValue;
            }

            refinedData[linkId] = entry;
        }

        return refinedData;
    }

    private static async loadPage(link: string): Promise<CategoryMap<RawCategories>> {
        return new Promise((res) => {
            // data to be returned
            let totalData: CategoryMap<RawCategories> = {}

            let load = async(link: string) => {
                axios.get(link).then((response) => {
                    let data: SwapiResponse = response.data; // data is an array json object

                    data.results.forEach(element => {
                        //all Categories have a url element
                        totalData[this.getIdFromLink(element.url)] = element;
                    });

                    if (data.next != null) {
                        load(data.next);
                    } else {
                        res(totalData);
                    }
                });
            }

            load(link);
        });
    }
}