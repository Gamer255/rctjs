import React, {useState} from 'react';
import MyModal from "./UI/modal/MyModal";
import EditTaskForm from "./EditTaskForm";

const TaskItem = (props) => {

    const taskClasses = ["task"]
    const [modal, setModal] = useState(false)

    if (props.task.taskStatus) {
        taskClasses. push("task__green")
    }

    const editTask = (editedTask) => {
        props.edit(editedTask)
        setModal(false)
    }

    return (
        <div className={taskClasses.join(" ")}>
            <div className="task_checkbox">
                <input type="checkbox" checked={props.task.taskStatus} onChange={() => props.check(props.task)}/>
            </div>

            <div className="task__content">
                <strong style={{fontSize: "18px"}}>{props.number}. {props.task.taskName}</strong>
                <div>
                    {props.task.taskDescription}
                </div>
            </div>

            <div className="task__btns">
                <button onClick={() => props.edit(props.task)} onClick={() => setModal(true)} className="mod__btn"></button>

                <MyModal visible={modal} setVisible={setModal}>
                    <EditTaskForm edit={editTask} oldTask={props.task}/>
                </MyModal>

                <button onClick={() => props.remove(props.task)} className="del__btn"></button>
            </div>
        </div>
    );
};

export default TaskItem;