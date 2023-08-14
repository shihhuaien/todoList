import { useState } from "react";
import { TextField, Button, InputAdornment, IconButton, ListItem } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import Create from "@mui/icons-material/Create";

export default function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({ text: '' })

    function changeState(evt) {
        setTodo({ ...todo, [evt.target.name]: evt.target.value })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        addTodo(todo.text); // 傳遞todo.text
        setTodo({ text: "" })
    }

    return (
        <ListItem>
            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={changeState}
                    value={todo.text}
                    name="text"
                    id="outlined-basic"
                    label="任務名稱"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="create todo" edge="end" type="submit">
                                    <Create />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </ListItem >)
}

