import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButtons from '../../util/CustomButtons'

//redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

//materialui dialog imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    button : {
        float: 'right'
    }
})

class EditDetails extends Component {
        state = {
            bio: '',
            website: '',
            location: '',
            open: false
        };
        mapsetUserDetailsToState = (credentials) => {
            this.setState({
                bio: credentials.bio ? credentials.bio: '',
                website: credentials.website ? credentials.website: '',
                location: credentials.location ? credentials.location: ''
            })
        };
        handleOpen = (credentials) => {
            this.setState({ open: true });
            this.mapsetUserDetailsToState(credentials);
        }
        handleClose = () => {
            this.setState({ open: false });
        }
        handleSubmit = () => {
            const userDetails = {
                bio: this.state.bio,
                website: this.state.website,
                location: this.state.location
            }
            this.props.editUserDetails(userDetails);
            this.handleClose();
        }
        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        componentDidMount() {
            const { credentials } = this.props;
            this.mapsetUserDetailsToState(credentials);
        }
        

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomButtons tip="Edit Details" placement="top" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </CustomButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth  maxWidth="sm">
                    <DialogTitle>Edit your detials</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="a short bio about you"
                                className={classes.TextField} value={this.state.bio} onChange={this.handleChange} fullWidth />

                                <TextField name="website" type="text" label="Website" placeholder="your personal website"
                                className={classes.TextField} value={this.state.website} onChange={this.handleChange} fullWidth />

                                <TextField name="location" type="text" label="Location" placeholder="Where you live"
                                className={classes.TextField} value={this.state.location} onChange={this.handleChange} fullWidth />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
