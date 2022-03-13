import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FootballTableContainer = styled.div`
  width: 100%;
`;

const LeagueTable = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-flow: column;
  max-height: 300px;
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

const LeagueTableHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b2b2b2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: grid;
  font-weight: 700;
  grid-template-areas: "club mp win loss draw gf ga gd pts last";
  grid-template-columns: 7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
  padding: 5px;
  padding-top: 10px;
  min-width: 100%;
`;

const LeagueTableRow = styled.div`
  background-color: #fff;
  border-top: 1px solid #f1f3f4;
  cursor: pointer;
  display: grid;
  font-weight: 400;
  grid-template-areas: "club mp win loss draw gf ga gd pts last";
  grid-template-columns: 7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
  padding: 5px;

  &:hover {
    background-color: #00d4b1;
  }
`;

const Club = styled.div`
  display: inline-block;
  grid-area: club;
  height: 20px;
  padding-left: 10px;
`;

const MatchesPlayed = styled.div`
  grid-area: mp;
  text-align: center;
`;

const Wins = styled.div`
  grid-area: win;
  text-align: center;
`;

const Draws = styled.div`
  grid-area: draw;
  text-align: center;
`;

const Losses = styled.div`
  grid-area: loss;
  text-align: center;
`;

const GoalsFor = styled.div`
  grid-area: gf;
  text-align: center;
`;

const GoalsAgainst = styled.div`
  grid-area: ga;
  text-align: center;
`;

const GoalDifference = styled.div`
  grid-area: gd;
  text-align: center;
`;

const Points = styled.div`
  grid-area: pts;
  text-align: center;
`;

const LastFiveHeader = styled.div`
  grid-area: last;
  text-align: center;
`;

const LastFive = styled(LastFiveHeader)`
  letter-spacing: 0.2em;
`;

const ClubRank = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  width: 20px;
`;

const ClubLogo = styled.img`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  padding-left: 10px;
`;

const ClubInfo = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  padding-left: 10px;
`;
class LeagueStandings extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.setTeamId = this.setTeamId.bind(this);
    this.addClubToList = this.addClubToList.bind(this);
  }
  setTeamId() {}

  addClubToList(teamId) {
    this.props.addClubToList(teamId);
  }

  render() {
    return (
      <FootballTableContainer>
        <LeagueTableHeader>
          <Club>Club</Club>
          <MatchesPlayed>MP</MatchesPlayed>
          <Wins>W</Wins>
          <Draws>D</Draws>
          <Losses>L</Losses>
          <GoalsFor>GF</GoalsFor>
          <GoalsAgainst>GA</GoalsAgainst>
          <GoalDifference>GD</GoalDifference>
          <Points>Pts</Points>
          <LastFiveHeader>Last 5</LastFiveHeader>
        </LeagueTableHeader>
        <LeagueTable>
          {this.props.standings.map((group) =>
            group.map((team) => (
              <LeagueTableRow
                key={team.team_id}
                onClick={() => this.addClubToList(team.team_id)}
              >
                <Club>
                  <ClubRank>{team.rank}</ClubRank>
                  <ClubLogo src={team.logo} alt={team.teamName} />
                  <ClubInfo>{team.teamName}</ClubInfo>
                </Club>
                <MatchesPlayed>{team.all.matchsPlayed}</MatchesPlayed>
                <Wins>{team.all.win}</Wins>
                <Draws>{team.all.draw}</Draws>
                <Losses>{team.all.lose}</Losses>
                <GoalsFor>{team.all.goalsFor}</GoalsFor>
                <GoalsAgainst>{team.all.goalsAgainst}</GoalsAgainst>
                <GoalDifference>{team.goalsDiff}</GoalDifference>
                <Points>{team.points}</Points>
                <LastFive>{team.forme}</LastFive>
              </LeagueTableRow>
            ))
          )}
        </LeagueTable>
      </FootballTableContainer>
    );
  }
}

export default LeagueStandings;
