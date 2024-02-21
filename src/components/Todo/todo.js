import './todo.css';
import { Draggable } from 'react-beautiful-dnd'
import EditForm from '../taskForm/editForm';


function Todo({task, toggleCompleted, deleteTask, editTask, index, editingTodo}){

    const handleClick = () => {
        toggleCompleted(task.id)
    }


    return(
        <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided) => {
                if(task.isEditing) {
                    return (<EditForm key={task.id} task={task} editingTodo={editingTodo} />)
                } else {
                    return (
                        <div  className={`todo ${task.completed ? 'completed':''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            
                        >

                            <img src="/img/check.png" alt="Check icon" onClick={handleClick}/>
                            <p> 
                                {task.task}
                            </p>
                            <div className="img-edit-trash">
                                <img src='/img/pen-edit.png' alt="pen edit icon"
                                    onClick={() => editTask(task.id)}
                                />
                                <img src="/img/trash.png" alt="trash icon"
                                    onClick={() => deleteTask(task.id)}
                                />
                            </div>
                        </div>
                        
                    )
                }
            }}
        </Draggable>
    )
}

export default Todo;


