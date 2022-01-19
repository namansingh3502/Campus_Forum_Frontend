import React, { Component } from "react";

import MenuKeys from "./menuKeys";
import ChannelList from "./channelList";
import Others from "./others";

export default class MenuColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="w-1/6">
        <MenuKeys />
        <ChannelList
          ChannelList={this.props.ChannelList}
        />
        <Others />
      </div>
    );
  }
}
