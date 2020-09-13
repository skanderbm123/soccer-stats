import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LeagueTable = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  max-width: 752px;
  background-color: #fff;
  height: inherit;
`;

const LeagueTableHeader = styled.div`
  grid-area: header;
  display: grid;
  font-weight: 700;
  grid-template-columns: 7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr;
  grid-template-areas:
    "club mp win loss draw gf ga gd pts last";
  padding: 5px;
  padding-top: 10px;
`;

const LeagueTableRow = styled(LeagueTableHeader)`
  border-top: 1px solid #f1f3f4;
  font-weight: normal;
`;

const Club = styled.div`
  grid-area: club;
  display: inline-block;
  height: 20px;
  padding-left: 10px;
`;

const MatchesPlayed = styled.div`
  grid-area: mp;
`;

const Wins = styled.div`
  grid-area: win;
`;

const Draws = styled.div`
  grid-area: draw;
`;

const Losses = styled.div`
  grid-area: loss;
`;

const GoalsFor = styled.div`
  grid-area: gf;
`;

const GoalsAgainst = styled.div`
  grid-area: ga;
`;

const GoalDifference = styled.div`
  grid-area: gd;
`;

const Points = styled.div`
  grid-area: pts;
`;

const LastFiveHeader = styled.div`
  grid-area: last;
`;

const LastFive = styled(LastFiveHeader)`
`;

const ClubRank = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: inline-block;
  width: 20px;
`;

const ClubLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: inline-block;
  padding-left: 10px;
`;

const ClubInfo = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: inline-block;
  padding-left: 10px;
`;

const ClubInfomation = ({ clubHighlight }) => (
  <LeagueTable>
    {clubHighlight.map((team) => (
      <LeagueTableRow key={team.team_id}>
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
    ))}
  </LeagueTable>
);

ClubInfomation.propTypes = {
  clubHighlight: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClubInfomation;
