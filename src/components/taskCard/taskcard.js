import React, { useState } from 'react';
import '../Cards/cards.css';
import { v4 as uuidv4 } from 'uuid';
import Cards from '../Cards/cards';
import { DragDropContext } from 'react-beautiful-dnd'

const TaskCard = () => {    
    const saveTasksToLocalStorage = (newTaskMap) => {
        localStorage.setItem('tasks', JSON.stringify(Array.from(newTaskMap.entries())));
    }
    
    const getTasksFromLocalStorage = () => {
        const tasksEntries = localStorage.getItem('tasks');
        if(tasksEntries) {
            return new Map(JSON.parse(tasksEntries))
        } else {
            const initialColumns = [
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
            initialColumns.forEach(column => {
                initialTasks.set(column.status, [])
            })

            initialTasks.set('columns', initialColumns)

            return initialTasks;
        }
    }

    const getColumnsFromLocalStorage = () => {
        const tasks = getTasksFromLocalStorage()
        return tasks.get('columns')
    }

    const currentColumns = getColumnsFromLocalStorage();
    const initialTasks = getTasksFromLocalStorage();

    const [tasks, setTasks] = useState(initialTasks);


    const addColumnsNameToMap = (textColumnName, index) => {
        currentColumns[index].name = textColumnName

        const newTasks = new Map([...tasks])
        newTasks.set('columns', currentColumns)
        saveTasksToLocalStorage(newTasks)
        setTasks(newTasks)
    }

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
        saveTasksToLocalStorage(newTasks);
        setTasks(newTasks);
    };


    const toggleCompleted = id => {
        const foundTask = findTaskById(tasks, id)

        const taskList = tasks.get(foundTask.status)
            .map(task => {
                if(task.id === id) {
                    return {...task, completed: true}
                } else {
                    return task
                }
            })

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)
        saveTasksToLocalStorage(newTasks);
        setTasks(newTasks)
    };

    const deleteTask = id => {
        const foundTask = findTaskById(tasks, id)
        const taskList = tasks.get(foundTask.status)
            .filter(task => task.id !== id)

        const newTasks = new Map([...tasks]);
        newTasks.set(foundTask.status, taskList)
        saveTasksToLocalStorage(newTasks);
        setTasks(newTasks);
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
        saveTasksToLocalStorage(newTasks);
        setTasks(newTasks);
    };

    const findTaskById = (tasksMap, taskId) => {
        return currentColumns
        .map(
            column => tasksMap.get(column.status).find(task => task != null && task.id === taskId)
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

        saveTasksToLocalStorage(newTasks);
        setTasks(newTasks);
    }

    return(
        <DragDropContext onDragEnd={onDragCompleted} >
            <div className='container'>
                {
                    currentColumns.map((column, index) => {
                        return (
                            <Cards
                                key={column.status}
                                showCreateField={index === 0}
                                label={column.name} 
                                index={index}
                                status={column.status} 
                                tasks={tasks.get(column.status)} 
                                toggleCompleted={toggleCompleted} 
                                deleteTask={deleteTask} 
                                editTask={editTask} 
                                editingTodo={editingTodo} 
                                addTodo={addTodo}
                                addColumnsNameToMap={addColumnsNameToMap}
                            />
                        )
                    })
                }
            </div>
        </DragDropContext>
    )
}

export default TaskCard;