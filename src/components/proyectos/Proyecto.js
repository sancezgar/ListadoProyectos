import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

const Proyecto = ({ proyecto }) => {

    //Obtenemos el state de proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    // Funcion para agrefar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto Actual
        obtenerTareas(id); //Obtiene las tareas del id
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => { seleccionarProyecto(proyecto.id) }}
            >
                {proyecto.nombre}
            </button>
        </li>
    );

}

export default Proyecto;