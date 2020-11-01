import React, { useReducer } from 'react';

import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
       } from '../../types';

import {v4 as uuid} from 'uuid'

const ProyectoState = props => {

    const proyectos = [
        {id:1, nombre: 'Tienda Virtual'},
        {id:2, nombre: 'Intranet'},
        {id:3, nombre: 'Diseño de Sitio Web'}
    ]

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null
    }

    //Dispach para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer,initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario =  () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuid();
        
        //Insetar el proyecto desde un dispatch
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
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
    const eliminaProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
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