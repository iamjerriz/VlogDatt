import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomButtons from '../../util/CustomButtons';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';

//redux stuff
import { connect } from 'react-redux';


//material ui imports
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//icons
import ChatIcon from '@material-ui/icons/Chat';

//daysjs less size
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {

    render() {
        dayjs.extend(relativeTime)
            const {classes, post : {
                body, 
                createdAt, 
                userImage, 
                userHandle,
                postId, 
                likeCount,
                commentCount,
            },
                user: {
                    authenticated, credentials: {handle}
                }
            } = this.props

            const deleteButton = authenticated && userHandle === handle ? (
                <DeletePost postId={postId}/>
            ) : null
        return (
           <Card className={classes.card}>
               <CardMedia 
               className={classes.image}
               image={userImage} 
               title="Profile Image"/>

               <CardContent className={classes.content}>
                    <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`} 
                    color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography 
                    variant="body2" 
                    color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    
                    <Typography variant="body1">{body}</Typography>

                    <LikeButton postId={postId}/>

                    <span>{likeCount}</span>
                    <CustomButtons tip="comments">
                        <ChatIcon color="primary"/>
                    </CustomButtons>
                    <span>{commentCount} comments</span>
                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
               </CardContent>
           </Card>
        )
    }
}
Post.prototypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post));
