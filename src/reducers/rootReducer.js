const teamInit = {
  team: '',
  clicks: 0
}
const initState = {
  teams: [],
  myTeam: teamInit,
  loading: false,
  error: null
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TEAMS_PENDING': {
      return {...state, loading: action.loading }
    }
    case 'FETCH_TEAMS_FULFILLED': {
      let newTeams = action.payload.data
      const currentTeam = action.teamName && newTeams.find(t => t.team === action.teamName)

      return {
        ...state,
        teams: newTeams,
        myTeam: !!currentTeam ? currentTeam : state.myTeam,
        loading: false,
        error: null
      }
    }
    case 'FETCH_TEAMS_REJECTED': {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case 'SET_TEAM_NAME': {
      if (state.teams.length < 1) return { ...state, myTeam: teamInit }
      let myTeam = {
        team: action.teamName,
        clicks: 0,
        order: state.teams[state.teams.length - 1].order + 1
      }
      const existingTeam = state.teams.find(t => t.team === action.teamName)
      if (existingTeam) {
        myTeam.clicks = existingTeam.clicks
        myTeam.order = existingTeam.order
      }

      return {
        ...state,
        myTeam
      }
    }

    case 'CLICK_REJECTED': {
      return {
        ...state,
        error: action.payload
      }
    }

    default:
      return state;
  }
}

export default rootReducer