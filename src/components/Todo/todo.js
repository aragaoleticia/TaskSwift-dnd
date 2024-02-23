import './todo.css';
import { Draggable } from 'react-beautiful-dnd'
import EditForm from '../taskForm/editForm';
import { ReactComponent as CheckImg } from "bootstrap-icons/icons/check-square-fill.svg";
import { ReactComponent as PencilEdit } from "bootstrap-icons/icons/pencil-square.svg";
import { ReactComponent as DeleteX } from "bootstrap-icons/icons/file-earmark-x-fill.svg";

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
                            <CheckImg alt='check icon' className='img-check'  onClick={handleClick}/>
                            <p> 
                                {task.task}
                            </p>
                            <div>
                                <PencilEdit className='img-edit-trash' onClick={() => editTask(task.id)}/>
                                <DeleteX className='img-edit-trash' onClick={() => deleteTask(task.id)}/>
                            </div>
                        </div>
                        
                    )
                }
            }}
        </Draggable>
    )
}

export default Todo;


