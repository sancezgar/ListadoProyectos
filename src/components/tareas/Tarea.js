import React, { useContext } from 'react';
import TareaContext from '../../context/tareas/TareaContext';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const Tarea = ({ tarea }) => {

    const proyectoContext = useContext(ProyectoContext);
    const {proyecto} = proyectoContext;

    const[proyectoActual] = proyecto;

    //Utilizar el context de tarea
    const tareaContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareaContext;

    //Funcion que se ejecuta cuando el usuario presiona el boton eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    // Funcion que modifica el estado de la tarea
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        }
        else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );

}

export default Tarea;