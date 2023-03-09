export interface ProyectoContextProps {
    List: List[] ;
    setList: (e:List[]) => void;
    TaskList: Task[];
    setTaskList:(e:Task[]) => void;
    Proyectos: Proyecto[] ;
    setProyectos:(e:Proyecto[]) => void;
    TiposLista: TipoLista[] ;
    setTiposLista:(e:TipoLista[]) => void;
}

export interface Tasks {
    [key: string]:any[]
}

export interface Task {
    id:                  string;
    titulo:              string;
    collectionId:        string;
    collectionName:      string;
    created:             Date | string;
    updated:             Date | string;
    descripcion:         string;
    fecha_init:          Date;
    departamento:        string;
    usuario_creador:     string;
    archivos:            string[];
    usuario_responsable: string;
    lista:               string;
    fecha_fin:           Date | string;
    index:               string | number;
    proyecto:            string;
    usuario_last_update: string;
    foto:                string;
}


export interface List {
    id:                  string;
    collectionId:        string;
    collectionName:      string;
    created:             Date;
    updated:             Date;
    name:                string;
    index:               string | number;
    proyecto:            string;
    usuario_last_update: string;
    tipo:                string;
    usuario_creador:     string;
    departamento:        string;
}

export interface Proyecto {
    id:             string;
    collectionId:   string;
    collectionName: string;
    created:        Date;
    updated:        Date;
    name:           string;
    estatus:        string;
    departamento:   string;
    description:    string;
    image:          string;
}

export interface TipoLista {
    id:             string;
    collectionId:   string;
    collectionName: string;
    created:        Date;
    updated:        Date;
    name:           string;
    descripcion:    string;
}



export interface RequestCreateList {
    id:                  string;
    name:                string;
    index:               string | number;
    proyecto:            string;
    usuario_last_update: string;
    tipo:                string;
    usuario_creador:     string;
}
export interface RequestCreateTask {
    id:                  string;
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
export interface  RequestCreateProyecto {
    name:         string;
    estatus:      string;
    departamento: string;
    description:  string;
    image:        string;
}


