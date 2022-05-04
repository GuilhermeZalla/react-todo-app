import DisplayTask from "./display-tasks/display-tasks";
import '../../style/style.css';
import Sun from '../../../src/images/icon-sun.svg';
import Moon from '../../../src/images/icon-moon.svg';
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import bgDesktopDark from '../../images/bg-desktop-dark.jpg';
import bgMobileDark from '../../images/bg-mobile-dark.jpg';
import bgDesktopLight from '../../images/bg-desktop-light.jpg';
import bgMobileLight from '../../images/bg-mobile-light.jpg';

const Display = () => {
    const [tasks, setTask] = useState([]);
    const [count, setCount] = useState(10);
    const [theme, setThemeState] = useState(false);
    let containerInput = useRef(null);
    let containerFooter = useRef(null);
    let containerTasks = useRef(null);
    let headerInput = useRef(null);
    let header = useRef(null);
    let footerList = useRef(null);
    let li = document.querySelectorAll('.container__item');

    useEffect(() => {
        const verifyMode = () => {
            if (theme) {
                if (window.matchMedia("(max-width: 600px)").matches) {
                    header.current.style.backgroundImage = `url(${bgMobileDark})`;
                } else {
                    header.current.style.backgroundImage = `url(${bgDesktopDark})`;
                }
            } else {
                if (window.matchMedia("(max-width: 600px)").matches) {
                    header.current.style.backgroundImage = `url(${bgMobileLight})`;
                } else {
                    header.current.style.backgroundImage = `url(${bgDesktopLight})`;
                }
            }
        }
        verifyMode();
    })

    const changeThemeMode = element => {
        let theme = element.target.getAttribute('src');
        if (theme === Moon) {
            element.target.setAttribute('src', Sun);
            setThemeState(true);
            document.body.style.backgroundColor = 'hsl(235, 21%, 11%)';
            containerInput.current.style.backgroundColor = 'hsl(235, 24%, 19%)';
            containerFooter.current.style.backgroundColor = 'hsl(235, 24%, 19%)';
            containerFooter.current.style.borderRadius = '5px';
            containerTasks.current.style.backgroundColor = 'hsl(235, 24%, 19%)';
            headerInput.current.style.color = 'hsl(236, 33%, 92%)';
            footerList.current.style.backgroundColor = 'hsl(235, 24%, 19%)';
            footerList.current.style.borderTop = 'none';
        } else {
            element.target.setAttribute('src', Moon);
            setThemeState(false);
            document.body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            containerInput.current.style.backgroundColor = 'hsl(0, 0%, 98%)';
            containerFooter.current.style.backgroundColor = 'hsl(0, 0%, 98%)';
            containerFooter.current.style.borderRadius = '5px';
            containerTasks.current.style.backgroundColor = 'hsl(0, 0%, 98%)';
            headerInput.current.style.color = 'hsl(235, 21%, 11%)';
            footerList.current.style.backgroundColor = 'hsl(0, 0%, 98%)';
            footerList.current.style.borderTop = '1px solid hsl(233, 11%, 84%)';
        }
    }

    const handleNewTask = element => {
        if (element.target.value === '') {
            return null;
        } else {
            if (count <= 0) {
                setCount(0);
            } else {
                if (setCount(count - 1) <= 0) {
                    setCount(0);
                } else {
                    setTask([...tasks, element.target.value]);
                }
            }
        }
    }

    const handleDeletedTask = element => setCount(count + element);

    const clearCompletedTasks = () => {
        let li = document.querySelectorAll('li[data-state]');
        let increaseCount = 0;
        for (let i = 0; i < li.length; ++i) {
            if (li[i].getAttribute('data-state') === 'completed') {
                li[i].remove();
                increaseCount++;
            }
        }
        setCount(count + increaseCount);
    }

    const filterTasks = element => {
        switch (element.target.value) {
            case 'all':
                for (let i = 0; i < li.length; ++i) {
                    console.log('neutral' + li.length);
                    li[i].style.display = 'block';
                }
                break;
            case 'active':
                for (let i = 0; i < li.length; ++i) {
                    if (li[i].getAttribute('data-state') === 'active') {
                        li[i].style.display = 'block';

                    } else {
                        li[i].style.display = 'none';
                    }
                }
                break;
            case 'completed':
                for (let i = 0; i < li.length; ++i) {
                    if (li[i].getAttribute('data-state') === 'completed') {
                        li[i].style.display = 'block';
                    } else {
                        li[i].style.display = 'none';
                    }
                }
                break;
        }
    }

    return (
        <div className="display">
            <header className="header" ref={header}>
                <ul className="header__list">
                    <li className="header__item">TODO</li>
                    <li className="header__item"><button className="header__button" type="button" onClick={changeThemeMode}><img src={Moon} alt="Mode theme" /></button></li>
                </ul>
                <div className="input__container" ref={containerInput}>
                    <button type="button" className="input__button"><span className="is-active"><FontAwesomeIcon icon={faCheck} className="check-icon" /></span></button>
                    <input type="text" placeholder="Create a new todo..." maxLength="40" onBlur={handleNewTask} ref={headerInput} />
                </div>
            </header>
            <div className="container">
                <div className="container__tasks" ref={containerTasks} >
                    <ul className="container__list">
                        {
                            tasks?.map((task, index) => <DisplayTask key={index} taskDescription={task} handleDeletedTask={handleDeletedTask} isThemeActived={theme} />)
                        }
                    </ul>
                    <footer className="container__footer" ref={containerFooter}>
                        <span className="container__count">{count === 0 || count === 1 ? count + " item left" : count + " items left"}</span>
                        <button type="button" className="container__button" onClick={clearCompletedTasks}>Clear completed</button>
                    </footer>
                </div>
                <footer className="footer">
                    <ul className="footer__list" ref={footerList}>
                        <li className="footer__item"><button type="button" className="footer__button" value="all" onClick={filterTasks}>All</button></li>
                        <li className="footer__item"><button type="button" className="footer__button" value="active" onClick={filterTasks}>Active</button></li>
                        <li className="footer__item"><button type="button" className="footer__button" value="completed" onClick={filterTasks}>Completed</button></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default Display;