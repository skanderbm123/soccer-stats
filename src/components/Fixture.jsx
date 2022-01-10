import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SoccerLineUp from "react-soccer-lineup";
import { GlobalStyle, MainBody } from "../assets/styles";

class Fixture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "588f58",
      pattern: "lines",
      homeSquad: [],
      awaySquad: [],
    };

    this.buildHomeTeam = this.buildHomeTeam.bind(this);
    this.setHomeLineups = this.setHomeLineups.bind(this);

    this.buildAwayTeam = this.buildAwayTeam.bind(this);
    this.setAwayLineups = this.setAwayLineups.bind(this);
  }

  componentDidMount() {
    if (this.props.fixture.length > 0) {
      console.log(this.props.fixture[0].fixture.id);
      if (this.props.fixture[0].lineups.length > 0) {
        console.log("test1");
        this.homeSquad = this.buildHomeTeam(this.props.fixture[0].lineups[0]);
        this.awaySquad = this.buildAwayTeam(this.props.fixture[0].lineups[1]);
        this.forceUpdate();
      } else {
        console.log("test2");
        this.forceUpdate();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fixture.length > 0) {
      if (prevProps.fixture[0] !== this.props.fixture[0]) {
        if (this.props.fixture[0].lineups.length > 0) {
          console.log("test3");
          this.homeSquad = this.buildHomeTeam(this.props.fixture[0].lineups[0]);
          this.awaySquad = this.buildAwayTeam(this.props.fixture[0].lineups[1]);
          this.forceUpdate();
        } else {
          console.log("test4");
          this.homeSquad = undefined;
          this.awaySquad = undefined;
          this.forceUpdate();
        }
      }
    }
  }

  buildHomeTeam(lineups) {
    console.log("Building Home Team");
    return this.setHomeLineups(lineups);
  }

  setHomeLineups(lineups) {
    const formation = lineups.formation;
    const positions = formation.split("-");

    const homeTeamColor = lineups.team.colors.player.primary;
    const homeTeamNumberColor = lineups.team.colors.player.number;
    const homeGoalkeeperColor = lineups.team.colors.goalkeeper.primary;
    const homeGoalkeeperNumberColor = lineups.team.colors.goalkeeper.number;

    var gk = {
      number: lineups.startXI[0].player.number,
      name: lineups.startXI[0].player.name,
      color: `#${homeGoalkeeperColor}`,
      numberColor: `#${homeGoalkeeperNumberColor}`,
      id: lineups.startXI[0].player.id,
      nameColor: `#000000`,
      onClick: () => alert(`Home team - Player ${homeGoalkeeperColor}`),
    };
    var count = 1;
    var df = [];
    var cm = [];
    var cam = [];
    var fw = [];

    // for defenders
    for (var i = positions[0]; 0 < i; i--) {
      df.push({
        number: lineups.startXI[i].player.number,
        name: lineups.startXI[i].player.name,
        color: `#${homeTeamColor}`,
        numberColor: `#${homeTeamNumberColor}`,
        id: lineups.startXI[i].player.id,
        nameColor: `#000000`,
        onClick: () => alert(`Home team - Player ${homeGoalkeeperNumberColor}`),
      });
      count++;
    }

    // for midfields
    for (var i = positions[1]; 0 < i; i--) {
      cm.push({
        number: lineups.startXI[count].player.number,
        name: lineups.startXI[count].player.name,
        color: `#${homeTeamColor}`,
        numberColor: `#${homeTeamNumberColor}`,
        id: lineups.startXI[count].player.id,
        nameColor: `#000000`,
        onClick: () => alert(`Home team - Player ${homeGoalkeeperNumberColor}`),
      });
      count++;
    }

    if (positions[3] == undefined) {
      // for forward
      for (var i = positions[2]; 0 < i; i--) {
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () =>
            alert(`Home team - Player ${homeGoalkeeperNumberColor}`),
        });
        count++;
      }
      const squad = {
        squad: { gk: gk, df: df, cm: cm, fw: fw },
        style: {
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
        },
      };
      return squad;
    } else {
      // for central attack midfielders
      for (var i = positions[2]; 0 < i; i--) {
        cam.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () =>
            alert(`Home team - Player ${homeGoalkeeperNumberColor}`),
        });
        count++;
      }
      // for forward
      for (var i = positions[3]; 0 < i; i--) {
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () =>
            alert(`Home team - Player ${homeGoalkeeperNumberColor}`),
        });
        count++;
      }
      const squad = {
        squad: { gk: gk, df: df, cm: cm, cam: cam, fw: fw },
        style: {
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
        },
      };
      return squad;
    }
  }

  buildAwayTeam(lineups) {
    console.log("Building Away Team");
    return this.setAwayLineups(lineups);
  }

  setAwayLineups(lineups) {
    const formation = lineups.formation;
    const positions = formation.split("-");

    const awayTeamColor = lineups.team.colors.player.primary;
    const awayTeamNumberColor = lineups.team.colors.player.number;
    const awayGoalkeeperColor = lineups.team.colors.goalkeeper.primary;
    const awayGoalkeeperNumberColor = lineups.team.colors.goalkeeper.number;

    var gk = {
      number: lineups.startXI[0].player.number,
      name: lineups.startXI[0].player.name,
      color: `#${awayGoalkeeperColor}`,
      numberColor: `#${awayGoalkeeperNumberColor}`,
      id: lineups.startXI[0].player.id,
      nameColor: `#000000`,
      onClick: () => alert(`Home team - Player ${awayGoalkeeperColor}`),
    };

    var count = 1;
    var df = [];
    var cm = [];
    var cam = [];
    var fw = [];

    // for defenders
    for (var i = positions[0]; 0 < i; i--) {
      df.push({
        number: lineups.startXI[i].player.number,
        name: lineups.startXI[i].player.name,
        color: `#${awayTeamColor}`,
        numberColor: `#${awayTeamNumberColor}`,
        id: lineups.startXI[i].player.id,
        nameColor: `#000000`,
        onClick: () => alert(`Home team - Player ${awayTeamNumberColor}`),
      });
      count++;
    }

    // for midfields
    for (var i = positions[1]; 0 < i; i--) {
      cm.push({
        number: lineups.startXI[count].player.number,
        name: lineups.startXI[count].player.name,
        color: `#${awayTeamColor}`,
        numberColor: `#${awayTeamNumberColor}`,
        id: lineups.startXI[count].player.id,
        nameColor: `#000000`,
        onClick: () => alert(`Home team - Player ${awayTeamNumberColor}`),
      });
      count++;
    }

    if (positions[3] == undefined) {
      // for forward
      for (var i = positions[2]; 0 < i; i--) {
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => alert(`Home team - Player ${awayTeamNumberColor}`),
        });
        count++;
      }
      const squad = {
        squad: { gk: gk, df: df, cm: cm, fw: fw },
        style: {
          color: `#${awayTeamNumberColor}`,
          numberColor: `#${awayTeamNumberColor}`,
        },
      };
      return squad;
    } else {
      // for central attack midfielders
      for (var i = positions[2]; 0 < i; i--) {
        cam.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => alert(`Home team - Player ${awayTeamNumberColor}`),
        });
        count++;
      }
      // for forward
      for (var i = positions[3]; 0 < i; i--) {
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => alert(`Home team - Player ${awayTeamNumberColor}`),
        });
        count++;
      }
      const squad = {
        squad: { gk: gk, df: df, cm: cm, cam: cam, fw: fw },
        style: {
          color: `#${awayTeamNumberColor}`,
          numberColor: `#${awayTeamNumberColor}`,
        },
      };
      return squad;
    }
  }

  render() {
    const { color, pattern } = this.state;
    return (
      <MainBody>
        <SoccerLineUp
          size="normal"
          color={`#${color}`}
          pattern={pattern}
          homeTeam={this.homeSquad}
          awayTeam={this.awaySquad}
        />

        <Tabs>
          <TabList>
            <Tab>Players</Tab>
            <Tab>Events</Tab>
            <Tab>Statistics</Tab>
          </TabList>

          <TabPanel></TabPanel>

          <TabPanel></TabPanel>
        </Tabs>
      </MainBody>
    );
  }
}
export default Fixture;
