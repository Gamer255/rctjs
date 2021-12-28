import React, {useEffect, useRef, useState} from 'react';
import MyModal from "./UI/modal/MyModal";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import MyButton from "./UI/button/MyButton";

const CheckList = () => {

    const [tasks, setTasks] = useState([])
    const [modal, setModal] = useState(false)
    const webSocket = useRef(null);



    const send = function (type, task) {
        webSocket.current.send(JSON.stringify({
            Type: type,
            Task: task
        }));
    }

    useEffect(() => {
        const url = 'ws://localhost:8080/ws';
        webSocket.current = new WebSocket(url);

        webSocket.current.onmessage = async function(msg){
            try {
                const message = JSON.parse(msg.data)

                switch (message?.type) {
                    case "GetTasks":
                        console.log("GetTasks message: ", message.tasks)
                        setTasks(message.tasks)
                        break
                    case "PostTask":
                        console.log("PostTask message: ", message.task)
                        setTasks((tasks)=>[...tasks, message.task])
                        break
                    case "ModTaskStatus":
                        console.log("ModTaskStatus message: ", message.task)
                        setTasks((tasks)=> (tasks.map(task => {
                            if (task.id === message.task.id) {
                                task.taskStatus = message.task.taskStatus
                            }
                            return task
                        })))
                        break
                    case "ModTask":
                        console.log("ModTask message: ", message.task)
                        setTasks((tasks)=> (tasks.map(task => {
                            if (task.id === message.task.id) {
                                task.taskName = message.task.taskName
                                task.taskDescription = message.task.taskDescription
                            }
                            return task
                        })))
                        break
                    case "DelTask":
                        console.log("DelTask message: ", message.task)
                        setTasks((tasks)=> (tasks.filter(p => p.id !== message.task.id)))
                        break
                }
            }
            catch (e){
                console.log(e)
            }
        }

        webSocket.current.onopen = function () {
            console.log("WebSocket is ready to work")
            send("GetTasks", "")
        }
    }, [])

    const createTask = (t) => {
        setModal(false)
        send("PostTask", t)
    }

    const removeTask = (t) => {
        send("DelTask", t)
    }

    const checkTask = (t) => {
        t.taskStatus = !t.taskStatus
        send("ModTaskStatus", t)
    }

    const editTask = (t) => {
        send("ModTask", t)
    }

    return (
        <div className="App">
            <hr style={{margin: "10px 0"}}/>

            <MyModal visible={modal} setVisible={setModal}>
                <TaskForm create={createTask}/>
            </MyModal>

            <TaskList remove={removeTask} check={checkTask} edit={editTask} tasks={tasks} taskListName="Список задач"/>

            <div style={{textAlign: "center"}}>
                <MyButton onClick={() => setModal(true)} style={{marginTop: 10}}>
                    Добавить новую задачу
                </MyButton>
            </div>


            <hr style={{margin: "10px 0"}}/>
        </div>
    );
};

export default CheckList;