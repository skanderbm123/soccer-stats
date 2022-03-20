import React, { Component } from "react";
import {
  CenterBody,
  MainBody,
  RowNote,
  ColNote,
  DropDownTitle,
  RowContent,
  RowItem,
} from "../assets/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { assignFixture } from "../lib/CountriesAndLeagues";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import {
  updatePlayerNotesByFixtureId,
  getTeamFixtures,
} from "../lib/DatabaseRequests";
import { Card, Image } from "semantic-ui-react";

const GameInfoContainer = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-weight: 700;
  grid-area: date
  justify-content: center;
  min-width: 100px;
`;

const GameInfo = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

const MySwal = withReactContent(Swal);
const parseDate = (date) => new Date(date).toDateString();
const parseTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
const currentTime = new Date().toISOString();

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixtureMap: new Map(),
      fixtureKeys: [],
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

    this.playerNote = this.playerNote.bind(this);
    this.findPlayer = this.findPlayer.bind(this);
    this.showPlayerBoxNote = this.showPlayerBoxNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showSwal = this.showSwal.bind(this);
    this.newData = this.newData.bind(this);
    this.renderMatch = this.renderMatch.bind(this);
    this.seeNote = this.seeNote.bind(this);
    this.fixtureBeforeCurrentDate = this.fixtureBeforeCurrentDate.bind(this);
    this.renderStatsNotes = this.renderStatsNotes.bind(this);
  }

  componentDidMount(prevProps, prevState) {
    let myKeys = [];
    console.log("FROM Mount in PLAYER");
    if (this.newData(prevProps, prevState)) {
      console.log("inside MOUNT ");
      getTeamFixtures(this.props.teamId, (fixtureMap) => {
        const newFixtureMap = assignFixture(fixtureMap);
        newFixtureMap.forEach((value, key) => myKeys.push(key));
        this.setState(
          (prevState) => ({ fixtureKeys: myKeys }),
          () => {}
        );
        this.setState(
          (prevState) => ({ fixtureMap: newFixtureMap }),
          () => {}
        );
      });
    } else {
      console.log("outside MOUNT");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let myKeys = [];
    console.log("FROM update in PLAYER");
    if (this.newData(prevProps, prevState)) {
      console.log("inside ");
      getTeamFixtures(this.props.teamId, (fixtureMap) => {
        const newFixtureMap = assignFixture(fixtureMap);
        newFixtureMap.forEach((value, key) => myKeys.push(key));
        this.setState(
          (prevState) => ({ fixtureKeys: myKeys }),
          () => {}
        );
        this.setState(
          (prevState) => ({ fixtureMap: newFixtureMap }),
          () => {}
        );
      });
    } else {
      console.log("outside  UPDATE");
    }
  }

  newData(prevProps, prevState) {
    if (prevProps == undefined) {
      return true;
    } else {
      if (prevProps.selectedFixtureNotes != this.props.selectedFixtureNotes) {
        return true;
      }
    }
    return false;
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

    for (const [key, value] of Object.entries(
      this.props.fixture[0].lineups[0].substitutes
    )) {
      if (value.player.id == id) {
        playerId = value.player.id;
        playerName = value.player.name;
      }
    }

    for (const [key, value] of Object.entries(
      this.props.fixture[0].lineups[1].substitutes
    )) {
      if (value.player.id == id) {
        playerId = value.player.id;
        playerName = value.player.name;
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

  showSwal(player, players, index, fixtureId) {
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
        updatePlayerNotesByFixtureId(fixtureId.toString(), players);
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

  playerNote(id, fixtureId) {
    var fixtures = this.props.selectedFixtureNotes;
    var index = -1;
    var player;
    var players;
    var found = false;

    for (const [key, fixture] of Object.entries(fixtures)) {
      if (fixture._id == fixtureId) {
        for (const [key, player] of Object.entries(fixture)) {
          if (key == "players") {
            players = player;
            found = true;
          }
        }
      }
    }

    if (found) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
          player = players[i];
          index = i;
        }
      }
    } else {
      return null;
    }

    if (index == -1) {
      return null;
    }

    return (
      <Button
        variant="primary"
        onClick={() => this.seeNote(player, players, index, fixtureId)}
      >
        See Player Notes
      </Button>
    );
  }

  seeNote(player, players, index, fixtureId) {
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
        this.showSwal(player, players, index, fixtureId);
      }
    );
  }

  renderMatch(fixture) {
    for (const [key, fixture] of Object.entries(fixture)) {
      return this.fixtureBeforeCurrentDate(fixture.fixture.date) ? (
        <Row
          className="row gx-0"
          style={{
            border: "1px solid #ccc",
            marginBottom: "1%",
            marginTop: "1%",
          }}
        >
          <Col xs lg="2">
            {" "}
            <img
              src={fixture.teams.home.logo}
              alt={fixture.teams.home.name}
              width="60"
              padding="2%"
              marginRight="4%"
            />
            {fixture.teams.home.name}
          </Col>
          <Col xs lg="6">
            <GameInfoContainer>
              <GameInfo>{parseTime(fixture.fixture.date)}</GameInfo>
              <GameInfo>{parseDate(fixture.fixture.date)}</GameInfo>
              <GameInfo>{fixture.league.name}</GameInfo>
            </GameInfoContainer>
          </Col>
          <Col xs lg="2">
            {fixture.teams.away.name}
            <img
              src={fixture.teams.away.logo}
              alt={fixture.teams.away.logo}
              width="60"
              padding="2%"
              marginLeft="4%"
            />
          </Col>
          <Col
            xs
            lg="1"
            className="d-flex align-items-center justify-content-center"
          >
            <CenterBody>
              <Button
                variant="primary"
                onClick={() => this.setFixtureId(fixture.fixture.id)}
              >
                See Fixture
              </Button>
            </CenterBody>
          </Col>
          <Col
            xs
            lg="1"
            className="d-flex align-items-center justify-content-center"
          >
            <CenterBody>
              {this.playerNote(this.props.player.player_id, fixture.fixture.id)}
            </CenterBody>
          </Col>
        </Row>
      ) : null;
    }
  }

  setFixtureId(fixtureId) {
    this.props.setFixtureId(fixtureId);
    this.props.setTabIndex(3);
  }

  fixtureBeforeCurrentDate(date) {
    if (currentTime >= date) {
      return true;
    }
    return false;
  }

  renderStatsNotes() {
    return (
      <RowNote>
        <Card xs lg="2">
          <ColNote>
            <h3>Attaque</h3>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
          </ColNote>
        </Card>
        <Card xs lg="2">
          <ColNote>
            <h3>Attaque</h3>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
            <RowContent>
              <RowItem>
                <DropDownTitle>Duel terrestre</DropDownTitle>
              </RowItem>
              <RowItem>
                <input size="2" disabled></input>
              </RowItem>
            </RowContent>
          </ColNote>
        </Card>
      </RowNote>
    );
  }

  render() {
    const { fixtureKeys, fixtureMap } = this.state;
    return (
      <section>
        {this.props.teamId != 0 ? (
          <MainBody>
            {this.props.teamId != 0 ? (
              <CenterBody>
                <Row>
                  <Col xs lg="3">
                    <Card>
                      <Image
                        src={`https://media.api-sports.io/football/players/${this.props.player.player_id}.png`}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header>
                          {this.props.player.player_name}
                        </Card.Header>
                        <Card.Meta>
                          <span className="date">
                            Nationality: {this.props.player.nationality}
                          </span>
                        </Card.Meta>
                        <Card.Description>
                          Full Name:{" "}
                          {this.props.player.firstname +
                            " " +
                            this.props.player.lastname}
                          <br />
                          Age: {this.props.player.age}
                          <br />
                          Position: {this.props.player.position}
                          <br />
                          Height: {this.props.player.height}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Col>
                  <Col xs lg="4">
                    {" "}
                    {this.renderStatsNotes()}
                  </Col>
                </Row>
              </CenterBody>
            ) : (
              <CenterBody>
                {" "}
                <p> no player information available </p>
              </CenterBody>
            )}
            {this.props.player.player_id != null ? (
              <Tabs>
                <TabList>
                  {fixtureKeys.map((item) => (
                    <Tab>{item}</Tab>
                  ))}
                </TabList>

                {fixtureKeys.map((key) => (
                  <TabPanel>
                    {fixtureMap.has(key)
                      ? fixtureMap
                          .get(key)
                          .map((fixture) => this.renderMatch(fixture))
                      : null}
                  </TabPanel>
                ))}
              </Tabs>
            ) : null}
          </MainBody>
        ) : (
          <p> no player is currently shown</p>
        )}
      </section>
    );
  }
}
export default Player;
