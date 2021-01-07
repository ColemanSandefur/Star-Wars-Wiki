import {PersonAPI, RawPersonAPI} from "./person"
import {PlanetAPI, RawPlanetAPI} from "./planet"
import {FilmAPI, RawFilmAPI} from "./film"

export type Categories = (PersonAPI | PlanetAPI | FilmAPI);
export type RawCategories = (RawPersonAPI | RawPlanetAPI | RawFilmAPI);

export interface SwapiResponse {
    count:      number;
    next:       string;
    previous:   string;
    results:    RawCategories[];
}