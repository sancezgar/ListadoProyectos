import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import ClienteAxios from '../../config/Axios';
import TokenAuth from '../../config/TokenAuth';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando:true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            
            const respuesta = await ClienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            usuarioAutenticado();
            
        } catch (error) {
            console.log('error: ',error);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }


    //Retorna el usuario autenticado
    const usuarioAutenticado = async() => {
        const token = localStorage.getItem('token');
        if(token) {
            TokenAuth(token);
        }

        try {

            const respuesta = await ClienteAxios.get('/api/auth');
            // console.log(respuesta.data);
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            //console.log(error.response);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    //cuando el usuario inicia sesion
    const iniciarSesion = async datos => {

        try {
            
            const respuesta = await ClienteAxios.post('api/auth',datos);
            //console.log(respuesta);

            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            })

            //Obtener usuario
            usuarioAutenticado();

        } catch (error) {
            console.log('error: ',error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }

    }

    //Cierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }




    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthState;