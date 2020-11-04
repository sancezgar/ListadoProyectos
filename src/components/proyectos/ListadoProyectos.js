import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProyectosContext from '../../context/proyectos/ProyectoContext';

const ListadoProyectos = () => {


    //Extraer proyectos de state oficial
    const proyectosContext = useContext(ProyectosContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
        //eslint-disable-next-line
    }, []);

    //Revisamos si hay proyectos
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

    return (

        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
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