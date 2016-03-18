"use strict";
let React = require('react');
let ReactDOM = require('react-dom');

let Behaviour = {};

Behaviour.Graph = React.createClass({
  render: function() {
    return (
      <div className="graph">
        <span className="done" />
        <span className="done" />
        <span />
        <span />
        <span />
      </div>
    );
  }
});

Behaviour.Level = React.createClass({
  render: function() {
    return (
      <div className="level">
        <Behaviour.Graph />
        <div className="title">
          <span>{this.props.level}</span>
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
});

export default class BehaviourWidget {

  constructor() {
    let container = document.querySelector('.widget-behaviour');
    ReactDOM.render((
      <div>
        <Behaviour.Level level="2" name="Music composition" />
        <Behaviour.Level level="1" name="Read before bed" />
        <Behaviour.Level level="0" name="Baseline" />
      </div>
    ), container);
  }
}
