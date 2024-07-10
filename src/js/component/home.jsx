import React, {useState, useEffect} from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [editId, setEditId] = useState(null);
	const [editLabel, setEditLabel] = useState("");
    const urlAPI4geeks = 'https://playground.4geeks.com/todo'

	const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            task === "" ? alert("la tarea esta vacia, tontin") : crearTareas();
            setTask("");
            e.preventDefault();
            }
    };

    const handleKeyDownEdit = (e) => {
        if (e.key === "Enter") {
            editLabel === "" ? alert("la tarea esta vacia, tontin") : editarTareas(editId);
            const modal = document.getElementById('staticBackdrop');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
            setEditLabel("");
            e.preventDefault();
            }
    };

    function handleClickEditId(item) {
        setEditId(item);
    }

    function handleClickEditLabel(item) {
        setEditLabel(item);
    }

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

    function editarTareas(id) {
        fetch(urlAPI4geeks+'/todos/'+id, {
            method:'PUT',
            body: JSON.stringify({"label": editLabel, "is_done": true}),
            headers:{"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return false; 
        })
        .then((data)=> {
            if (data) {
                setList(list.map(item => item.id === id ? { ...item, label: editLabel } : item));
                return null;
            }
            alert("no hubo nada");
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
        if (window.confirm("are you sure you want to remove the selected task?")) {
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
    }}

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
                            {item.label}{hoverIndex === index ? (
                                <div>
                                <button type="button" className="btn btn-sm btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {handleClickEditId(item.id); handleClickEditLabel(item.label)}}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-sm btn-link" onClick={() => {borrarTareas(item.id);}}>
                                    Remove
                                </button>
                                </div>)
                                : null}
                            </li>
                        ))}
                        <li className="list-group-item text-muted small text-start">{list.length} {list.length === 1 ? 'item left' : 'items left'}</li>
                    </ul>
                )}
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Current Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" type="text" aria-label="Username" aria-describedby="basic-addon1" value={editLabel} onChange={(e)=>setEditLabel(e.target.value)} onKeyDown={handleKeyDownEdit} /></div>
                    <div className="modal-footer">
                        <p>Press "Enter" to Send Edit</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default Home;

