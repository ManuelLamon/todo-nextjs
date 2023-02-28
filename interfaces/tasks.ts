export interface Task {
    id:                  string;
    collectionId:        string;
    collectionName:      string;
    created:             Date;
    updated:             Date;
    descripcion:         string;
    fecha_init:          Date;
    departamento:        string;
    usuario_creador:     string;
    archivos:            string[];
    usuario_responsable: string;
    lista:               string;
    fecha_fin:           Date;
    index:               string | number;
    proyecto:            string;
    usuario_last_update: string;
    foto:                string;
}

export interface List {
    id:             string;
    collectionId:   string;
    collectionName: string;
    created:        Date;
    updated:        Date;
    nombre:         string;
    proyecto:       string;
    index:          string;
}

export interface RequestCreateTask {
    titulo:              string;
    descripcion:         string;
    fecha_init:          string;
    departamento:        string;
    usuario_creador:     string;
    archivos:            string;
    usuario_responsable: string;
    lista:               string;
    fecha_fin:           string;
    index:               string;
    proyecto:            string;
    usuario_last_update: string;
}


