import axios from "axios"

const API_URL_TEAMS = "https://klikuj.herokuapp.com/api/v1/leaderboard"
const API_URL_CLICK = "https://klikuj.herokuapp.com/api/v1/klik"

export const fetchTeams = (loading = true, teamName = undefined) => dispatch => {
  dispatch({
    type: 'FETCH_TEAMS_PENDING',
    loading: loading
  })
  axios.get(API_URL_TEAMS).then(res => {
    dispatch({
      type: 'FETCH_TEAMS_FULFILLED',
      payload: res,
      teamName: teamName
    })
  }).catch(err => {
    dispatch({
      type: 'FETCH_TEAMS_REJECTED',
      payload: err
    })
  })
}

export const setTeamName = (teamName) => dispatch => {
  dispatch({
    type: 'SET_TEAM_NAME',
    teamName
  })
}

export const handleClick = (teamName, sessionID) => dispatch => {
  const params = {
    "team": teamName,
    "session": sessionID
  }
  axios.post(API_URL_CLICK, params).then(res => {
    localStorage.setItem('yourClicks', JSON.stringify({ clicks: res.data.your_clicks, team: teamName }))
    dispatch(fetchTeams(false, teamName))
  }).catch(err => {
    dispatch({
      type: 'CLICK_REJECTED',
      payload: err
    })
  })
}