import React, { Component } from 'react'
import { matchPath } from "react-router";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
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

    const match = matchPath(this.props.location.pathname, {
      path: "/:teamName",
    })
    const teamName = match && match.params.teamName
    this.props.fetchTeams(true, teamName)
  }

  handleClick = () => {
    const team = this.props.myTeam.team
    const id = localStorage.getItem('sessionID')
    this.props.handleClick(team, id)
  }

  render() {
    return (
      <div className="app">
        <div className="stripe">STFUANDCLICK.COM</div>

        <Switch>
          <Route exact path='/'>
            <IndividualClicking
              teams={this.props.teams && this.props.teams.slice(0, 10)}
              myTeam={this.props.myTeam}
              loading={this.props.loading}
              error={this.props.error}
              setTeamName={this.props.setTeamName}
              handleClick={this.handleClick}
            />
          </Route>
          <Route path='/:teamName' render={(props) => {
            return <TeamClicking
                      myTeam={this.props.myTeam}
                      teams={this.props.teams}
                      handleClick={this.handleClick}
                      loading={this.props.loading}
                      error={this.props.error}
            />
          }
          }/>
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
