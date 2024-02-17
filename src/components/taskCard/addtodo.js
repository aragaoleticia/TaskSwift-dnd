import React from "react";
import './addtodo.css';

function AddTodo({handleCardClick}){

    return(
        <div className="addTodo" onClick={() =>handleCardClick()} >
            <img src="/img/plus.png" alt="Plus icon"/>
            <p> Add a task </p>
        </div>
    )
}

export default AddTodo;
