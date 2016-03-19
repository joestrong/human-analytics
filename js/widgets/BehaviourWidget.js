"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let request = require('request');

import config from '../../config.js';

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
    this.container = document.querySelector('.widget-behaviour');
    this.levels = [];
    this.getData(() => {
      this.render();
    });
  }

  getData(callback) {
    request(config.api_endpoint + '/behaviour', (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      let data = JSON.parse(body);
      this.levels = data.items;
      callback();
    });
  }

  render() {
    ReactDOM.render((
      <div>
        {this.levels.reverse().map((item, index) => {
          let key = this.levels.length -1 - index;
          let level = key + 1;
          return <Behaviour.Level key={key} level={level} name={item.name} />;
        });}
        <Behaviour.Level level="0" name="Baseline" />
      </div>
    ), this.container);
  }
}
