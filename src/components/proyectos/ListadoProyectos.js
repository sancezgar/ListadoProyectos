import React, { useContext, useEffect } from 'react'; 
import Proyecto from './Proyecto'; 

import ProyectosContext from '../../context/proyectos/ProyectoContext';

const ListadoProyectos = () => { 


    //Extraer proyectos de state oficial
    const proyectosContext = useContext(ProyectosContext);
    const {proyectos, obtenerProyectos} = proyectosContext;

    //Obtener proyectos cuando carga el componente
    useEffect(()=>{
        obtenerProyectos()
    },[]);

    //Revisamos si hay proyectos
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

     return (

        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto 
                    key={proyecto.id}
                    proyecto = {proyecto}
                />
            ))}
        </ul>

     );

}

export default ListadoProyectos;