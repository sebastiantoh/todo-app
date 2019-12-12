import React from "react"

const NewTask = (props) => {
    let formFields = {}

    return (
        <form onSubmit={(event) => { props.handleFormSubmit(formFields.title.value, 
                formFields.description.value); 
                event.target.reset();}
        }>
            <input ref={input => formFields.title = input} // TODO: modify ref? apparently not very good
                placeholder='Task Title'
            />

            <input ref={input => formFields.description = input} 
                placeholder='Task Description' 
            />

            <button>Submit</button>
        </form>
      )
};

export default NewTask;
