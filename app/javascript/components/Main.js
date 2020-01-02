import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Body from "../components/Body";

const Main = props => {
    return (
        <Container fixed>
            <Typography variant="h3" component="h1" gutterBottom>
                To-Do List
            </Typography>

            <Body />
        </Container>
    );
};

export default Main;
