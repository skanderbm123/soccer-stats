import React from "react";
import styled from "styled-components";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { assignFixture } from "../lib/CountriesAndLeagues";
import { getTeamFixtures } from "../lib/DatabaseRequests";

const FixturesTable = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  max-height: 325px;
  min-height: 325px;
  overflow-x: hidden;
  width: 100%;

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

const FixturesTableHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #b2b2b2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-weight: 700;
  grid-area: header;
  padding: 5px;
  padding-top: 10px;
`;

const FixtureContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f1f3f4;
  display: grid;
  grid-template-areas: "teamOne date teamTwo";
  justify-content: space-around;
  min-height: 150px;
  padding: 5px;
  width: 50%;

  &:hover {
    background-color: #00d4b1;
  }
`;

const TeamOne = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-size: 14px;
  font-weight: 500;
  grid-area: teamOne;
  line-height: 1.2rem;
  max-width: 100px;
  text-align: center;
`;

const TeamTwo = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-flow: column;
  font-size: 14px;
  font-weight: 500;
  grid-area: teamTwo;
  line-height: 1.2rem;
  max-width: 100px;
  text-align: center;
`;

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

const Club = styled.div`
  display: inline-block;
  grid-area: club;
  height: 20px;
  padding-left: 10px;
`;

const parseDate = (date) => new Date(date).toDateString();
const parseTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
const currentTime = new Date().toISOString();

class TeamFixturesUpcoming extends React.Component {
  constructor() {
    super();
    this.state = {
      fixtureMap: new Map(),
      fixtureKeys: [],
    };
    this.setFixtureId = this.setFixtureId.bind(this);
    this.fixtureBeforeCurrentDate = this.fixtureBeforeCurrentDate.bind(this);
    this.renderMatch = this.renderMatch.bind(this);
    this.newData = this.newData.bind(this);
  }

  componentDidMount(prevProps, prevState) {
    let myKeys = [];
    if (this.newData(prevProps, prevState)) {
      console.log("FROM update ");
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let myKeys = [];
    if (this.newData(prevProps, prevState)) {
      console.log("FROM update ");
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
    }
  }
  setFixtureId(fixtureId) {
    this.props.setFixtureId(fixtureId);
    this.props.setTabIndex(3);
  }

  fixtureBeforeCurrentDate(date) {
    if (currentTime < date) {
      return true;
    }
    return false;
  }

  renderMatch(fixture) {
    for (const [key, fixture] of Object.entries(fixture)) {
      return this.fixtureBeforeCurrentDate(fixture.fixture.date) ? (
        <FixtureContainer>
          <TeamOne>
            <img
              src={fixture.teams.home.logo}
              alt={fixture.teams.home.name}
              width="60"
            />
            {fixture.teams.home.name}
          </TeamOne>
          <GameInfoContainer>
            <GameInfo>{parseTime(fixture.fixture.date)}</GameInfo>
            <GameInfo>{parseDate(fixture.fixture.date)}</GameInfo>
            <GameInfo>{fixture.league.name}</GameInfo>
          </GameInfoContainer>
          <TeamTwo>
            <img
              src={fixture.teams.away.logo}
              alt={fixture.teams.away.logo}
              width="60"
            />
            {fixture.teams.away.name}
          </TeamTwo>
        </FixtureContainer>
      ) : null;
    }
  }

  newData(prevProps, prevState) {
    if (prevProps == undefined) {
      return true;
    } else {
      if (prevProps.teamId != this.props.teamId) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <section>
        {this.state.fixtureKeys ? (
          <FixturesTableHeader>
            <Club>Fixtures Upcoming</Club>
          </FixturesTableHeader>
        ) : null}

        <Tabs>
          <TabList>
            {this.state.fixtureKeys.map((item) => (
              <Tab>{item}</Tab>
            ))}
          </TabList>

          {this.state.fixtureKeys.map((key) => (
            <TabPanel>
              <FixturesTable>
                {this.state.fixtureMap.has(key)
                  ? this.state.fixtureMap
                      .get(key)
                      .map((fixture) => this.renderMatch(fixture))
                  : null}
              </FixturesTable>
            </TabPanel>
          ))}
        </Tabs>
      </section>
    );
  }
}
export default TeamFixturesUpcoming;
