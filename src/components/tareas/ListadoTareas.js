import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminaProyecto } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { tareasproyecto } = tareaContext;

    //si no hay proyecto seleccionado
    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    //array desctructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    return (
        <Fragment>

            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                                <Tarea tarea={tarea} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => { eliminaProyecto(proyectoActual._id) }}
            >Eliminar Proyecto &times;</button>

        </Fragment>
    );

}

export default ListadoTareas;