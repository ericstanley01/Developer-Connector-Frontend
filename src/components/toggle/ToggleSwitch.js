import React, { Component } from 'react'
import './ToggleSwitch.css'

class ToggleSwitch extends Component {

 toggleTheme(e) {
  // alert('test');
 }

 render() {
  return (
   <div className="switch" onClick={this.toggleTheme.bind(this)}>
    <input type="checkbox" name="toggle"></input>
    <label for="toggle"><i></i></label>
    <span></span>
   </div>
  );
 }
}

export default ToggleSwitch;