import {ApiLink} from "./apiLink";

export interface RawFilmAPI {
    title:         string;
    episode_id:    number;
    opening_crawl: string;
    director:      string;
    producer:      string;
    release_date:  string;
    characters:    string[];
    planets:       string[];
    starships:     string[];
    vehicles:      string[];
    species:       string[];
    created:       string;
    edited:        string;
    url:           string;
}

export interface FilmAPI {
    title:         string;
    episode_id:    number;
    opening_crawl: string;
    director:      string;
    producer:      string;
    release_date:  string;
    characters:    ApiLink[];
    planets:       ApiLink[];
    starships:     ApiLink[];
    vehicles:      ApiLink[];
    species:       ApiLink[];
    created:       string;
    edited:        string;
    url:           ApiLink;
}