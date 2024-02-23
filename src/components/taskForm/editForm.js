import { useState } from 'react';
import './taskForm.css';


function EditForm({editingTodo, task}) {

    const [taskValue, setTaskValue] = useState(task.task);

    const handleChange = (event) => {
        event.preventDefault();
        editingTodo(taskValue, task.id);
    }

    return(
        <form onSubmit={handleChange}>
            <div className='taskForm'>
                <input className='taskForm-input'
                    type='text' 
                    placeholder='Update task'
                    value={taskValue}
                    onChange={value => setTaskValue(value.target.value)}
                />
                <button className='taskForm-input-button' type='submit'>Update task</button>
            </div> 
        </form>
    )
}

export default EditForm;