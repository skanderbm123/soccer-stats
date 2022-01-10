import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SoccerLineUp from "react-soccer-lineup";
import { GlobalStyle, MainBody, DoubleYellowCard } from "../assets/styles";
import { Timeline, TimelineEvent } from "react-event-timeline";

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

    this.setEvent = this.setEvent.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setMessage = this.setMessage.bind(this);
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

  setTitle(event) {
    if (event.detail == "Normal Goal") {
      return "GOAL!";
    }
    if (event.detail == "Own Goal") {
      return "OWN GOAL!";
    }
    if (event.detail == "Penalty") {
      return "GOAL BY PENALTY!";
    }
    if (event.detail == "Missed Penalty") {
      return "MISSED PENALTY!";
    }
    if (event.type == "subst") {
      return "Substitution";
    }
    if (event.detail == "Yellow Card") {
      return "Yellow Card";
    }
    if (event.detail == "Second Yellow card") {
      return "Second Yellow card";
    }
    if (event.detail == "Red card") {
      return "Red card";
    }
  }

  setTime(time) {
    if (time.extra == null) {
      return time.elapsed + "'";
    } else {
      return time.elapsed + "+" + time.extra + "'";
    }
  }

  setIcon(event) {
    if (event.detail == "Normal Goal") {
      return (
        <img
          src="https://cdn-icons.flaticon.com/png/512/2248/premium/2248135.png?token=exp=1641786949~hmac=32cbbdd942482fb236f76a07a011983e"
          width="125%"
          height="100%"
        />
      );
    }
    if (event.detail == "Own Goal") {
      return (
        <img
          src="https://cdn-icons.flaticon.com/png/512/3572/premium/3572495.png?token=exp=1641787035~hmac=f5368759e5bfa46566999008499c57fe"
          width="125%"
          height="100%"
        />
      );
    }
    if (event.detail == "Penalty") {
      return (
        <img
          src="https://cdn-icons.flaticon.com/png/512/5043/premium/5043520.png?token=exp=1641786909~hmac=7a5445544362d7e64d9d73c88cb2662c"
          width="125%"
          height="100%"
        />
      );
    }
    if (event.detail == "Missed Penalty") {
      return (
        <img
          src="https://cdn-icons.flaticon.com/png/512/1758/premium/1758767.png?token=exp=1641787071~hmac=407d9804c7213287294deda30fb0c2b3"
          width="125%"
          height="100%"
        />
      );
    }
    if (event.type == "subst") {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3101/3101075.png"
          width="125%"
          height="100%"
        />
      );
    }
    if (event.detail == "Yellow Card") {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/2718/2718517.png"
          width="100%"
          height="100%"
        />
      );
    }
    if (event.detail == "Second Yellow card") {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4320/4320640.png"
          width="100%"
          height="100%"
        />
      );
    }
    if (event.detail == "Red card") {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4768/4768714.png"
          width="100%"
          height="100%"
        />
      );
    }
  }

  setMessage(event) {
    var message = "";
    if (event.detail == "Normal Goal") {
      message = " Goal by " + event.player.name + "! ";

      if (event.assist.name == null) {
        return message;
      } else {
        message += " Assisted by " + event.assist.name;
        return message;
      }
    }
    if (event.detail == "Own Goal") {
      message = " Own Goal by " + event.player.name + "!";
      return message;
    }
    if (event.detail == "Penalty") {
      message = " Penalty shot by " + event.player.name + "!";
      return message;
    }
    if (event.detail == "Missed Penalty") {
      message = " Penalty shot missed by " + event.player.name + "!";
      return message;
    }
    if (event.type == "subst") {
      message =  " OUT : " + event.player.name + " IN : " + event.assist.name;
      return message;
    }
    if (event.detail == "Yellow Card") {
      message = " Yellow Card for " + event.player.name + "!";
      return message;
    }
    if (event.detail == "Second Yellow card") {
      message = " Double yellow Card for " + event.player.name + "!";
      return message;
    }
    if (event.detail == "Red card") {
      message = " Red card for " + event.player.name + "!";
      return message;
    }
  }

  setEvent(event) {
    const title = this.setTitle(event);
    const time = this.setTime(event.time);
    const icon = this.setIcon(event);
    const message = this.setMessage(event, title);

    return (
      <TimelineEvent title={title} createdAt={time} icon={icon}>
        <img
          src={event.team.logo}
          width="2%"
          height="2%"
        />
        {message}
      </TimelineEvent>
    );
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
            <Tab>Events</Tab>
            <Tab>Players</Tab>
            <Tab>Statistics</Tab>
          </TabList>

          <TabPanel>
            <Timeline>
              {this.props.fixture[0].events.map((event) =>
                this.setEvent(event)
              )}
            </Timeline>
          </TabPanel>

          <TabPanel></TabPanel>

          <TabPanel></TabPanel>
        </Tabs>
      </MainBody>
    );
  }
}
export default Fixture;
