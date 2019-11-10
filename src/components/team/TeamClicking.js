import React from 'react'
import Table from '../Table'

function TeamClicking({ myTeam, teams, handleClick, loading, error }) {

  function handleBtnClick(e) {
    e.preventDefault()
    handleClick()
  }

  function getSessionClicks() {
    let c
    try{
      c = JSON.parse(localStorage.getItem('yourClicks'))
    } catch(e) {
      return 0
    }
    return (c && c.team === myTeam.team) ? c.clicks : 0
  }

  function getTeamsAround() {
    if (teams.length < 1 || myTeam.team === '') return []
    const teamIndex = teams.findIndex(t => t.team === myTeam.team)
    if (teamIndex == null) return []

    let t = []
    let i = -3
    do {
      (teamIndex + i >= 0) && t.push(teams[teamIndex + i])
      i++
    }
    while (t.length < 7 && t.length < teams.length)
    return t
  }

  return (
    <div className="clicking team">
      <div className="header">
        <h2>Clicking for team <b>{myTeam.team}</b></h2>
        <i>
          Too lazy to click? Let your pals click for you:
          <span className="team-url">stfuandclick.com/{myTeam.team}</span>
        </i>
      </div>
      <div className="blue-container">
        <form action="" id="team-name-form" className="team-click" >
          <input type="submit" value="CLICK!" onClick={e => handleBtnClick(e)} />
          <div className="col-left">
            <i>Your clicks:</i>
            <b className="clicks">{ getSessionClicks() }</b>
          </div>
          <div className="col-right">
            <i>Team clicks:</i>
            <b className="clicks">{ myTeam.clicks }</b>
          </div>
        </form>

        <Table teams={getTeamsAround()}
               tableClass={"team"}
               loading={loading}
               error={error} />

        <div className="footer claim">
          <p>Want to be top? STFU and click!</p>
        </div>
      </div>
    </div>
  )
}

export default TeamClicking
