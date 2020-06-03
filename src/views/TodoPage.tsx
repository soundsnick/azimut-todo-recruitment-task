// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
    atom,
    useRecoilState,
} from "recoil";
import TodoItem from "../components/TodoItem";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const todoListState = atom({
    key: 'todoListState',
    default: []
});

const todoLoadState = atom({
    key: 'todoLoadState',
    default: true
})

const todoCountState = atom({
    key: 'todoCountState',
    default: 0
})

interface ITodoPageProps {
    match: {
        params: {
            page: string
        }
    }
}

const CSSPagination = css({
    display: "grid",
    gridTemplateColumns: "repeat(10, minmax(20px, 1fr))",
    gridGap: 10,
    marginBottom: 15
});

const CSSPaginationItem = css({
    display: "block",
    background: "#e6e6e6",
    textDecoration: "none",
    color: "#282828",
    padding: "10px 0",
    textAlign: "center",
    borderRadius: 8,
    borderBottom: "3px solid #8c8c8c",
    transition: "transform 0.2s, background 0.2s",

    "&:hover": {
        background: "#fff",
        transform: "scale(1.04)"
    },
    "&.active": {
        background: "#439688",
        color: "#fff",
        fontWeight: 400
    }
});

const CSSTodoList = css({
    padding: '10px 0',

    "&:hover .todo-item": {
        background: "#f3f3f3"
    },
    "& .todo-item:hover": {
        background: "#fff"
    }
});


const TodoPage = ({ match: { params } }: ITodoPageProps) => {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [todoCount, setTodoCount] = useRecoilState(todoCountState);
    const [todoLoad, setTodoLoadState] = useRecoilState(todoLoadState);

    useEffect(() => {
        // https://jsonplaceholder.typicode.com/todos?_page=${params.page}&_limit=10
        // This is how it was supposed to be implemented. But API throws CORS exception and loads too long.
        // So I'm just gonna use slice.
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then(res => {
                setTodoLoadState(false)
                return res.json()
            })
            .then(
                (result) => {
                    setTodoCount(result.length)
                    setTodoList(result.slice(Number(params.page)*10-10, Number(params.page)*10))
                },
                (error) => { console.log(error) }
            )
    }, [])

    return (<div className="container">
        { todoLoad &&
            <div className="todo-loading" css={ { color: "grey", textAlign: "center" } }>
                Loading...
            </div>
        }
        <div className="todo-list" css={ CSSTodoList }>
            { todoList.map((todo, index) => <TodoItem item={ todo } key={ index } />) }
        </div>
        { !todoLoad && <div className="todo-pagination" css={ CSSPagination }>
            { Array.from(Array((todoCount/10)+1).keys()).map(i => (
                <Link to={ `/todos/${i+1}` } key={ i } className={ `todo-pagination__item ${ i+1 === Number(params.page) && "active" }` } css={ CSSPaginationItem }>{ i+1 }</Link>
            )) }
        </div> }
    </div>);
}
export default TodoPage;