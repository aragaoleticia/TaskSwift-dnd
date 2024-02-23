import { useState } from 'react';
import './taskForm.css';


function TaskForm({addTodo, inputRef}) {

    const [taskValue, setTaskValue] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        addTodo(taskValue);
        setTaskValue('')
    }

    return(
        <form  onSubmit={handleChange}> 
            <div className='taskForm'>
                <input className='taskForm-input'
                    type='text' 
                    placeholder='Write your task here'
                    ref={inputRef}
                    value={taskValue}
                    onChange={value => setTaskValue(value.target.value)}
                />
                <button  className='taskForm-input-button' type='submit'>Add Task</button>
            </div>
        </form>
    )
}

export default TaskForm;
