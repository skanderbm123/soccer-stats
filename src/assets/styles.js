/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components';
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
`;

export const TeamPlayersContainer = styled.div`
  max-height: 300px;
  width: 100%;
`;

export const TeamPlayersTabelContainer = styled.div`
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

export const TeamPlayersTabelHeader = styled.div`
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

export const TeamPlayersTabelRow = styled.div`
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

export const PlayerName = styled.div`
  display: inline-block;
  grid-area: name;
  height: 20px;
  padding-left: 10px;
`;

export const PlayerPosition = styled.div`
  grid-area: position;
  text-align: center;
`;

export const PlayerNationality = styled.div`
  grid-area: nationality;
  text-align: center;
`;

export const PlayerAge = styled.div`
  grid-area: age;
  text-align: center;
`;

export const PlayerHeight = styled.div`
  grid-area: height;
  text-align: center;
`;

export const PlayerWeight = styled.div`
  grid-area: weight;
  text-align: center;
`;

export const PlayerFirstName = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
`;

export const PlayerLastName = styled.div`
  display: inline-block;
  margin: auto;
  max-height: 100%;
  padding-left: 10px;
`;

