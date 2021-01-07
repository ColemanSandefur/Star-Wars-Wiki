import axios from "axios";
import { Categories, RawCategories, SwapiResponse } from "./categories/swapiResponse"
import { ApiLink } from "./categories/apiLink";
import { PersonAPI, RawPersonAPI } from "./categories/person"
import { PlanetAPI, RawPlanetAPI } from "./categories/planet"
import { FilmAPI, RawFilmAPI } from "./categories/film";

export class StarWarsApiCache {
    static people: {[id: number]: PersonAPI};
    static planets: {[id: number]: PlanetAPI};
    static films: {[id: number]: FilmAPI};

    public static async loadAPI(): Promise<void> {
        return new Promise((res) => {
            let numFinished = 0;
            let target = 3;
            let isFinished = () => {
                numFinished++;
                if (target == numFinished) {
                    res();
                }
            }
            console.log(this.isLink("https://swapi.dev/api/planets/?page=1"));

            this.loadPage("https://swapi.dev/api/people/?page=1").then((data) => {
                this.people = <{[id: number]: PersonAPI}>this.refineData(data);
                isFinished();
            });

            this.loadPage("https://swapi.dev/api/planets/?page=1").then((data) => {
                this.planets = <{[id: number]: PlanetAPI}>this.refineData(data);
                isFinished();
            });

            this.loadPage("https://swapi.dev/api/films/?page=1").then((data) => {
                this.films = <{[id: number]: FilmAPI}>this.refineData(data);
                isFinished();
            });
        });
    }

    public static dereference(link: string): Categories | undefined { // converts a link to the requested data
        if (link.match("http://swapi.dev/api/people") != null) {
            return this.people[this.getIdFromLink(link)];
        }
        if (link.match("http://swapi.dev/api/planets") != null) {
            return this.planets[this.getIdFromLink(link)];
        }
        if (link.match("http://swapi.dev/api/films") != null) {
            return this.films[this.getIdFromLink(link)];
        }
    }

    private static getIdFromLink(link: string) {
        return <number><any>link.match("\\d+")?.toString();
    }

    private static isLink(data: string) {
        return ((data + "").match("swapi.dev/") != null); // returns true when data contains "http://swapi.dev/api/"
    }

    private static refineData(data: {[key: string]: RawCategories}): {[key: string]: Categories} { // convert "Raw" data to a more refined dataStructure
        // console.log(data);
        let refined: {[key: string]: Categories} = {};
        for (let linkId in data) {
            let newData: any = {};

            for(let property in data[linkId]) {
                let value = <string>Reflect.get(data[linkId], property);

                if (Array.isArray(value)) {
                    newData[property] = [];
                    for (let i = 0; i < value.length; i++) {
                        newData[property].push({link: value[i], text: ""})
                    }
                } else if(this.isLink(value) == true) {
                    newData[property] = {link: value, text: ""};
                } else {
                    newData[property] = value;
                }
            }

            refined[linkId] = newData;
        }

        return refined;
    }

    private static async loadPage(link: string): Promise<{[id: number]: RawCategories}> {
        return new Promise((res) => {
            // data to be returned
            let totalData: {[id: number]: RawCategories} = {}

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