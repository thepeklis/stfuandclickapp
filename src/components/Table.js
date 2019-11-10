import React from 'react'
import { Link } from 'react-router-dom'

function Table({ teams, loading, error, showExtraTeam, tableClass, highlightTeam }) {

  const listOfTeams = teams && teams.length > 1 && teams
    .sort((a, b) => a.order < b.order)
    .map((t, i) => (
      <tr key={i} className={ highlightTeam === t.team ? 'my-team' : "" }>
        <td>{t.order}</td>
        <td>
          { highlightTeam === t.team ? t.team : <Link to={`/${encodeURIComponent(t.team)}`}>{t.team}</Link> }
        </td>
        <td>{t.clicks}</td>
      </tr>
    ))

  const showText = <>
    { [...Array((teams && teams.length > 1) ? teams.length : 10)].map((e, i) =>
      <tr key={i}>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    ) }
    <tr className="message">
      { error ?
        <td align="center" colSpan="3" className="error">Error: couldn't fetch data</td> :
        <td align="center" colSpan="3">Loading...</td>
      }
    </tr>
  </>

  return (
    <table className={"results " + tableClass}>
      <thead>
        <tr>
          <th></th>
          <th>TEAM</th>
          <th>CLICKS</th>
        </tr>
      </thead>
      <tbody>
        { (loading || error) ? showText : listOfTeams }

        {showExtraTeam && <tr style={{background: 'transparent', borderTop: '1px dashed #aaa', color: 'rgba(0,0,0,0.2)'}}>
          <td>{ showExtraTeam.order }</td>
          <td><Link to={`/${encodeURIComponent(showExtraTeam.team)}`}>{showExtraTeam.team}</Link></td>
          <td>{ showExtraTeam.clicks }</td>
        </tr>}
      </tbody>
    </table>
  )
}

export default Table
