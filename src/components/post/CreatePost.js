import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButtons from '../../util/CustomButtons'

//materialui dialog imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//material UI icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

//redux
import { connect } from 'react-redux'
import { createPost, clearErrors } from '../../redux/actions/dataActions'

const styles = {
    
    submitButton:{
        // marginTop: '10px',
        position: 'relative',
        marginTop: 10,
        marginBottom: 10,
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
}

class CreatePost extends Component {
    state = {
        open: false,
        body: '',
        errors: []
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {}});
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    };
    handleChange = (event) => {
        this.setState({ [event.target.name ]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createPost({ body: this.state.body });
    };
    
    render() {
        const { errors } = this.state;
        const { classes, UI:{ loading } } = this.props;

        return (
            <Fragment>
                <CustomButtons onClick={this.handleOpen} tip="Create a post">
                    <AddIcon/>
                </CustomButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButtons tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </CustomButtons>
                    <DialogTitle>Add a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Post!"
                                multiline
                                rows="3"
                                placeholder="Share what you think"
                                errors={errors.body ? true : false }
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                                <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                    Submit
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )}
                                </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, {createPost, clearErrors})(withStyles(styles)(CreatePost))