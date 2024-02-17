import React, { useEffect, useState } from "react";
import './cards.css';
import { Droppable } from 'react-beautiful-dnd'
import Todo from '../Todo/todo';
import TaskForm from "../taskForm/taskForm";
import AddTodo from "../taskCard/addtodo";

function Cards({label, tasks, status, toggleCompleted, deleteTask, editTask, editingTodo, index, showCreateField, addTodo}){
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [hiddeAddTodo, setHiddeAddTodo] = useState(true);

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

    return(
        <Droppable droppableId={status} index={index}>
            {
                (provided) => (
                    <div className='container-cards'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        <div className='card'>
                            <textarea placeholder={label}></textarea>
                            {
                            showCreateField ? 
                                (
                                    <>
                                            {hiddeAddTodo && <AddTodo handleCardClick={handleCardClick}/>}
                                            {showTaskForm && <TaskForm addTodo={addTodo}/>}
                                        </>
                                ) : null
                            }

                            {
                                (tasks || []).filter(task => task.status === status).map((task, index) => (
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
                    </div>
            )}
        </Droppable>
    )
}


export default Cards;