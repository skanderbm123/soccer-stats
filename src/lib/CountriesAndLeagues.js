export const assignCountryOptions = (countries) => {
  const parsedCountries = [];
  countries.forEach((country) => {
    parsedCountries.push({ label: country.country, value: country.country });
  });
  return parsedCountries;
};

export const assignLeagueOptions = (leagues) => {
  const parsedLeagues = [];
  leagues.forEach((league) => {
    parsedLeagues.push({ label: league.name, value: league.league_id });
  });
  return parsedLeagues;
};


export const assignLiveScore = (liveScores) => {
  const parsedLiveScore = [];
  liveScores.forEach((livescore) => {
    parsedLiveScore.push({ 
      fixture: livescore.fixture.id, 
      time: livescore.fixture.status.elapsed,
      league_id: livescore.league.id,
      league_name: livescore.league.name,
      league_flag: livescore.league.flag,
      teamH_name: livescore.teams.home.name,
      teamH_logo: livescore.teams.home.logo,
      teamH_winner: livescore.teams.home.winner,
      teamA_name: livescore.teams.away.name,
      teamA_logo: livescore.teams.away.logo,
      teamA_winner: livescore.teams.away.winner,
      goalH: livescore.goals.home,
      goalA: livescore.goals.away,
     });
  });
  return parsedLiveScore;
};