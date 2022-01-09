import { any } from "prop-types";
import React from "react";
import {
  MatchContainer,
  MatchTableContainer,
  TeamFlag,
  MatchRow,
  Box,
  TeamName,
  ScoreAndTime,
  Score,
  Time,
  LeagueBox,
  LeagueName,
  LeagueHeader,
  CountryName,
  CountryFlag,
  Space,
} from "../assets/styles";

class LiveScore extends React.Component {
  constructor() {
    super();
    this.state = {
      presentLeague: any,
    };
    this.setFixtureId = this.setFixtureId.bind(this);
    this.createNewTableForDifferentLeague.bind(this);
  }

  setFixtureId(fixtureId) {
    this.props.setFixtureId(fixtureId);
    this.props.setTabIndex(1);
  }

  createNewTableForDifferentLeague(currentLeague, newLeague) {
    if (currentLeague == newLeague) {
      return true;
    } else {
      this.presentLeague = newLeague;
      return false;
    }
  }

  render() {
    return this.props.livescores.map((livescore) =>
      this.createNewTableForDifferentLeague(
        this.presentLeague,
        livescore.league_name
      ) ? (
        <MatchContainer> 
          <MatchTableContainer>
            <MatchRow
              key={livescore.fixture}
              onClick={() => this.setFixtureId(livescore.fixture)}
            >
              <Box>
                <TeamFlag src={livescore.teamH_logo} />
                <TeamName>{livescore.teamH_name}</TeamName>
              </Box>
              <ScoreAndTime>
                <Score>
                  {livescore.goalH} - {livescore.goalA}
                </Score>
                <Time>{livescore.time}"</Time>
              </ScoreAndTime>
              <Box>
                <TeamFlag src={livescore.teamA_logo} />
                <TeamName>{livescore.teamA_name}</TeamName>
              </Box>
            </MatchRow>
          </MatchTableContainer>
        </MatchContainer>
      ) : (
        <MatchContainer>
          <Space />
          <LeagueBox>
            <LeagueHeader>
              <LeagueName><CountryFlag src={livescore.country_flag}/>{livescore.league_name}</LeagueName>
              <CountryName>{livescore.country}</CountryName>
            </LeagueHeader>
          </LeagueBox>
          <MatchTableContainer>
            <MatchRow
              key={livescore.fixture}
              onClick={() => this.setFixtureId(livescore.fixture)}
            >
              <Box>
                <TeamFlag src={livescore.teamH_logo} />
                <TeamName>{livescore.teamH_name}</TeamName>
              </Box>
              <ScoreAndTime>
                <Score>
                  {livescore.goalH} - {livescore.goalA}
                </Score>
                <Time>{livescore.time}"</Time>
              </ScoreAndTime>
              <Box>
                <TeamFlag src={livescore.teamA_logo} />
                <TeamName>{livescore.teamA_name}</TeamName>
              </Box>
            </MatchRow>
          </MatchTableContainer>
        </MatchContainer>
      )
    );
  }
}
export default LiveScore;
