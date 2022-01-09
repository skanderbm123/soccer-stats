import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import SelectCountry from "./SelectCountry";
import SelectLeague from "./SelectLeague";
import LeagueStandings from "./LeagueStandings";
import MyClubs from "./MyClubs";
import ClubInfomation from "./ClubInfo";
import TeamFixtures from "./TeamFixtures";
import TeamPlayers from "./TeamPlayers";
import PlayerHighlightedStats from "./PlayerHighlightedStats";
import LiveScore from "./LiveScore";
import {
  getFootballStandings,
  getFootballCountries,
  getFootballLeaguess,
  getTeamInfo,
  getTeamFixtures,
  getTeamPlayers,
  getPlayerStats,
  getLiveScore,
  getFixtureById,
} from "../lib/DatabaseRequests";

import {
  assignCountryOptions,
  assignLeagueOptions,
  assignLiveScore,
} from "../lib/CountriesAndLeagues";

import {
  GlobalStyle,
  MainBody,
  ClubInformationSection,
} from "../assets/styles";
import Fixture from "./Fixture";

class SoccerStats extends Component {
  constructor() {
    super();
    this.state = {
      standings: [],
      countries: [],
      leagues: [],
      myClubs: [],
      teamPlayers: [],
      teamHighlightInfo: [],
      playerHighlightInfo: [],
      teamHighlightFixtures: [],
      livescores: [],
      tabIndex: 0,
      fixtureId: 0,
      fixture: [],
    };
    this.addClubToList = this.addClubToList.bind(this);
    this.removeClubFromList = this.removeClubFromList.bind(this);
    this.highlightClubInfo = this.highlightClubInfo.bind(this);
    this.highlightPlayerInfo = this.highlightPlayerInfo.bind(this);
    this.updateCountryLeagueList = this.updateCountryLeagueList.bind(this);
    this.updateFootballStandings = this.updateFootballStandings.bind(this);
    this.updateTabIndex = this.updateTabIndex.bind(this);
    this.getLiveScore = this.getLiveScore.bind(this);
    this.getFixtureById = this.getFixtureById.bind(this);
    this.setFixtureId = this.setFixtureId.bind(this);
  }

  componentDidMount() {
    // leeds united placeholders
    getFootballStandings(2790, (standings) => {
      this.setState({ standings });
      this.updateCountryLeagueList({ value: "England" });
      this.highlightClubInfo(63);
      this.addClubToList(63);
      this.highlightPlayerInfo(19130);
      this.getLiveScore();
    });
    getFootballCountries((availableCountries) => {
      const countries = assignCountryOptions(availableCountries);
      this.setState({ countries });
    });

    setInterval(() => {
      this.getLiveScore();
    }, 300000);
    this.getFixtureById(this.state.fixtureId);
  }

  addClubToList(id) {
    const { standings, myClubs } = this.state;
    const findTeam = [...standings]
      .map((team) => team.find((e) => e.team_id === id))
      .filter((e) => e !== undefined);
    if (!myClubs.some((club) => club.team_id === id)) {
      this.setState((prevState) => ({
        myClubs: [findTeam[0], ...prevState.myClubs],
      }));
    }
    this.highlightClubInfo(id);
  }

  removeClubFromList(id) {
    const { myClubs } = this.state;
    const newClubs = [...myClubs].filter((e) => e.team_id !== id);
    this.setState({ myClubs: newClubs });
  }

  highlightClubInfo(id) {
    getTeamInfo(id, (teamHighlightInfo) => {
      this.setState({ teamHighlightInfo });
    });
    getTeamFixtures(id, (teamHighlightFixtures) =>
      this.setState({ teamHighlightFixtures })
    );
    getTeamPlayers(id, (teamPlayers) => this.setState({ teamPlayers }));
  }

  highlightPlayerInfo(id) {
    getPlayerStats(id, (playerHighlightInfo) =>
      this.setState({ playerHighlightInfo })
    );
  }

  updateCountryLeagueList(country) {
    const { value } = country;
    getFootballLeaguess(value, (allLeagues) => {
      const leagues = assignLeagueOptions(allLeagues);
      this.setState({ leagues });
    });
  }

  updateFootballStandings(league) {
    const { value } = league;
    getFootballStandings(value, (standings) => this.setState({ standings }));
  }

  updateTabIndex(index) {
    this.setState({ tabIndex: index });
  }

  getLiveScore() {
    getLiveScore((presentLiveScore) => {
      const livescores = assignLiveScore(presentLiveScore);
      this.setState({ livescores: livescores });
    });
  }

  getFixtureById(id) {
    getFixtureById(id, (fixture) => this.setState({ fixture }));
  }

  setFixtureId(fixtureId) {
    this.setState({ fixtureId: fixtureId });
    this.getFixtureById(fixtureId);
  }

  render() {
    const {
      standings,
      countries,
      leagues,
      myClubs,
      teamPlayers,
      teamHighlightInfo,
      playerHighlightInfo,
      teamHighlightFixtures,
      livescores,
      tabIndex,
      fixtureId,
      fixture,
    } = this.state;
    return (
      <MainBody>
        <GlobalStyle />
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => this.updateTabIndex(index)}
        >
          <TabList>
            <Tab>Live Score</Tab>
            <Tab>Fixture</Tab>
            <Tab>Other</Tab>
          </TabList>

          <TabPanel>
            <LiveScore
              livescores={livescores}
              setTabIndex={this.updateTabIndex}
              setFixtureId={this.setFixtureId}
            />
          </TabPanel>

          <TabPanel>
            <Fixture fixture={fixture} fixtureId={fixtureId} />
          </TabPanel>

          <TabPanel>
            <ClubInformationSection>
              <SelectCountry
                countries={countries}
                updateCountryLeagueList={this.updateCountryLeagueList}
              />
              <SelectLeague
                leagues={leagues}
                updateFootballStandings={this.updateFootballStandings}
              />
            </ClubInformationSection>
            {standings.length ? (
              <ClubInformationSection>
                <LeagueStandings
                  standings={standings}
                  addClubToList={this.addClubToList}
                />
                <MyClubs
                  myClubs={myClubs}
                  removeClubFromList={this.removeClubFromList}
                  highlightClubInfo={this.highlightClubInfo}
                />
              </ClubInformationSection>
            ) : null}
            {teamHighlightFixtures.length ? (
              <ClubInformationSection>
                <ClubInfomation teamHighlightInfo={teamHighlightInfo} />
                <TeamFixtures
                  fixtures={teamHighlightFixtures}
                  addClubToList={this.addClubToList}
                />
              </ClubInformationSection>
            ) : null}
            {teamPlayers.length ? (
              <ClubInformationSection>
                <TeamPlayers
                  players={teamPlayers}
                  highlightPlayerInfo={this.highlightPlayerInfo}
                />
                <PlayerHighlightedStats
                  playerHighlightInfo={playerHighlightInfo}
                />
              </ClubInformationSection>
            ) : null}
          </TabPanel>
        </Tabs>
      </MainBody>
    );
  }
}

export default SoccerStats;
