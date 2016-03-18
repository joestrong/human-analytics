"use strict";
import BehaviourWidget from "./widgets/BehaviourWidget.js";

class Application {

  constructor() {
    this.widgets = [];
    this.widgets.push(new BehaviourWidget());
  }
}

new Application();
