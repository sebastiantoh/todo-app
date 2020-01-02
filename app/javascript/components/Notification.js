import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Notification = props => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={props.notificationActive}
            autoHideDuration={3000}
            onClose={props.handleNotificationClose}
            onExited={props.handleNotificationExited}
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            key={
                props.currNotification ? props.currNotification.key : undefined
            }
            message={
                <span id="message-id">
                    {props.currNotification
                        ? props.currNotification.message
                        : undefined}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={props.handleNotificationClose}
                >
                    <CloseIcon />
                </IconButton>
            ]}
        />
    );
};

Notification.propTypes = {
    notificationActive: PropTypes.bool,
    currNotification: PropTypes.object,
    handleNotificationClose: PropTypes.func,
    handleNotificationExited: PropTypes.func
};

export default Notification;
