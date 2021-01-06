import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CustomButtons from '../../util/CustomButtons'
import CreatePost from '../post/CreatePost'
import Notifications from './Notifications'

//material ui stuff import them one by one compile will be easier
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home'


export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                {authenticated ? (
                    //authenticated  whill show this nav
                <Fragment>
                    <CreatePost/>
                    <Link to="/home">
                        <CustomButtons tip="Home" placement="top">
                            <HomeIcon />
                        </CustomButtons>
                    </Link>

                        <Notifications />

                </Fragment>
                ) : ( //else
                <Fragment>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Fragment>
                )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar);
