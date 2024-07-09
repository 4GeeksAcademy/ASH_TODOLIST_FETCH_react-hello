import React, {useState} from "react";

//create your first component
const Home = () => {
	let [task, setTask] = useState("");
	let [list, setList] = useState([]);

	const handleKeyDown = (e) => {
        if (e.key === "Enter") {
			task === "" ? alert("la tarea esta vacia, tontin") : setList(list.concat(task));
        }
        // e.preventDefault();
        // setTask("");
    };

	function handleSubmit(e) {
		e.preventDefault(); // Esto evita que se envie el formulario 
		setTask("")
	};

	function showButton() {
        return <button className="btn btn-outline-danger float-end"><i className="fa fa-trash"></i></button>
    }

	return (
		<div>
            <form className="input-group mb-3" onSubmit={handleSubmit}>
                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={task} onChange={(e)=>setTask(e.target.value)} onKeyDown={handleKeyDown} />
            </form>
        	<div>
			{list.length === 0 ? (
                    <p>No tasks, add a task</p>
                ) : (
                    <ul className="list-group">
                        {list.map((valor, index) => (
                            <li key={index} className="list-group-item">{valor}" </li>
                        ))}
                        {list.length === 1 ? (<li className="list-group-item">{list.length} item left</li>) : (<li className="list-group-item">{list.length} items left</li>)}
                    </ul>
                )}
            </div>
        </div>
	);
};

export default Home;

