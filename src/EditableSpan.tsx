import { TextField } from "@mui/material"
import { useState, ChangeEvent } from "react"

type EditableSpanPropsType = {
    title : string,
    onChange : (newValue : string) => void
}

function EditableSpan(props : EditableSpanPropsType){
    const [editeMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const activeEditeMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e : ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <>
        {
            editeMode
            ? <TextField 
            value={title} 
            onChange={onChangeTitleHandler}
            onBlur={activeViewMode} autoFocus/> 
            : 
            <span onDoubleClick={activeEditeMode}>{props.title}</span>
        }
        
        </>

    )
}

export default EditableSpan