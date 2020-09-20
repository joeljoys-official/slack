import React, { Component } from "react";
import {
  Grid,
  Header,
  Icon,
  Segment,
  Form,
  Message,
  Button,
} from "semantic-ui-react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import md5 from "md5";
export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  };

  // error Display setting
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  fromValidHandler = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isFormValid(this.state)) {
      error = {
        message: "Password is not valid",
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isFormValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    }
    if (passwordConfirmation !== password) {
      return false;
    } else {
      return true;
    }
  };
  formSubmit = (event) => {
    if (this.fromValidHandler()) {
      this.setState({ loading: true });
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) =>
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://en.gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser)
                .then(() => {
                  this.setState({ loading: false });
                })
                .catch((err) => {
                  this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false,
                  });
                });
            })
            .catch((err) => {
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            })
        )
        .catch((err) =>
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          })
        );
    }
  };

  displayErrors = (errors) => {
    return errors.map((error, i) => {
      return <p key={i}>{error.message}</p>;
    });
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: "450px" }}>
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="coffee" color="blue" />
            Register for Coders Build
          </Header>
          <Form size="large" onSubmit={this.formSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                placeholder="User Nmae"
                icon="user"
                type="text"
                value={this.state.username}
                iconPosition="left"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "username")}
              />
              <Form.Input
                fluid
                name="email"
                placeholder="Email"
                icon="mail"
                type="email"
                value={this.state.email}
                iconPosition="left"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                name="password"
                placeholder="password"
                icon="lock"
                type="password"
                value={this.state.password}
                iconPosition="left"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "password")}
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                placeholder="password confirmation"
                icon="lock"
                type="password"
                value={this.state.passwordConfirmation}
                iconPosition="left"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "password")}
              />
              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
              >
                Register
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 ? (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          ) : null}
          <Message>
            Already a User? <Link to="/login">Switch to login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
