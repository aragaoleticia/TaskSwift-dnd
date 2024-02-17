import React, { useState } from 'react';
import './taskcard.css';
import { v4 as uuidv4 } from 'uuid';
import Cards from '../Cards/cards';
import { DragDropContext } from 'react-beautiful-dnd'

const TaskCard = () => {
    const defaultColumns = [
        {
            name: 'Todo',
            status: 'TODO'
        },
        {
            name: 'Doing',
            status: 'DOING'
        },
        {
            name: 'Done',
            status: 'DONE'
        }
    ]

    const initialTasks = new Map()
    defaultColumns.forEach(column => {
        initialTasks.set(column.status, [])
    })

    const [tasks, setTasks] = useState(initialTasks);

    const addTodo = (taskName) => {
        const todos = [
            ...tasks.get('TODO'),
            {
                task: taskName,
                id: uuidv4(),
                completed: false,
                isEditing: false,
                status: 'TODO',
                position: tasks.length
            }
        ]

        const newTasks = new Map([...tasks]);
        newTasks.set('TODO', todos)
        setTasks(newTasks);
    };
    

    const toggleCompleted = id => {
        const foundTask = findTaskById(tasks, id)

        const taskList = tasks.get(foundTask.status)
            .map(task => {
                if(task.id == id) {
                    return {...task, completed: !task.completed}
                } else {
                    return task
                }
            })

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)

        setTasks(newTasks)
    };

    const deleteTask = id => {
        const foundTask = findTaskById(tasks, id)
        const taskList = tasks.get(foundTask.status)
            .filter(task => task.id !== id)

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)
    
        setTasks(newTasks)
    };

    const editTask = (id) => {
        const foundTask = findTaskById(tasks, id)
        const taskList = tasks.get(foundTask.status)
            .map(task => {
                if(task.id === id) {
                    return {...task, isEditing: true}
                } else {
                    return task
                }
            })

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)
    
        setTasks(newTasks)
    };

    const editingTodo = (newName, id) => {
        const foundTask = findTaskById(tasks, id)
        const taskList = tasks.get(foundTask.status)
            .map(task => {
                if(task.id === id) {
                    return {...task, task: newName, isEditing: false}
                } else {
                    return task
                }
            })

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)
    
        setTasks(newTasks)
    };

    const findTaskById = (tasksMap, taskId) => {
        return defaultColumns
        .map(
            column => tasksMap.get(column.status).find(task => task != null && task.id == taskId)
        ).find(task => task != null)
    }

    const onDragCompleted = (result) => {
        if(!result.destination) {
            return
        }

        const sourceStatus = result.source.droppableId
        const targetStatus = result.destination.droppableId
        const toBeRemovedTaskIndex = result.source.index
        const destinationIndex = result.destination.index
        const taskId = result.draggableId

        const foundTask = findTaskById(tasks, taskId)

        const newTask = {...foundTask, status: targetStatus}

        const sourceList = [...tasks.get(foundTask.status)]
        sourceList.splice(toBeRemovedTaskIndex, 1)

        let targetList
        if(sourceStatus === targetStatus) {
            targetList = sourceList
        } else {
            targetList = [...tasks.get(targetStatus)]
        }

        targetList.splice(destinationIndex, 0, newTask)

        const newTasks = new Map([...tasks]);

        newTasks.set(sourceStatus, sourceList)
        newTasks.set(targetStatus, targetList)

        setTasks(newTasks)
    }

    return(
        <DragDropContext onDragEnd={onDragCompleted}>
            <div className='container'>
                {
                    defaultColumns.map((column, index) => {
                        return (
                            <Cards showCreateField={index === 0} label={column.name} index={index} status={column.status} tasks={tasks.get(column.status)} toggleCompleted={toggleCompleted} deleteTask={deleteTask} editTask={editTask} editingTodo={editingTodo} addTodo={addTodo}/>
                        )
                    })
                }
            </div>
        </DragDropContext>
    )
}

export default TaskCard;