import React, { useContext, useEffect, useState } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    const {nombre} = tarea;

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, actualizarTarea } = tareaContext;

    //Efect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada]);

    if (!proyecto) return null;

    //Realizamos destructuring al arreglo de proyecto
    const [proyectoActual] = proyecto;

    const onChangeTarea = e =>{
        
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Si es edicion o si es nueva tarea
        if(tareaseleccionada === null){ // tarea nueva
            tarea.proyectoId=proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else{ // actualizar tarea seleccionada
            actualizarTarea(tarea);
        }

        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio </p> : null}

            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text"
                        className="input-text"
                        placeholder="Nombre Tarea ..."
                        name="nombre"
                        value={nombre}
                        onChange={onChangeTarea} />
                </div>

                <div className="contenedor-input">
                    <input type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'} />
                </div>
            </form>
        </div>
    );

}

export default FormTarea;