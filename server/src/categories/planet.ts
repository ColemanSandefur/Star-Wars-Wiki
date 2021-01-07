import {ApiLink} from "./apiLink";

export interface RawPlanetAPI {
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       string[];
    films:           string[];
    created:         string;
    edited:          string;
    url:             string;
}

export interface PlanetAPI {
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       ApiLink[];
    films:           ApiLink[];
    created:         string;
    edited:          string;
    url:             ApiLink;
}