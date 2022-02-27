import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SoccerLineUp from "react-soccer-lineup";
import {
  MainBody,
  RowNote,
  ColNote,
  DropDownTitle,
  RowContent,
  RowItem,
} from "../assets/styles";
import { Timeline, TimelineEvent } from "react-event-timeline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { updatePlayerNotesByFixtureId } from "../lib/DatabaseRequests";
const MySwal = withReactContent(Swal);

class Fixture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "588f58",
      pattern: "lines",
      homeSquad: [],
      awaySquad: [],
      pass_courte: 0,
      pass_longue: 0,
      tir: 0,
      dribble: 0,
      positionnement: 0,
      controles: 0,
      degagement: 0,
      interceptions: 0,
      tackles: 0,
      duel_aeerien: 0,
      positionnement_defense: 0,
      duel_terrestre: 0,
      pass_courteV: 0,
      pass_longueV: 0,
      tirV: 0,
      dribbleV: 0,
      positionnementV: 0,
      controlesV: 0,
      degagementV: 0,
      interceptionsV: 0,
      tacklesV: 0,
      duel_aeerienV: 0,
      positionnement_defenseV: 0,
      duel_terrestreV: 0,
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
    this.handleChange = this.handleChange.bind(this);
    this.showSwal = this.showSwal.bind(this);
  }

  componentDidMount() {
    if (this.props.fixture.length > 0) {
      console.log(this.props.fixture[0].fixture.id);
      if (this.props.fixture[0].lineups.length > 0) {
        this.homeSquad = this.buildHomeTeam(this.props.fixture[0].lineups[0]);
        this.awaySquad = this.buildAwayTeam(this.props.fixture[0].lineups[1]);
        this.setState({
          homeSquad: this.homeSquad,
          awaySquad: this.awaySquad,
        });
        this.forceUpdate();
      } else {
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

  handleChange(value, field) {
    if (field == 1) {
      this.setState(
        (prevState) => ({
          pass_courteV: value,
        }),
        () => {}
      );
    } else if (field == 2) {
      this.setState(
        (prevState) => ({
          pass_longueV: value,
        }),
        () => {}
      );
    } else if (field == 3) {
      this.setState(
        (prevState) => ({
          tirV: value,
        }),
        () => {}
      );
    } else if (field == 4) {
      this.setState(
        (prevState) => ({
          dribbleV: value,
        }),
        () => {}
      );
    } else if (field == 5) {
      this.setState(
        (prevState) => ({
          positionnementV: value,
        }),
        () => {}
      );
    } else if (field == 6) {
      this.setState(
        (prevState) => ({
          controlesV: value,
        }),
        () => {}
      );
    } else if (field == 7) {
      this.setState(
        (prevState) => ({
          degagementV: value,
        }),
        () => {}
      );
    } else if (field == 8) {
      this.setState(
        (prevState) => ({
          interceptionsV: value,
        }),
        () => {}
      );
    } else if (field == 9) {
      this.setState(
        (prevState) => ({
          tacklesV: value,
        }),
        () => {}
      );
    } else if (field == 10) {
      this.setState(
        (prevState) => ({
          positionnement_defenseV: value,
        }),
        () => {}
      );
    } else if (field == 11) {
      this.setState(
        (prevState) => ({
          duel_aeerienV: value,
        }),
        () => {}
      );
    } else if (field == 12) {
      this.setState(
        (prevState) => ({
          duel_terrestreV: value,
        }),
        () => {}
      );
    }
  }

  showPlayerBoxNote(player) {
    const options = [
      { value: -5, label: "-5" },
      { value: -4, label: "-4" },
      { value: -3, label: "-3" },
      { value: -2, label: "-2" },
      { value: -1, label: "-1" },
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
    ];

    const {
      pass_courte,
      pass_longue,
      tir,
      dribble,
      positionnement,
      controles,
      degagement,
      interceptions,
      tackles,
      duel_aeerien,
      positionnement_defense,
      duel_terrestre,
    } = this.state;

    return (
      <RowNote>
        <ColNote>
          <h3>Attaque</h3>
          <RowContent>
            <RowItem>
              <DropDownTitle>Passe courte</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-passe_courte"
                options={options}
                onChange={(e) => this.handleChange(e.value, 1)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={pass_courte} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Longue passe</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-passe_longue"
                options={options}
                onChange={(e) => this.handleChange(e.value, 2)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={pass_longue} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Tir</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-tir"
                options={options}
                onChange={(e) => this.handleChange(e.value, 3)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={tir} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Dribble</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-dribble"
                options={options}
                onChange={(e) => this.handleChange(e.value, 4)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={dribble} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Positionnement</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-positionnement"
                options={options}
                menuPlacement="top"
                onChange={(e) => this.handleChange(e.value, 5)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={positionnement} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Controles</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                data="id-controles"
                options={options}
                menuPlacement="top"
                onChange={(e) => this.handleChange(e.value, 6)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={controles} disabled></input>
            </RowItem>
          </RowContent>
        </ColNote>
        <ColNote>
          <h3>Defense</h3>
          <RowContent>
            <RowItem>
              <DropDownTitle>Dégagement</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-degagement"
                options={options}
                onChange={(e) => this.handleChange(e.value, 7)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={degagement} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Interceptions</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-interceptions"
                options={options}
                onChange={(e) => this.handleChange(e.value, 8)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={interceptions} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Tackles</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-tackles"
                options={options}
                onChange={(e) => this.handleChange(e.value, 9)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={tackles} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Positionnement</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-positionnement_defense"
                options={options}
                onChange={(e) => this.handleChange(e.value, 10)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={positionnement_defense} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Duel aéerien</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-duel_aeerien"
                options={options}
                menuPlacement="top"
                onChange={(e) => this.handleChange(e.value, 11)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={duel_aeerien} disabled></input>
            </RowItem>
          </RowContent>
          <RowContent>
            <RowItem>
              <DropDownTitle>Duel terrestre</DropDownTitle>
            </RowItem>
            <RowItem>
              <Select
                id="data-duel_terrestre"
                options={options}
                menuPlacement="top"
                onChange={(e) => this.handleChange(e.value, 12)}
              />
            </RowItem>
            <RowItem>
              <input size="2" value={duel_terrestre} disabled></input>
            </RowItem>
          </RowContent>
        </ColNote>
      </RowNote>
    );
  }

  showSwal(player, players, index) {
    return MySwal.fire({
      title: `${player.name}`,
      html: this.showPlayerBoxNote(player),
      confirmButtonText: "Save",
      focusConfirm: true,
      width: 1000,
      height: 1000,
      allowOutsideClick: false,
      showCancelButton: true,
    }).then((results) => {
      if (results.isConfirmed) {
        player.pass_courte = player.pass_courte + this.state.pass_courteV;
        player.pass_longue = player.pass_longue + this.state.pass_longueV;
        player.tir = player.tir + this.state.tirV;
        player.dribble = player.dribble + this.state.dribbleV;
        player.positionnement =
          player.positionnement + this.state.positionnementV;
        player.controles = player.controles + this.state.controlesV;
        player.degagement = player.degagement + this.state.degagementV;
        player.interceptions = player.interceptions + this.state.interceptionsV;
        player.tackles = player.tackles + this.state.tacklesV;
        player.duel_aeerien = player.duel_aeerien + this.state.duel_aeerienV;
        player.positionnement_defense + this.state.positionnement_defenseV;
        player.duel_terrestre =
          player.duel_terrestre + this.state.duel_terrestreV;

        if (index != -1) {
          players[index] = player;
        } else {
          players.push(player);
        }
        updatePlayerNotesByFixtureId(
          this.props.fixture[0].fixture.id.toString(),
          players
        );
      }

      this.setState(
        (prevState) => ({
          pass_courteV: 0,
          pass_longueV: 0,
          tirV: 0,
          dribbleV: 0,
          positionnementV: 0,
          controlesV: 0,
          degagementV: 0,
          interceptionsV: 0,
          tacklesV: 0,
          duel_aeerienV: 0,
          positionnement_defenseV: 0,
          duel_terrestreV: 0,
        }),
        () => {}
      );
    });
  }

  playerNote(id) {
    var players = this.props.fixtureNotes;
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
      player.pass_courte = 0;
      player.pass_longue = 0;
      player.tir = 0;
      player.dribble = 0;
      player.positionnement = 0;
      player.controles = 0;
      player.degagement = 0;
      player.interceptions = 0;
      player.tackles = 0;
      player.duel_aeerien = 0;
      player.positionnement_defense = 0;
      player.duel_terrestre = 0;
    }

    this.setState(
      {
        pass_courte: player.pass_courte,
        pass_longue: player.pass_longue,
        tir: player.tir,
        dribble: player.dribble,
        positionnement: player.positionnement,
        controles: player.controles,
        degagement: player.degagement,
        interceptions: player.interceptions,
        tackles: player.tackles,
        duel_aeerien: player.duel_aeerien,
        positionnement_defense: player.positionnement_defense,
        duel_terrestre: player.duel_terrestre,
      },
      () => {
        this.showSwal(player, players, index);
      }
    );
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
