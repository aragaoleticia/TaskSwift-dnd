import React, { useEffect, useRef, useState } from "react";
import './cards.css';
import { Droppable } from 'react-beautiful-dnd'
import Todo from '../Todo/todo';
import TaskForm from "../taskForm/taskForm";
import AddTodo from "../AddTodo/addtodo";

function Cards({label,
            tasks, 
            status,
            toggleCompleted,
            deleteTask, 
            editTask, 
            editingTodo, 
            index, 
            showCreateField, 
            addTodo,
            addColumnsNameToMap,
            })
    {
    
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [hiddeAddTodo, setHiddeAddTodo] = useState(true);
    const inputRef = useRef();

    const handleCardClick = () => {
        setShowTaskForm(true);
        setHiddeAddTodo(false);
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!event.target.closest('.addTodo') && !event.target.closest('.taskForm')){
                setShowTaskForm(false);
                setHiddeAddTodo(true);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if(showTaskForm){
            inputRef.current.focus();
        }

    }, [showTaskForm]);


    const [textColumnName, setTextName] = useState(label);

    const handleChange = (event) => {
        event.preventDefault()
        addColumnsNameToMap(event.target.value, index)
        setTextName(event.target.value);
    };

    return(
        <Droppable droppableId={status} index={index} key={status}>
            {
                (provided) => (
                    <div 
                        className='container-cards'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    
                        <div className='card'>
                            <input
                                className="card-input"
                                type="text"
                                value={textColumnName}
                                onChange={handleChange}
                            ></input>
                            {
                            showCreateField ? 
                                (
                                    <>
                                            {hiddeAddTodo && <AddTodo handleCardClick={handleCardClick}/>}
                                            {showTaskForm && <TaskForm addTodo={addTodo} inputRef={inputRef}/>}
                                        </>
                                ) : null
                            }

                            {
                                tasks.filter(task => task.status === status).map((task, index) => (
                                <Todo
                                    task={task}
                                    key={index}
                                    toggleCompleted={toggleCompleted}
                                    deleteTask={deleteTask}
                                    editTask={editTask}
                                    editingTodo={editingTodo}
                                    index={index}
                                />
                                ))
                            }
                        </div>
                        
                        {provided.placeholder}
                    </div>
            )}
        </Droppable>
    )
};


export default Cards;