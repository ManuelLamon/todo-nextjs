export interface SesionContextProps {
    sesion: Sesion | {} ,
    setSesion: (e:Sesion | {}) => void;
}

export interface Sesion {
    token:  string;
    record: Record;
}

export interface Record {
    id:              string;
    collectionId:    string;
    collectionName:  string;
    created:         Date;
    updated:         Date;
    username:        string;
    verified:        boolean;
    emailVisibility: boolean;
    email:           string;
    name:            string;
    avatar:          string;
    departamento:    string[];
}