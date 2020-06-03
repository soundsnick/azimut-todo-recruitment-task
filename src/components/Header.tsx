// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";

interface ICSSColors {
    [key: string]: string
}

const colors:ICSSColors = {
    color: "#236358"
}

const CSSHeader = css({
    padding: "15px 0",
    textAlign: "center"
});

const CSSNavItem = css({
    fontSize: 18,
    margin: "0 10px",
    textDecoration: "none",
    color: colors.color,
    transition: "color 0.2s",

    "&:hover": {
        color: "#1cb399"
    }
});

const Header = () => {
    return (
        <header className="header" css={ CSSHeader }>
            <nav className="container">
                <div className="header-navigation">
                    <Link to="/" className="header-navigation__item" css={ CSSNavItem }>Home</Link>
                    <Link to={`/todos/1`} className="header-navigation__item" css={ CSSNavItem }>Todo List</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;