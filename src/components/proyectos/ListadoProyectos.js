import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertaContext from '../../context/alertas/AlertaContext'

import ProyectosContext from '../../context/proyectos/ProyectoContext';

const ListadoProyectos = () => {


    //Extraer proyectos de state oficial
    const proyectosContext = useContext(ProyectosContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    //Revisamos si hay proyectos
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

    return (

        <ul className="listado-proyectos">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

    );

}

export default ListadoProyectos;