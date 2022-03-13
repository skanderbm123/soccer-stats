import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import SelectCountry from "./SelectCountry";
import SelectLeague from "./SelectLeague";
import LeagueStandings from "./LeagueStandings";
import TeamFixturesUpcoming from "./TeamFixturesUpcoming";
import TeamFixturesLive from "./TeamFixturesLive";
import TeamPlayers from "./TeamPlayers";
import PlayerHighlightedStats from "./PlayerHighlightedStats";
import LiveScore from "./LiveScore";
import {
  getFootballStandings,
  getFootballCountries,
  getFootballLeaguess,
  getTeamInfo,
  getTeamPlayers,
  getPlayerStats,
  getLiveScore,
  getFixtureById,
  getPlayerNotesByFixtureId
} from "../lib/DatabaseRequests";

import {
  assignCountryOptions,
  assignLeagueOptions,
  assignLiveScore,
  assignFixture,
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
      fixtureId: 710593,
      teamId: 0,
      fixture: [],
      fixtureNotes: [],
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
    this.setTeamId = this.setTeamId.bind(this);
  }

  componentDidMount() {
    // leeds united placeholders
    getFootballStandings(3506, (standings) => {
      this.setState({ standings });
      this.updateCountryLeagueList({ value: "France" });
      //this.highlightClubInfo(63);
     // this.addClubToList(63);
      //this.highlightPlayerInfo(19130);
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
    this.setTeamId(id);
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
    getLiveScore((presentLiveScore) => {
      const livescores = assignLiveScore(presentLiveScore);
      this.setState({ livescores: livescores });
    });
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
    getPlayerNotesByFixtureId(id, (fixtureNotes) => this.setState({ fixtureNotes }));
  }

  setFixtureId(fixtureId) {
    console.log(fixtureId)
    this.setState({ fixtureId: fixtureId });
    this.getFixtureById(fixtureId);
  }

  setTeamId(teamId) {
    this.setState({ teamId: teamId });
  }

  render() {
    const {
      standings,
      countries,
      leagues,
      teamPlayers,
      playerHighlightInfo,
      teamHighlightFixtures,
      livescores,
      tabIndex,
      fixtureId,
      fixture,
      fixtureNotes,
      teamId
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
            <Fixture fixture={fixture} fixtureId={fixtureId} fixtureNotes={fixtureNotes} />
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
              </ClubInformationSection>
            ) : null}
            
              <ClubInformationSection>
                 <TeamFixturesLive
                  addClubToList={this.addClubToList}
                  setTabIndex={this.updateTabIndex}
                  teamId={teamId}
                  setFixtureId={this.setFixtureId}
                />
            
              </ClubInformationSection>
              
              <ClubInformationSection>
                 <TeamFixturesUpcoming
                  addClubToList={this.addClubToList}
                  setTabIndex={this.updateTabIndex}
                  teamId={teamId}
                  setFixtureId={this.setFixtureId}
                />
            
              </ClubInformationSection>

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
