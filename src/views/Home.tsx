// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Home = () => {
    return (
        <div className="container">
            <h1 css={ { textAlign: "center" } }>Home Page</h1>
        </div>
    );
};

export default Home;