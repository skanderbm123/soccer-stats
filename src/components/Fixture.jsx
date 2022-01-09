import React, { Component } from "react";
import SoccerLineUp from "react-soccer-lineup";

class Fixture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "588f58",
      pattern: "lines",
      showHomeTeam: false,
      showAwayTeam: false,

      homeTeamColor: "f08080",
      homeTeamNumberColor: "ffffff",
      homeGoalkeeperColor: "d6cb65",
      homeGoalkeeperNumberColor: "333333",
      homeTeamClickable: true,

      awayTeamColor: "add8e6",
      awayTeamNumberColor: "333333",
      awayGoalkeeperColor: "4f6c75",
      awayGoalkeeperNumberColor: "ffffff",
      awayTeamClickable: true,
    };
    this.test = this.test.bind(this);
  }

  test(){
    console.log(this.props.fixture);
  }
  

  buildHomeTeam() {
    const {
      homeTeamColor,
      homeTeamNumberColor,
      homeGoalkeeperColor,
      homeGoalkeeperNumberColor,
      homeTeamClickable,
    } = this.state;

    return {
      squad: {
        gk: {
          number: 1,
          name: "test",
          color: `#${homeGoalkeeperColor}`,
          numberColor: `#${homeGoalkeeperNumberColor}`,
          onClick: homeTeamClickable
            ? () => this.test()
            : undefined,
        },
        df: [
          {
            number: 2,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${2}`)
              : undefined,
          },
          {
            number: 4,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${4}`)
              : undefined,
          },
          {
            number: 5,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${5}`)
              : undefined,
          },
          {
            number: 3,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${3}`)
              : undefined,
          },
        ],
        cm: [
          {
            number: 6,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${6}`)
              : undefined,
          },
          {
            number: 8,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${8}`)
              : undefined,
          },
          {
            number: 11,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${11}`)
              : undefined,
          },
          {
            number: 10,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${10}`)
              : undefined,
          },
        ],
        fw: [
          {
            number: 9,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${9}`)
              : undefined,
          },
          {
            number: 13,
            onClick: homeTeamClickable
              ? () => alert(`Home team - Player ${13}`)
              : undefined,
          },
        ],
      },
      style: {
        color: `#${homeTeamColor}`,
        numberColor: `#${homeTeamNumberColor}`,
      },
    };
  }
  buildAwayTeam() {
    const {
      awayTeamColor,
      awayTeamNumberColor,
      awayGoalkeeperColor,
      awayGoalkeeperNumberColor,
      awayTeamClickable,
    } = this.state;

    return {
      squad: {
        gk: {
          number: 1,
          color: `#${awayGoalkeeperColor}`,
          numberColor: `#${awayGoalkeeperNumberColor}`,
          onClick: awayTeamClickable
            ? () => alert(`Away team - Player ${1}`)
            : undefined,
        },
        df: [
          {
            number: 2,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${2}`)
              : undefined,
          },
          {
            number: 4,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${4}`)
              : undefined,
          },
          {
            number: 5,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${5}`)
              : undefined,
          },
          {
            number: 3,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${3}`)
              : undefined,
          },
        ],
        cam: [
          {
            number: 7,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${7}`)
              : undefined,
          },
          {
            number: 8,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${8}`)
              : undefined,
          },
          {
            number: 6,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${6}`)
              : undefined,
          },
          {
            number: 10,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${10}`)
              : undefined,
          },
        ],
        fw: [
          {
            number: 9,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${9}`)
              : undefined,
          },
          {
            number: 11,
            onClick: awayTeamClickable
              ? () => alert(`Away team - Player ${11}`)
              : undefined,
          },
        ],
      },
      style: {
        color: `#${awayTeamColor}`,
        numberColor: `#${awayTeamNumberColor}`,
      },
    };
  }
  render() {
    const { color, pattern, showHomeTeam, showAwayTeam } = this.state;

    const {
      homeTeamColor,
      homeTeamNumberColor,
      homeGoalkeeperColor,
      homeGoalkeeperNumberColor,
      homeTeamClickable,
    } = this.state;

    const {
      awayTeamColor,
      awayTeamNumberColor,
      awayGoalkeeperColor,
      awayGoalkeeperNumberColor,
      awayTeamClickable,
    } = this.state;

    return (
      <div>
        <SoccerLineUp
          size="responsive"
          color={`#${color}`}
          pattern={pattern}
          homeTeam={this.buildHomeTeam()}
          awayTeam={this.buildAwayTeam()}
        />
      </div>
    );
  }
}
export default Fixture;
