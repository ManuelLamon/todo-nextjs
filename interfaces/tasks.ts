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
    archivos:            string;
    usuario_responsable: string;
    lista:               string;
    fecha_fin:           Date;
    index:               string;
    proyecto:            string;
}
