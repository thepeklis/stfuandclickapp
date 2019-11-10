import React, { Component } from 'react'
import { matchPath } from "react-router";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import '../assets/styles/app.scss'
import IndividualClicking from "./individual/IndividualClicking"
import TeamClicking from "./team/TeamClicking"
import { connect } from 'react-redux'
import { fetchTeams, setTeamName, handleClick } from "../actions/teamActions"

class App extends Component {
  componentDidMount() {
    if (!localStorage.getItem('sessionID')) {
      localStorage.setItem('sessionID', String(Date.now()))
    }
    this.props.fetchTeams(true, this.getTeamNameFromRoute())
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getTeamNameFromRoute()
    }
  }

  getTeamNameFromRoute = () => {
    const match = matchPath(this.props.location.pathname, {
      path: "/:teamName",
    })

    if (match && match.params.teamName) {
      const t = decodeURIComponent(match.params.teamName)
      if (t !== this.props.myTeam.team) {
        this.props.setTeamName(t)
      }
      return t
    } else {
      return undefined
    }
  }

  handleClick = () => {
    const team = this.props.myTeam.team
    const id = localStorage.getItem('sessionID')
    this.props.handleClick(team, id)
  }

  render() {

    const { teams, myTeam, loading, error, setTeamName } = this.props

    console.log("props: ", this.props)

    return (
      <div className="app">
        <div className="stripe">
          <Link to='/'>STFUANDCLICK.COM</Link>
        </div>

        <Switch>
          <Route exact path='/'>
            <IndividualClicking
              teams={teams && teams.slice(0, 10)}
              myTeam={myTeam}
              loading={loading}
              error={error}
              setTeamName={setTeamName}
              handleClick={this.handleClick}
            />
          </Route>
          <Route path='/:teamName'>
            <TeamClicking
              myTeam={myTeam}
              teams={teams}
              handleClick={this.handleClick}
              loading={loading}
              error={error}
            />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>

        <footer>
          <p>If you don't like this page, it's <a href="https://www.applifting.cz/">Applifting</a>'s fault.</p>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    myTeam: state.myTeam,
    loading: state.loading,
    error: state.error
  }
}
export default connect(mapStateToProps, { fetchTeams, setTeamName, handleClick })(withRouter(App))
