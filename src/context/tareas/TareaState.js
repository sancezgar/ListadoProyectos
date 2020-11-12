import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import {
    AGREGAR_TAREA,
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types/index';
import ClienteAxios from '../../config/Axios';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {
        try {
            const resultado = await ClienteAxios.get(`/api/tareas`, { params: { proyecto } });

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });

        } catch (error) {
            console.log(error.response);
        }

    }

    const agregarTarea = async tarea => {

        try {
            await ClienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
            obtenerTareas(tarea.proyectoId);

        } catch (error) {
            console.log(error.response);
        }


    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {

        try {
            await ClienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
            
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error.response);
        }

    }


    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await ClienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
            obtenerTareas(tarea.proyecto);
        } catch (error) {
            console.log(error.response);
        }
        
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );

}

export default TareaState;