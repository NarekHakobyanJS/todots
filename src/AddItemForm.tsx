import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const addTask = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is requred')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && title.trim()) {
            props.addItem(title)
            setTitle('')
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={!!error}
                type="text"
                label={'type value'}
                value={title}
                helperText={error}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addTask} color={'primary'}>
        <ControlPoint />
        </IconButton>
        </div>
    )
}

export default AddItemForm