import React, {useState, useEffect} from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const urlAPI4geeks = 'https://playground.4geeks.com/todo'

	const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            task === "" ? alert("la tarea esta vacia, tontin") : crearTareas();
            setTask("");
            e.preventDefault();
            }
    };

    function obtenerTareas() {
        fetch(urlAPI4geeks+'/users/agusotoholt', {
            method:'GET',
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> { 
            if (response.status === 404) {
                crearUsuario();
            }
            return response.json()})
        .then((data)=> setList(data.todos))
        .catch((error)=> console.log(error))
    }

    function editarTareas() {
        fetch(urlAPI4geeks+'/todos/agusotoholt', {
            method:'PUT',
            body: JSON.stringify({"label": task, "is_done": true}),
            headers:{"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            }
            return false; 
        })
        .then((data)=> {
            if (data) {            
                setList(list.concat(data)); 
                return null;
            }
            alert("no hubo respuesta");
        })
        .catch((error)=> console.log(error))
    }

    function crearTareas() {
        fetch(urlAPI4geeks+'/todos/agusotoholt', {
            method:'POST',
            body: JSON.stringify({"label": task, "is_done": false}),
            headers:{"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            }
            return false; 
        })
        .then((data)=> {
            if (data) {            
                setList(list.concat(data)); 
                return null;
            }
            alert("no hubo respuesta");
        })
        .catch((error)=> console.log(error))
    }

    function borrarTareas(id) {
        fetch(urlAPI4geeks+'/todos/'+id, {
            method:'DELETE',
            headers:{"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.status === 204) {
                return response;
            }
            return false;
        })
        .then((data)=>{
            if (data) {           
                setList(list.filter(item => item.id !== id)); 
                return null;
            }
            alert("no hubo respuesta");
        })
        .catch((error)=> console.log(error))
    }

    function crearUsuario() {
        fetch(urlAPI4geeks+'/users/agusotoholt', {
            method:'POST',
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> response.json())
        .catch((error)=> console.log(error))
    }

    useEffect (() => {
        obtenerTareas();
    }, [])

	return (
		<div className="text-center mt-4">
            <h1>ToDo LIST</h1>
            <div className="container w-50">
                <input className="form-control" type="text" aria-label="Username" aria-describedby="basic-addon1" value={task} onChange={(e)=>setTask(e.target.value)} onKeyDown={handleKeyDown} />
			{list.length === 0 ? (
                    <p>No tasks, add a task</p>
                ) : (
                    <ul className="list-group shadow bg-body-tertiary rounded">
                        {list.map((item, index) => (
                            <li 
                            key={item.id} 
                            className="list-group-item d-flex justify-content-between align-items-center" 
                            onMouseEnter={() => setHoverIndex(index)} 
                            onMouseLeave={() => setHoverIndex(null)}>
                            {item.label}{hoverIndex === index ? (<button type="button" className="btn-close float-end" aria-label="Close" onClick={() => {borrarTareas(item.id);}}></button>) : null}
                            </li>
                        ))}
                        <li className="list-group-item text-muted small text-start">{list.length} {list.length === 1 ? 'item left' : 'items left'}</li>
                    </ul>
                )}
            </div>
        </div>
	);
};

export default Home;

