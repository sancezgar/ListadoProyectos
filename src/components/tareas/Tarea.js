import React, { useContext } from 'react';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({ tarea }) => {

    //Utilizar el context de tarea
    const tareaContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareaContext;

    //Funcion que se ejecuta cuando el usuario presiona el boton eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(tarea.proyectoId);
    }

    // Funcion que modifica el estado de la tarea
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        }
        else {
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);
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
                    onClick={() => tareaEliminar(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
    );

}

export default Tarea;