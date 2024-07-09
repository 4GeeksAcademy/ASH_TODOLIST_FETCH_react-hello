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
            obtenerTareas();
        }
    };

    function obtenerTareas() {
        fetch(urlAPI4geeks+'/users/agusotoholt', {
            method:'GET',
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> response.json())
        .then((data)=> setList(data.todos))
        .catch((error)=> console.log(error))
    }

    function crearTareas() {
        fetch(urlAPI4geeks+'/todos/agusotoholt', {
            method:'POST',
            body: JSON.stringify({"label": task, "is_done": false}),
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> response.json())
        .then((data)=> console.log(data))
        .catch((error)=> console.log(error))
    }

    function borrarTareas(item) {
        fetch(urlAPI4geeks+'/todos/'+item.id, {
            method:'DELETE',
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> response.json())
        .then((data)=> console.log(data))
        .catch((error)=> console.log(error))
    }

    function crearUsuario() {
        fetch(urlAPI4geeks+'/users/agusotoholt', {
            method:'POST',
            headers:{"Content-Type": "application/json"}
        })
        .then((response)=> response.json())
        .then((data)=> console.log(data))
        .catch((error)=> console.log(error))
    }

//aca antes del return van los useEffect

    useEffect (() => {
        // crearUsuario(); //lo comento porque el usuario ya esta creado, pero hay que hacerlo al ejecutarla un nuevo dia
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
                    <ul className="list-group">
                        {list.map((item, index) => (
                            <li 
                            key={index} 
                            className="list-group-item d-flex justify-content-between align-items-center" 
                            onMouseEnter={() => setHoverIndex(index)} 
                            onMouseLeave={() => setHoverIndex(null)}>
                            {item.label}{hoverIndex === index ? (<button type="button" className="btn-close float-end" aria-label="Close" onClick={() => {borrarTareas(item); obtenerTareas();}}></button>) : null}
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

