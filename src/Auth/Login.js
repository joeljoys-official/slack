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

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

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

  formSubmit = (event) => {
    event.preventDefault();
    if (this.fromValidHandler(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
          this.setState({ loading: false, errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  fromValidHandler = ({ email, password }) => {
    return email && password;
  };

  displayErrors = (errors) => {
    return errors.map((error, i) => {
      return <p key={i}>{error.message}</p>;
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: "450px" }}>
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="coffee" color="blue" />
            Login To Coders Build
          </Header>
          <Form size="large" onSubmit={this.formSubmit}>
            <Segment stacked>
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

              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
              >
                Login
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
            Don't have an Account? <Link to="/register">Create Account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
