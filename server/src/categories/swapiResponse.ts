import {PersonAPI} from "./person"
import {PlanetAPI} from "./planet"

export type Categories = (PersonAPI | PlanetAPI);

export interface SwapiResponse {
    count:      number;
    next:       string;
    previous:   string;
    results:    Categories[];
}