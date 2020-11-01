import React, { Fragment, useContext } from 'react'; 
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext'

const ListadoTareas = () => { 

    const proyectoContext = useContext(ProyectoContext);
    const {proyecto, eliminaProyecto} = proyectoContext;

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //array desctructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    const tareasProyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir plataforma de pago', estado: false},
        {nombre: 'Elegir Hosting', estado: true},
    ];

     return (
         <Fragment>
             
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :  tareasProyecto.map(tarea => (
                            <Tarea tarea={tarea} />
                        ))
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={()=>{eliminaProyecto(proyectoActual.id)}}
            >Eliminar Proyecto &times;</button>
                    
         </Fragment>
     );

}

export default ListadoTareas;