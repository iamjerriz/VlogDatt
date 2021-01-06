import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//material ui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'

//fix it to make globaly
const styles = {
    form: {
        textAlign: 'center'
      },
      logo: {
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          marginTop: 20,
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '.8rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute',
          color: 'black'
      }
    }

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: []
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors});
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history); //passed from action loginUser function then history to redirect
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {

        const { classes, UI: {loading}} = this.props; //gets theloading inside UI
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <h4 className={classes.logo}>VlogThat</h4>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            fullWidth/>
                        
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}>
                                LOGIN 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                        </Button>
                        <br/>
                        <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = { //all props types
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ //state from reducer doesnt need data because this is the login
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)
(withStyles(styles)(Login));
