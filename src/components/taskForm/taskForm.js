import { useState } from 'react';
import './taskForm.css';


function TaskForm({addTodo}) {

    const [taskValue, setTaskValue] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        addTodo(taskValue);
        setTaskValue('')
    }

    return(
        <form className='taskForm' onSubmit={handleChange}> 
            <div className='taskForm-input-button'>
                <input className='input'
                    type='text' 
                    placeholder='Write your task here'
                    value={taskValue}
                    onChange={value => setTaskValue(value.target.value)}
                />
                <button type='submit'>Add Task</button>
            </div>
        </form>
    )
}

export default TaskForm;
