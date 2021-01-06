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

//REDUX STUFF
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

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

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            userHandle: '',
            // loading: false,
            errors: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors});
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history)
        // axios.post('/signup', newUserData)
        //     .then(res => {
        //         console.log(res.data);
        //         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        //         this.setState({
        //             loading: false
        //         });
        //         this.props.history.push('/home');
        //     })
        //     .catch(err => {
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         })
        //     })
    }
    render() {

        const {classes, UI: {loading} } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <h4 className={classes.logo}>VlogThat</h4>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
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

                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            fullWidth/>

                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Your display name" 
                            className={classes.textField}
                            value={this.state.handle} 
                            onChange={this.handleChange} 
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
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
                                Signup 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                        </Button>
                        <br/>
                        <small>already have an account ? Login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})
   
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));
