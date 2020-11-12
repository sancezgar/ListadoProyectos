import React, { useReducer } from 'react';
import ClienteAxios from '../../config/Axios';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';


const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispach para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {

        try {
            const resultado = await ClienteAxios.get('/api/proyectos/');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })

        }
        
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await ClienteAxios.post('/api/proyectos', proyecto);
            //console.log(resultado);
            dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio clic
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina un proyecto
    const eliminaProyecto = async proyectoId => {
        try {
            await ClienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO, 
                payload: proyectoId
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario: mostrarFormulario,
                obtenerProyectos: obtenerProyectos,
                agregarProyecto: agregarProyecto,
                mostrarError: mostrarError,
                proyectoActual: proyectoActual,
                eliminaProyecto: eliminaProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )

}

export default ProyectoState;