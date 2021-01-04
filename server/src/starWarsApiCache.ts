import axios from "axios";
import { Categories, SwapiResponse } from "./categories/swapiResponse"
import { PersonAPI } from "./categories/person"
import { PlanetAPI } from "./categories/planet"

export class StarWarsApiCache {
    static people: {[id: number]: PersonAPI};
    static planets: {[id: number]: PlanetAPI};

    public static async loadAPI(): Promise<void> {
        return new Promise((res) => {
            let numFinished = 0;
            let target = 2;
            let isFinished = () => {
                numFinished++;
                if (target == numFinished) {
                    res();
                }
            }

            this.loadPage("https://swapi.dev/api/people/?page=1").then((data) => {
                this.people = <{[id: number]: PersonAPI}>data;
                isFinished();
            });

            this.loadPage("https://swapi.dev/api/planets/?page=1").then((data) => {
                this.planets = <{[id: number]: PlanetAPI}>data;
                isFinished();
            });
        });
    }

    public static crossReference() {
        this.people = <{[id: number]: PersonAPI}>this.crossReferenceCategory(this.people);

        console.log(this.people[1]);
    }

    public static crossReferenceCategory(dat: {[id: number]: Categories}) {
        Object.keys(dat).forEach(key => {
            let person = dat[<number><unknown>key]
            Object.keys(person).forEach(category => {
                let value = Reflect.get(person, category);

                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        if (this.dereference(value[i]) != undefined) {
                            value[i] = this.dereference(value[i])?.name;
                            console.log(value[i]);
                        }
                    }
                } else {
                    if (this.dereference(value) != undefined) {
                        value = this.dereference(value)?.name;
                        console.log(value);
                    }
                }

                Reflect.set(person, category, value);
            });
        });

        return dat;
    }

    public static dereference(link: string): Categories | undefined {
        if (link.match("http://swapi.dev/api/people") != null) {
            return this.people[this.getIdFromLink(link)];
        }
        if (link.match("http://swapi.dev/api/planets") != null) {
            return this.planets[this.getIdFromLink(link)];
        }
    }

    private static async loadPage(link: string): Promise<{[id: number]: Categories}> {
        return new Promise((res) => {
            let totalData: {[id: number]: Categories} = {}
            let load = async(link: string) => {
                axios.get(link).then((response) => {
                    let data: SwapiResponse = response.data;
                    data.results.forEach(element => {
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

    private static getIdFromLink(link: string) {
        return <number><any>link.match("\\d+")?.toString();
    }
}