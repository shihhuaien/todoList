import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';




const initialTodoList = () => {
    const data = JSON.parse(localStorage.getItem("todoList"));
    if (!data) { return [] }
    return data;
}

export default function TodoList() {
    const [todoList, setTodoList] = useState(initialTodoList);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList])

    function removeTodo(id) {
        setTodoList((prevTodoList) => {
            return prevTodoList.filter((t) => t.id !== id)
        })
    }

    function toggleTodo(id) {
        setTodoList((prevStatus) => {
            return prevStatus.map((t) => {
                if (t.id === id) {
                    return { ...t, completed: !t.completed }
                }
                else { return t }
            })
        })
    }

    function addTodo(text) {
        setTodoList(prevStatus => {
            return [...prevStatus, { text: text, id: uuidv4(), completed: false }]
        })
    }

    return (
        <Box display="flex"
            justifyContent="center"
            minHeight="100vh" >
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m: 2 }}>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    任務列表
                </Typography>
                <List>
                    {todoList.map((todo) => (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            removeTodo={() => removeTodo(todo.id)}
                            toggleTodo={() => toggleTodo(todo.id)} />
                    ))}
                    <TodoForm addTodo={addTodo} />
                </List>
            </Box>

        </Box >
    )
}




