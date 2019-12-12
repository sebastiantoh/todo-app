import React from "react"
import AllTasks from "../components/AllTasks";

const Main = (props) => {
  return (
    <React.Fragment>
      <h1>To-Do List</h1>
      <AllTasks />
    </React.Fragment>
  );
}

export default Main
