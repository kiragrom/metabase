import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class AuthScene extends Component {
  componentDidMount() {
    // HACK: React 0.14 doesn't support "fill-rule" attribute. We can remove this when upgrading to React 0.15.
    ReactDOM.findDOMNode(this.refs.HACK_fill_rule_1).setAttribute(
      "fill-rule",
      "evenodd",
    );
    ReactDOM.findDOMNode(this.refs.HACK_fill_rule_2).setAttribute(
      "fill-rule",
      "evenodd",
    );
  }

  render() {
    return (
      <section className="z1 brand-scene absolute bottom left right">
        <div className="brand-boat-container text-centered">
          <div className="border-column-divider px2 text-bold">
            © 2018 AdLibertas, Inc.
          </div>
          <div className="border-column-divider px2">
            <a href="https://www.adlibertas.com/privacy-policy">privacy</a>
          </div>
          <div className="px2">
            <a href="https://www.adlibertas.com/terms">terms of service</a>
          </div>
        </div>
      </section>
    );
  }
}
