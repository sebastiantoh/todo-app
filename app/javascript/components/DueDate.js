import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const DueDate = (props) => {
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    clearable
                    disablePast
                    inputVariant="outlined"
                    value={props.due_date} //TODO
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