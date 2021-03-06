import React from 'react';
import User from '../modules/models/User';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      positions: {},
    };
    this.onDrag = this.onDrag.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var _this = this;
    User.getInfo().then(function (data) {
      _this.setState({
        user: data.user,
        positions: data.positions
      });
    });
  }

  /**
   * Handle element movement. Persist the element's new (x,y) position.
   * @param element
   * @param event
   * @param ui
     */
  onDrag(element, event, ui) {
    var currentElementPositions = this.state.positions[element];
    if (currentElementPositions){
      var newPositionData = {};
      newPositionData[element] = {
        x: currentElementPositions.x + ui.x,
        y: currentElementPositions.y + ui.y
      };
      // persist element position.
      User.setElementsPositions(newPositionData);
    }

  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard
      onDrag={this.onDrag}
      user={this.state.user}
      elementsPos={this.state.positions}/>);
  }

}

export default DashboardPage;
