import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile'

//loading
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

//material ui
import Grid from '@material-ui/core/grid';

//reduxx
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state= {
        profile: null,
        postId: null
    };
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const postId = this.props.match.params.postId;

        if( postId ) this.setState({ postIdParam: postId });

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data
        const { postIdParam } = this.state;

        const postMarkup = loading ? (
            <PostSkeleton/>
        ) : posts === null ? (
            <p>This user has no post yet</p>
        ) : !postIdParam ? (
            posts.map(post => <Post key={post.postId} post={post}/>)
        ) : (
            posts.map(post => {
                if ( post.postId !== postIdParam )
                    return <Post key={post.postId} post={post}/>
                else return <Post key={post.postId} post={post} openDialog/>
            })
        )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {postMarkup}
                </Grid>

                {/* profile */}
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (
                    <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user);
