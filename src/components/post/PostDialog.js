import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButtons from '../../util/CustomButtons';
import LikeButton  from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';



import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//materialui dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//material UI icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = {

    invisibleSeparator: {
        border: "none",
        margin: 4
    },
    
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '20px'
    },

    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },

    dialogContent: {
        padding: 20
    },

    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }

}

class PostDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
    }
    componentDidMount () {
        if ( this.props.openDialog ) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, postId } = this.props;
        const newPath = `/users/${userHandle}/post/${postId}`;

        if( oldPath === newPath ) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);


        this.setState({ open: true , oldPath, newPath }) //put old and new path on state to access in both open and close im so bright
        this.props.getPost(this.props.postId)
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false })
        this.props.clearErrors();
    };


    render() {
        const { classes, post: {postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments}, UI: { loading }}
        = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>

                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>

                        {/* like and comment button */}
                    <LikeButton postId={postId}/>
                    <span>{likeCount} likes</span>
                    <CustomButtons tip="comments">
                        <ChatIcon color="primary"/>
                    </CustomButtons>
                    <span>{commentCount} comments</span>
                </Grid>
                {/* <hr className={classes.visibleSeparator}/> */}
                <CommentForm postId={postId}/>
                <Comments comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <CustomButtons onClick={this.handleOpen} tip="See Post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </CustomButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButtons tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </CustomButtons>

                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }       
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
})

const mapActionToProps = {
    getPost,
    clearErrors
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostDialog));