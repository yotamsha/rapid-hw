import React, {PropTypes} from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import User from '../modules/models/User';


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        fullName: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    var _this = this;

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    User.register(_this.state.user).then(function () {
      // change the component-container state
      _this.setState({
        errors: {}
      });

      // make a redirect
      _this.context.router.replace('/login');
    });


    // create an AJAX request
    /*    const xhr = new XMLHttpRequest();
     xhr.open('post', '/auth/signup');
     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     xhr.responseType = 'json';
     xhr.addEventListener('load', () => {
     if (xhr.status === 200) {
     // success

     // change the component-container state
     this.setState({
     errors: {}
     });

     // set a message
     localStorage.setItem('successMessage', xhr.response.message);

     // make a redirect
     this.context.router.replace('/login');
     } else {
     // failure

     const errors = xhr.response.errors ? xhr.response.errors : {};
     errors.summary = xhr.response.message;

     this.setState({
     errors
     });
     }
     });
     xhr.send(formData);*/
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage
  .contextTypes = {
  router: PropTypes.object.isRequired
};

export
default
SignUpPage;
