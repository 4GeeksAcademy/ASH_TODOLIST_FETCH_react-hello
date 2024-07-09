import React, {useState} from "react";

//create your first component
const Home = () => {
	let [task, setTask] = useState("");
	let [list, setList] = useState([]);

	const handleKeyDown = (e) => {
        if (e.key === "Enter") {
			task === "" ? alert("la tarea esta vacia, tontin") : setList(list.concat(task));
            setTask("");
            e.preventDefault();
        }
    };

	// function showButton() {

    // }

    function deleteTarea(index) {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    }

	return (
		<div className="text-center mt-4">
            <h1>ToDo LIST</h1>
            <div className="container w-50">
                <input className="form-control" type="text" aria-label="Username" aria-describedby="basic-addon1" value={task} onChange={(e)=>setTask(e.target.value)} onKeyDown={handleKeyDown} />
			{list.length === 0 ? (
                    <p>No tasks, add a task</p>
                ) : (
                    <ul className="list-group">
                        {list.map((valor, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{valor}<button type="button" className="btn-close float-end" aria-label="Close" onClick={() => deleteTarea(index)}></button></li>
                        ))}
                        <li className="list-group-item text-muted small text-start">{list.length} {list.length === 1 ? 'item left' : 'items left'}</li>
                    </ul>
                )}
            </div>
        </div>
	);
};

export default Home;

