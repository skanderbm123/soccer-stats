import React from "react";
import {Helmet} from "react-helmet";

class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <div
            id="wg-api-football-fixture"
            data-host="api-football-v1.p.rapidapi.com"
            data-refresh="60"
            data-id="718243"
            data-key="432459a1f7msh2e151ad42c9bb7bp1f4f27jsn401994f300b9"
            data-theme=""
            data-show-errors="false"
          ></div>
        </div>

      </div>
    );
  }
}
export default Fixture;
