import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CustomDialog extends React.Component {
    state = {
        open: false,
        title: this.props.title,
        body : this.props.body,
        buttonTitle : this.props.buttonTitle
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAgree = () => {
        console.log("positive");
        this.props.callback()
        this.handleClose();
    };

    handleDisagree = () => {
        console.log("negative");
        this.handleClose();
    };
    render() {
        return (
            <div>
                {/* Button to trigger the opening of the dialog */}
                <Button style={{color:this.props.color}} onClick={this.handleClickOpen}>{this.state.buttonTitle}</Button>
                {/* Dialog that is displayed if the state open is true */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.body}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDisagree} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAgree} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomDialog;
