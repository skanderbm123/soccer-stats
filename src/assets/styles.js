/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
  * {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      color: #221924;
      box-sizing: border-box;
  }
  h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 25px;
      font-weight: 900;
      line-height: 1.25;
  }
  body {
      display: block;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
  }
  html {
      scroll-behavior: smooth;
  }
`;

export const MainBody = styled.div`
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
  border: 1px solid #ccc !important;
`;

export const ClubInformationSection = styled.div`
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
  border: 1px solid #ccc !important;
`;

export const MatchContainer = styled.div`
  max-height: 300px;
  width: 100%;
  
`;

export const Space = styled.div`
  padding-bottom: 1em;
`;

export const MatchTableContainer = styled.div`
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
  border: 1px solid #ccc !important;
`;

export const MatchRow = styled.div`
  background-color: #fff;
  border-top: 1px solid #f1f3f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 11px;
  position: relative;
  font-weight: 400;
  padding: 5px;

  &:hover {
    background-color: #00d4b1;
  }
  overflow-y: hidden;
`;

export const Box = styled.div`
  flex-direction: column;
  text-align: center;
  flex: 1 1;
`;

export const TeamName = styled.div`
  color: #000000;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 38px;
  flex: 1 1;
  max-width: 120px;
`;

export const TeamFlag = styled.img`
  inset: auto;
  box-sizing: border-box;
  padding: 0px;
  border: medium none;
  margin: auto;
  display: flex;
  width: 15%;
  height: 15%;
`;

export const ScoreAndTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Score = styled.div`
  color: #000000;
  font-size: 22px;
  font-weight: 700;
  line-height: 18px;
  min-height: 18px;
  min-width: 56px;
  text-align: center;
`;

export const Time = styled.div`
  padding-top: 2px;
  height: 20px;
  text-transform: capitalize;
`;

export const LeagueBox = styled.div`
  background-color: #fff;
  display: flex;
  font-size: 14px;
  padding: 10px 15px;
  min-width: 0;
  border: 1px solid #ccc !important;
`;

export const LeagueHeader = styled.div`
  flex: 1 1;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LeagueName = styled.div`
  font-weight: 700;
  margin-bottom: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CountryName = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  padding-left: 10px;
`;

export const CountryFlag = styled.img`
  border-radius: 2px;
  width: 2%;
  height: 2%;
  padding-right: 10px;
`;
