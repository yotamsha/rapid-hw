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
    User.register(_this.state.user).then(function success() {
      _this.setState({
        errors: {}
      });
      // make a redirect
      _this.context.router.replace('/login');
    }, function error(){
      _this.setState({
        errors: {
          summary : 'Could not create account. Please choose a unique username.'
        }
      });
    });
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

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
