import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { fetchEventPage } from '../actions'
import { getEventStatus, getEvent } from '../selectors/EventSelectors'
import { getEventMatchesStatus, getEventMatches } from '../selectors/MatchSelectors'

const useFetch = (eventKey, refetchOnLoad) => {
  const status = useSelector(state => getEventStatus(state, eventKey))
  const events = useSelector(state => getEvent(state, eventKey))
  const matches = useSelector(state => getEventMatches(state, eventKey))
  const dispatch = useDispatch()
  useEffect(() => {
    if (refetchOnLoad) {
      dispatch(fetchEventPage(eventKey))
    }
  }, [])
  return [events, matches, status, () => dispatch(fetchEventPage(eventKey))]
}

const openMatchModal = (e, eventKey, matchKey) => {
  e.preventDefault()
  Router.push(`/event?eventKey=${eventKey}&matchKey=${matchKey}`, `/match/${matchKey}`, { shallow: true })
}

const closeMatchModal = (eventKey) => {
  Router.push(`/event?eventKey=${eventKey}`, `/event/${eventKey}`, { shallow: true })
}

const Events = ({ router, eventKey, refetchOnLoad }) => {
  const [event, matches, status, refetch] = useFetch(eventKey, refetchOnLoad)
  return (
    <div>
      <h1>{event.name}</h1>
      <button onClick={refetch}>Refetch</button>
      <div>{status}</div>
      <div onClick={() => closeMatchModal(eventKey)}>{router.query.matchKey}</div>
      <Link href="/"><a>Home</a></Link>
      {matches.map(match => (
        <div key={match.key}>
          <a
            href={`/match/${match.key}`}
            onClick={(e) => openMatchModal(e, eventKey, match.key)}
          >
            {match.getDisplayName()}
          </a>
        </div>
      ))}
    </div>
  )
}

Events.getInitialProps = async ({ reduxStore, query }) => {
  const eventKey = query.eventKey
  const state = reduxStore.getState()
  if (getEventStatus(state, eventKey) !== 'success' || getEventMatchesStatus(state, eventKey) !== 'success') {
    await reduxStore.dispatch(fetchEventPage(eventKey))
    return { eventKey, refetchOnLoad: false }
  }
  return { eventKey, refetchOnLoad: true }
}

Events.propTypes = {
  router: PropTypes.object,
  eventKey: PropTypes.string,
  refetchOnLoad: PropTypes.bool,
}

export default withRouter(Events)
