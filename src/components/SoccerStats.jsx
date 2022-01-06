import React, { Component } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../assets/styles";
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
} from "../lib/DatabaseRequests";

import {
  assignCountryOptions,
  assignLeagueOptions,
  assignLiveScore,
} from "../lib/CountriesAndLeagues";

const MainBody = styled.div`
  aligh-items: center;
  display: flex;
  flex-flow: column;
  grid-gap: 10px 10px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
  min-width: 250px;
  padding-top: 5px;
  width: 80vw;
`;

const ClubInformationSection = styled.div`
  aligh-items: center;
  display: flex;
  flex-flow: row;
  grid-gap: 10px 10px;
  margin-left: auto;
  margin-right: auto;
  max-height: 365px;
  max-width: 1600px;
  min-width: 250px;
  width: 80vw;
`;

const TeamPlayersContainer = styled.div`
  max-height: 300px;
  width: 100%;
`;

const TeamPlayersTabelContainer = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-flow: column;
  max-height: 325px;
  min-width: 100%;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00d4b1;
    border: 1px solid #f1f3f4;
    border-radius: 4px;
  }
`;

const TeamPlayersTabelHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b2b2b2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: grid;
  font-weight: 700;
  grid-template-areas: "name position nationality age height weight";
  grid-template-columns: 3fr 2fr 2fr 1fr 1fr 1fr;
  min-width: 100%;
  padding: 5px;
  padding-top: 10px;
`;

const TeamPlayersTabelRow = styled.div`
  background-color: #fff;
  border-top: 1px solid #f1f3f4;
  cursor: pointer;
  display: grid;
  font-weight: 400;
  grid-template-areas: "name position nationality age height weight";
  grid-template-columns: 3fr 2fr 2fr 1fr 1fr 1fr;
  padding: 5px;

  &:hover {
    background-color: #00d4b1;
  }
`;

const PlayerName = styled.div`
  display: inline-block;
  grid-area: name;
  height: 20px;
  padding-left: 10px;
`;

const PlayerPosition = styled.div`
  grid-area: position;
  text-align: center;
`;

const PlayerNationality = styled.div`
  grid-area: nationality;
  text-align: center;
`;

const PlayerAge = styled.div`
  grid-area: age;
  text-align: center;
`;

const PlayerHeight = styled.div`
  grid-area: height;
  text-align: center;
`;

const PlayerWeight = styled.div`
  grid-area: weight;
  text-align: center;
`;

const PlayerFirstName = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
`;

const PlayerLastName = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  padding-left: 10px;
`;

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
    };
    this.addClubToList = this.addClubToList.bind(this);
    this.removeClubFromList = this.removeClubFromList.bind(this);
    this.highlightClubInfo = this.highlightClubInfo.bind(this);
    this.highlightPlayerInfo = this.highlightPlayerInfo.bind(this);
    this.updateCountryLeagueList = this.updateCountryLeagueList.bind(this);
    this.updateFootballStandings = this.updateFootballStandings.bind(this);
    this.updateTabIndex = this.updateTabIndex.bind(this);
    this.getLiveScore = this.getLiveScore.bind(this);
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
      this.getLiveScore()  
     }, 300000)
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

  getLiveScore(){
    getLiveScore((presentLiveScore) => {
      const livescores = assignLiveScore(presentLiveScore);
      this.setState({ livescores: livescores });
    });
  }

  test(fixture){
    console.log(fixture);
    this.updateTabIndex(2);
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
            <TeamPlayersContainer>
              <TeamPlayersTabelHeader>
                <PlayerName>Home</PlayerName>
                <PlayerPosition>ScoreHome</PlayerPosition>
                <PlayerNationality>ScoreAway</PlayerNationality>
                <PlayerAge>Away</PlayerAge>
                <PlayerHeight>Time</PlayerHeight>
                <PlayerWeight>League</PlayerWeight>
              </TeamPlayersTabelHeader>
              <TeamPlayersTabelContainer>
                {livescores.map((livescore) => (
                  <TeamPlayersTabelRow
                    key={livescore.fixture}
                    onClick={() => this.test(livescore.fixture)}
                  >
                    <PlayerName>
                      <PlayerFirstName>{`${livescore.teamH_name}.`}</PlayerFirstName>
                      <PlayerLastName>{livescore.teamA_name}</PlayerLastName>
                    </PlayerName>
                    <PlayerPosition>{livescore.goalH}</PlayerPosition>
                    <PlayerNationality>{livescore.goalA}</PlayerNationality>
                    <PlayerAge>{livescore.teamH_winner}</PlayerAge>
                    <PlayerHeight>{livescore.time}</PlayerHeight>
                    <PlayerWeight>{livescore.league_name}</PlayerWeight>
                  </TeamPlayersTabelRow>
                ))}
              </TeamPlayersTabelContainer>
            </TeamPlayersContainer>
          </TabPanel>

          <TabPanel></TabPanel>

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
