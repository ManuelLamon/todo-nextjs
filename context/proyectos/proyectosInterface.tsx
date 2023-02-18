export interface ProyectoContextProps {
    List: List[] ;
    setList: (e:List[]) => void;
    TaskList: Task[];
    setTaskList:(e:Task[]) => void;
    Tasks: Tasks ;
    setTasks:(e:Tasks) => void;
}

export interface Tasks {
    [key: string]:any[]
}

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
    index:               string |number;
    proyecto:            string;
}

export interface List {
    id:             string;
    collectionId:   string;
    collectionName: string;
    created:        Date;
    updated:        Date;
    nombre:         string;
    proyecto:       string;
    index:          string | number;
}
