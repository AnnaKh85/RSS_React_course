export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    image: string;
    episode: string[];
}

export interface PageInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}