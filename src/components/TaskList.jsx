import React from 'react';
import TaskItem from "./TaskItem";

const TaskList = ({tasks, taskListName, remove, check, edit}) => {
    return (
        <div>
            {tasks.length !== 0
                ?
                <div className="task__list">
                    <h1 style={{textAlign: "center"}}>
                        {taskListName}
                    </h1>
                    {tasks.map((task, index) =>
                        <TaskItem remove={remove} check={check} edit={edit} number={index + 1} task={task}
                                  key={task.id}/>
                    )}
                </div>
                :
                <h1 style={{textAlign: "center"}}>
                    Задачи не найдены!
                </h1>
            }
        </div>
    )
};

export default TaskList;