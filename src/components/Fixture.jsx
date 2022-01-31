import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SoccerLineUp from "react-soccer-lineup";
import { MainBody, RowNote, ColNote, DropDownTitle } from "../assets/styles";
import { Timeline, TimelineEvent } from "react-event-timeline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";

const MySwal = withReactContent(Swal);

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
    this.changeLineUps = this.changeLineUps.bind(this);
    this.getNumber = this.getNumber.bind(this);
    this.playerNote = this.playerNote.bind(this);
    this.findPlayer = this.findPlayer.bind(this);
    this.showPlayerBoxNote = this.showPlayerBoxNote.bind(this);
  }

  findPlayer(id) {
    var playerId = 0;
    var playerName = null;

    for (const [key, value] of Object.entries(this.awaySquad)) {
      if (key == "squad") {
        for (const [key, players] of Object.entries(value)) {
          if (players.id == id) {
            playerId = players.id;
            playerName = players.name;
          }
          for (const [key, player] of Object.entries(players)) {
            if (player.id == id) {
              playerId = player.id;
              playerName = player.name;
            }
          }
        }
      }
    }

    for (const [key, value] of Object.entries(this.homeSquad)) {
      if (key == "squad") {
        for (const [key, players] of Object.entries(value)) {
          if (players.id == id) {
            playerId = players.id;
            playerName = players.name;
          }
          for (const [key, player] of Object.entries(players)) {
            if (player.id == id) {
              playerId = player.id;
              playerName = player.name;
            }
          }
        }
      }
    }
    return { id: playerId, name: playerName };
  }

  showPlayerBoxNote(player) {
    const options = [
      { value: "-5", label: "-5" },
      { value: "-4", label: "-4" },
      { value: "-3", label: "-3" },
      { value: "-2", label: "-2" },
      { value: "-1", label: "-1" },
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ];

    return (
      <RowNote>
        <ColNote>
          <h3>Attaque</h3>
          <DropDownTitle>Passe courte</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Passe longue</DropDownTitle>{" "}
          <Select options={options} />
          <DropDownTitle>Passe courte</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Tir</DropDownTitle> <Select options={options} />
          <DropDownTitle>Dribble</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Positionnement</DropDownTitle>{" "}
          <Select options={options} />
          <DropDownTitle>Controle</DropDownTitle> <Select options={options} />
        </ColNote>
        <ColNote>
          <h3>Defense</h3>
          <DropDownTitle>Degagement</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Interception</DropDownTitle>{" "}
          <Select options={options} />
          <DropDownTitle>Tackles</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Positionnement</DropDownTitle> <Select options={options} />
          <DropDownTitle>Duel Aerien</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Duel Terrestre</DropDownTitle>{" "}
          <Select options={options} />
        </ColNote>
        <ColNote>
          <h3>Defense</h3>
          <DropDownTitle>Degagement</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Interception</DropDownTitle>{" "}
          <Select options={options} />
          <DropDownTitle>Tackles</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Positionnement</DropDownTitle> <Select options={options} />
          <DropDownTitle>Duel Aerien</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Duel Terrestre</DropDownTitle>{" "}
          <Select options={options} />
        </ColNote>
        <ColNote>
          <h3>Defense</h3>
          <DropDownTitle>Degagement</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Interception</DropDownTitle>{" "}
          <Select options={options} />
          <DropDownTitle>Tackles</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Positionnement</DropDownTitle> <Select options={options} />
          <DropDownTitle>Duel Aerien</DropDownTitle>
          <Select title="test" placeholder="lol1" options={options} />
          <DropDownTitle>Duel Terrestre</DropDownTitle>{" "}
          <Select options={options} />
        </ColNote>
      </RowNote>
    );
  }
  playerNote(id) {
    var players = this.props.fixtureNotes[0];
    var index = -1;
    var player;

    for (var i = 0; i < players.length; i++) {
      if (players[i].id == id) {
        player = players[i];
        index = i;
      }
    }

    if (index == -1) {
      player = this.findPlayer(id);
    }

    // html: `<img src='${image_url}'/> pour le css du div
    return MySwal.fire({
      title: `${player.name}`,
      html: this.showPlayerBoxNote(player),
      confirmButtonText: "Save",
      focusConfirm: true,
      width: 1000,
      height: 1000,
      allowOutsideClick: false,
      showCancelButton: true,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector("#login").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return { login: login, password: password };
      },
    }).then((result) => {
      alert(result.value.login);
      MySwal.fire(
        `
        Login: ${result.value.login}
        Password: ${result.value.password}
      `.trim()
      );
    });
  }

  componentDidMount() {
    if (this.props.fixture.length > 0) {
      console.log(this.props.fixture[0].fixture.id);
      if (this.props.fixture[0].lineups.length > 0) {
        console.log("test1");
        this.homeSquad = this.buildHomeTeam(this.props.fixture[0].lineups[0]);
        this.awaySquad = this.buildAwayTeam(this.props.fixture[0].lineups[1]);
        this.setState({
          homeSquad: this.homeSquad,
          awaySquad: this.awaySquad,
        });
        this.forceUpdate();
      } else {
        console.log("test2");
        this.setState({
          homeSquad: this.homeSquad,
          awaySquad: this.awaySquad,
        });
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
          this.setState({
            homeSquad: this.homeSquad,
            awaySquad: this.awaySquad,
          });
          this.forceUpdate();
        } else {
          console.log("test4");
          this.homeSquad = undefined;
          this.awaySquad = undefined;
          this.setState({
            homeSquad: this.homeSquad,
            awaySquad: this.awaySquad,
          });
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
    const g_id = lineups.startXI[0].player.id;

    var gk = {
      number: lineups.startXI[0].player.number,
      name: lineups.startXI[0].player.name,
      color: `#${homeGoalkeeperColor}`,
      numberColor: `#${homeGoalkeeperNumberColor}`,
      id: lineups.startXI[0].player.id,
      nameColor: `#000000`,
      onClick: () => this.playerNote(g_id),
    };
    var count = 1;
    var df = [];
    var cm = [];
    var cam = [];
    var fw = [];

    // for defenders
    for (var i = positions[0]; 0 < i; i--) {
      const id = lineups.startXI[i].player.id;
      df.push({
        number: lineups.startXI[i].player.number,
        name: lineups.startXI[i].player.name,
        color: `#${homeTeamColor}`,
        numberColor: `#${homeTeamNumberColor}`,
        id: lineups.startXI[i].player.id,
        nameColor: `#000000`,
        onClick: () => this.playerNote(id),
      });
      count++;
    }

    // for midfields
    for (var i = positions[1]; 0 < i; i--) {
      const id = lineups.startXI[count].player.id;
      cm.push({
        number: lineups.startXI[count].player.number,
        name: lineups.startXI[count].player.name,
        color: `#${homeTeamColor}`,
        numberColor: `#${homeTeamNumberColor}`,
        id: lineups.startXI[count].player.id,
        nameColor: `#000000`,
        onClick: () => this.playerNote(id),
      });
      count++;
    }

    if (positions[3] == undefined) {
      // for forward
      for (var i = positions[2]; 0 < i; i--) {
        const id = lineups.startXI[count].player.id;
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
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
        const id = lineups.startXI[count].player.id;
        cam.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
        });
        count++;
      }
      // for forward
      for (var i = positions[3]; 0 < i; i--) {
        const id = lineups.startXI[count].player.id;
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${homeTeamColor}`,
          numberColor: `#${homeTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
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
    const g_id = lineups.startXI[0].player.id;

    var gk = {
      number: lineups.startXI[0].player.number,
      name: lineups.startXI[0].player.name,
      color: `#${awayGoalkeeperColor}`,
      numberColor: `#${awayGoalkeeperNumberColor}`,
      id: lineups.startXI[0].player.id,
      nameColor: `#000000`,
      onClick: () => this.playerNote(g_id),
    };

    var count = 1;
    var df = [];
    var cm = [];
    var cam = [];
    var fw = [];

    // for defenders
    for (var i = positions[0]; 0 < i; i--) {
      const id = lineups.startXI[i].player.id;
      const player = {
        number: lineups.startXI[i].player.number,
        name: lineups.startXI[i].player.name,
        color: `#${awayTeamColor}`,
        numberColor: `#${awayTeamNumberColor}`,
        id: lineups.startXI[i].player.id,
        nameColor: `#000000`,
        onClick: () => this.playerNote(id),
      };
      df.push(player);
      count++;
    }

    // for midfields
    for (var i = positions[1]; 0 < i; i--) {
      const id = lineups.startXI[count].player.id;
      cm.push({
        number: lineups.startXI[count].player.number,
        name: lineups.startXI[count].player.name,
        color: `#${awayTeamColor}`,
        numberColor: `#${awayTeamNumberColor}`,
        id: lineups.startXI[count].player.id,
        nameColor: `#000000`,
        onClick: () => this.playerNote(id),
      });
      count++;
    }

    if (positions[3] == undefined) {
      // for forward
      for (var i = positions[2]; 0 < i; i--) {
        const id = lineups.startXI[count].player.id;
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
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
        const id = lineups.startXI[count].player.id;
        cam.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
        });
        count++;
      }
      // for forward
      for (var i = positions[3]; 0 < i; i--) {
        const id = lineups.startXI[count].player.id;
        fw.push({
          number: lineups.startXI[count].player.number,
          name: lineups.startXI[count].player.name,
          color: `#${awayTeamColor}`,
          numberColor: `#${awayTeamNumberColor}`,
          id: lineups.startXI[count].player.id,
          nameColor: `#000000`,
          onClick: () => this.playerNote(id),
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
      message = "OUT : " + event.player.name + " IN : " + event.assist.name;
      this.changeLineUps(event, this.props.fixture[0]);
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

  changeLineUps(event, fixture) {
    if (event.team.id == fixture.teams.home.id) {
      var squadSelected = this.state.homeSquad;
    } else {
      var squadSelected = this.state.awaySquad;
    }

    for (const [key, value] of Object.entries(squadSelected)) {
      if (key == "squad") {
        for (const [key, players] of Object.entries(value)) {
          if (players.id == event.player.id) {
            players.id = event.assist.id;
            players.name = event.assist.name;
            players.onClick = () => this.playerNote(event.assist.id);
            players.number = this.getNumber(event.assist.id);
          }
          for (const [key, player] of Object.entries(players)) {
            if (player.id == event.player.id) {
              player.id = event.assist.id;
              player.name = event.assist.name;
              player.onClick = () => this.playerNote(event.assist.id);
              player.number = this.getNumber(event.assist.id);
            }
          }
        }
      }
    }
  }

  getNumber(id) {
    var number;
    this.props.fixture[0].lineups[0].substitutes.forEach((player) => {
      if (player.player.id == id) {
        number = player.player.number;
      }
    });

    this.props.fixture[0].lineups[1].substitutes.forEach((player) => {
      if (player.player.id == id) {
        number = player.player.number;
      }
    });

    return number;
  }

  setEvent(event) {
    const title = this.setTitle(event);
    const time = this.setTime(event.time);
    const icon = this.setIcon(event);
    const message = this.setMessage(event, title);

    return (
      <TimelineEvent title={title} createdAt={time} icon={icon}>
        <img src={event.team.logo} width="2%" height="2%" />
        {message}
      </TimelineEvent>
    );
  }

  render() {
    const { color, pattern } = this.state;
    return (
      <MainBody>
        <SoccerLineUp
          size="responsive"
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
