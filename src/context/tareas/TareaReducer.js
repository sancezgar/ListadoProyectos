import {
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREAS_PROYECTO,
    TAREA_ACTUAL,
    VALIDAR_TAREA,
} from '../../types/index'
// eslint-disable-next-line
export default (state, action) => { 
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [
                    ...state.tareas,
                    action.payload
                ],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
        case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
                tareaseleccionada: null
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }
        default:
            return state;
    }
}