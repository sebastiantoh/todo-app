import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    dateField: {
        marginTop: 16,
        marginBottom: 8,
    },
}));

const DueDate = (props) => {
    const classes = useStyles();
    
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    // Hackish way to make warning appear only if task is not completed
                    // Will show warning if task is not completed and is due
                    minDate={props.completed ? undefined : new Date()}
                    minDateMessage={"Your task is due!"}
                    className={classes.dateField}
                    clearable
                    inputVariant="outlined"
                    value={props.due_date} 
                    format="E, d MMM yyyy HH:mm"
                    // dummy function. onAccept won't work without an onChange
                    onChange={(date) => {return;}}
                    onAccept={props.handleDueDateUpdate}
                    label="Due Date"
                    showTodayButton
                />
            </MuiPickersUtilsProvider>
}

DueDate.propTypes = {
    handleDueDateUpdate: PropTypes.func,
    due_date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
}

export default DueDate;