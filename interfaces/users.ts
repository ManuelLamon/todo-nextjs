export interface User {
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
