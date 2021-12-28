import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const TaskForm = ({create}) => {
    const [task, setTask]= useState({taskName: '', taskDescription: '', taskStatus: false})

    const addNewTask = (e) => {
        e.preventDefault()
        if (task.taskName === "" || task.taskDescription === "") {
            console.log("Поля ввода не могут быть пустыми")
        }
        else{
            create({...task})
            setTask({taskName: "", taskDescription: "", taskStatus: false})
        }
    }

    return (
        <form>
            <MyInput
                value={task.taskName}
                onChange={e => setTask({...task, taskName: e.target.value})}
                type="text"
                placeholder="Название задачи"
            />
            <MyInput
                value={task.taskDescription}
                onChange={e => setTask({...task, taskDescription: e.target.value})}
                type="text"
                placeholder="Описание задачи"
            />
            <MyButton onClick={addNewTask}>Добавить задачу</MyButton>
        </form>
    );
};

export default TaskForm;