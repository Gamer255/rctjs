import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const EditTaskForm = ({edit, oldTask}) => {
    const [task, setTask] = useState({
        id: oldTask.id,
        taskName: oldTask.taskName,
        taskDescription: oldTask.taskDescription
    })

    const editTask = (e) => {
        e.preventDefault()
        {task.taskName === "" || task.taskDescription === ""
                ?
                console.log("Поля ввода не могут быть пустыми")
                :
                edit(task)
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
            <MyButton onClick={editTask}>Добавить задачу</MyButton>
        </form>
    );
};

export default EditTaskForm;