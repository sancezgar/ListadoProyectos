import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import {
    AGREGAR_TAREA,
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types/index';

import {v4 as uuid} from 'uuid';

const TareaState = props => {

    const initialState = {
        tareas: [
            { id:1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
            { id:2, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
            { id:3, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3 },
            { id:4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4  },
            { id:5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 4 },
            { id:6, nombre: 'Elegir Colores', estado: false, proyectoId: 3 },
            { id:7, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 2 },
            { id:8, nombre: 'Elegir Hosting', estado: true, proyectoId: 1  },
            { id:9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 3 },
            { id:10, nombre: 'Elegir Colores', estado: false, proyectoId: 4 },
            { id:11, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 1 },
            { id:12, nombre: 'Elegir Hosting', estado: true, proyectoId: 2  },
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = proyectoId => {
        dispatch({
            type:TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    const agregarTarea = tarea => {
        tarea.id = uuid();
        dispatch({
            type:AGREGAR_TAREA,
            payload: tarea
        });
        obtenerTareas(tarea.proyectoId);
    }

    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }

    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
        obtenerTareas(tarea.proyectoId);
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );

}

export default TareaState;