import 'date-fns';
import React from 'react';
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
                    className={classes.dateField}
                    clearable
                    disablePast
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

export default DueDate;