import React from 'react'
import Table from '../Table'

function IndividualClicking({ teams, myTeam, loading, error, setTeamName, handleClick }) {

  function handleBtnClick(e) {
    e.preventDefault()
    handleClick()
  }

  return (
    <div className="clicking individual">
      <div className="quote">
        "It's really simple, you just need to click as fast as you can."
        <br/>
        <div className="author">- anonymous</div>
      </div>
      <div className="blue-container">
        <form action="" id="team-name-form">
          <div className="col-left">
            <label htmlFor="name">Enter your team name:</label>
            <input type="text" id="name" placeholder="Your mom"
                   value={myTeam.team} onChange={e => setTeamName(e.target.value)} />
          </div>
          <div className="col-right">
            <input type="submit" value="CLICK!" onClick={e => handleBtnClick(e)} />
          </div>
        </form>

        <div className="ribbon">
          <span className="content">TOP 10 Clickers</span>
        </div>

        <Table teams={teams}
               loading={loading}
               showExtraTeam={myTeam.team && myTeam}
               error={error} />

        <div className="footer claim">
          <p>Want to be top? STFU and click!</p>
        </div>
      </div>
    </div>
  )
}

export default IndividualClicking
