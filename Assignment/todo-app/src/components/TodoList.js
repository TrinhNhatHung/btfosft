import React, { useRef, useState } from 'react';
import './TodoList.css';

function TodoList() {
    const input = useRef();
    const [todos, setTodos] = useState([
        {
            content: "To do 1",
            isCompleted: false
        },
        {
            content: "To do 2",
            isCompleted: true
        }
    ]);

    const removeItem = (index, event) => {
        let tmpTodos = todos.filter((item, currentIndex) => currentIndex !== index);
        setTodos(tmpTodos);
        event.stopPropagation();
    };

    const toggleItem = (index) => {
        let tmpTodos = [...todos];
        tmpTodos[index].isCompleted = !tmpTodos[index].isCompleted;
        setTodos(tmpTodos);
    }

    const addItem = (item) => {
        let tmpTodos = [...todos];
        tmpTodos.push({
            ...item,
            id: todos.length
        });
        setTodos(tmpTodos);
        input.current.value = "";
    }

    const keyPresEnter = (event) => {
        if (event.key === 'Enter') {
            addItem({
                content: input.current.value,
                isCompleted: false
            })
        }
    }

    return (
        <div>
            <h1>To-Do List</h1>
            <p>Enter text into the input field to add items to your list</p>
            <p>Click the "X" to remove the item from your list</p>
            <p>Click the item to mark it as complete</p>
            <div>
                <input
                    className="input" type="text" placeholder="Input to do" ref={input}
                    onKeyPress={keyPresEnter}
                />
                <i
                    className="fas fa-plus add-icon"
                    onClick={() => addItem({
                        content: input.current.value,
                        isCompleted: false
                    })}
                ></i>
            </div>
            <div className="todos">
                {
                    todos.map((item, index) => {
                        return <div className="todo" key={index} onClick={() => toggleItem(index)}>
                            <p className="content">{item.content + (item.isCompleted === true ? " (completed)" : "")}</p>
                            <i className="fas fa-times delete" onClick={(event) => removeItem(index, event)}></i>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default TodoList;