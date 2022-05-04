import Cross from '../../../../src/images/icon-cross.svg';
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const DisplayTask = (props) => {
    const [deleted, setDeleted] = useState(false);
    let task = useRef(null);
    let check = useRef(null);
    let checkBtn = useRef(null);
    let containerInput = useRef(null);
    let label = useRef(null);
    let deleteCount = 0;

    useEffect(() => {
        const verifyTheme = () => {
            if (props.isThemeActived) {
                task.current.style.backgroundColor = 'hsl(235, 24%, 19%)';
                label.current.style.color = 'hsl(236, 33%, 92%)';
                containerInput.current.style.borderBottom = ' 1px solid hsl(237, 14%, 26%)';
            } else {
                task.current.style.backgroundColor = 'hsl(0, 0%, 98%)';
                label.current.style.color = 'hsl(235, 21%, 11%)';
                containerInput.current.style.borderBottom = ' 1px solid hsl(234, 39%, 85%)';
            }
        }

        verifyTheme();
    })

    const deleteTask = () => {
        task.current.remove();
        deleteCount += 1;
        props.handleDeletedTask(deleteCount);
    }

    const setCompleted = () => {
        if (check.current.style.visibility === 'hidden' && !checkBtn.current.classList.contains('is-checked')) {
            check.current.style.visibility = 'visible';
            checkBtn.current.classList.add('is-checked');
            task.current.setAttribute('data-state', 'completed');
            setDeleted(true);
        } else {
            check.current.style.visibility = 'hidden';
            checkBtn.current.classList.remove('is-checked');
            task.current.setAttribute('data-state', 'active');
            setDeleted(false);
        }
    }

    return (
        <li className="container__item" ref={task} data-state="active">
            <div className="container__input" ref={containerInput}>
                <button type="button" className="input__button" ref={checkBtn} onClick={setCompleted}><span className="is-active" ref={check}><FontAwesomeIcon icon={faCheck} className="check-icon" /></span></button>
                <label ref={label}>{deleted ? <del className="is-deleted">{props.taskDescription}</del> : props.taskDescription}</label>
                <button type="button" className="input__button" onClick={deleteTask}><img src={Cross} alt="Delete task button image" /></button>
            </div>
        </li>
    )
}

export default DisplayTask;