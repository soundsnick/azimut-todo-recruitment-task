// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

interface ITodoItemProps {
    item: {
        completed: boolean,
        title: string
    }
}

// Helpers
const completedToClass = (status: boolean): string => {
    return status ? "completed" : ""
}

// CSS
const CSSTodoItem = css({
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    background: "#fff",
    borderBottom: "4px solid #a5a5a5",
    boxShadow: "0 4px 4px -4px rgba(0,0,0, .2)",
    transition: "box-shadow 0.2s, background 0.2s, transform 0.2s",
    willChange: "box-shadow, background, transform",

    "&:hover": {
        boxShadow: "0 29px 22px -4px rgba(0,0,0,.1)",
        transform: "scale(1.03)",
        position: "relative",
        zIndex: 9
    }
});

const CSSTodoStatus = ({
    display: "block",
    flex: "0 0 50px",
    height: 50,
    backgroundColor: "#e6e6e6",
    borderRadius: "100%",
    marginRight: 20,

    "&[data-state='completed']": {
        backgroundColor: "#009688"
    }
});

const CSSTodoTitle = css({
    fontSize: 21,
    fontWeight: 500,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
});

const TodoItem = ({ item }: ITodoItemProps) => {
    return (
        <div className="todo-item" css={ CSSTodoItem }>
            <i className="todo-item__status" data-state={ completedToClass(item.completed) } css={ CSSTodoStatus } />
            <span className="todo-item__title" css={ CSSTodoTitle } title={ item.title }>{ item.title }</span>
        </div>
    );
}

export default TodoItem;