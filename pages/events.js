import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import Link from 'next/link'
import { fetchEventListPage } from '../actions'

const getEventsByKey = state => state.getIn(['models', 'events', 'byKey'])

const getYearEventKeys = (state, year) => state.getIn(['models', 'events', 'collections', 'byYear', year])

const getYearEvents = createSelector(
  getEventsByKey,
  getYearEventKeys,
  (eventsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => eventsByKey.get(key))
    }
  }
)

const useFetch = (refetchOnLoad) => {
  const [events, fetching] = useSelector(state => [getYearEvents(state, 2019), state.getIn(['models', 'events', 2019, 'fetching'])])
  const dispatch = useDispatch()
  useEffect(() => {
    if (refetchOnLoad) {
      dispatch(fetchEventListPage(2019))
    }
  }, [])
  return [events, fetching, () => dispatch(fetchEventListPage(2019))]
}

const Events = ({ refetchOnLoad }) => {
  const [events, fetching, refetch] = useFetch(refetchOnLoad)
  return (
    <div>
      <h1>Events</h1>
      <button onClick={refetch}>Refetch</button>
      {fetching ? <div>Fetching...</div> : <div>Done!</div>}
      <Link href="/"><a>Home</a></Link>
      {events.map(event => (
        <div key={event.key}>
          <Link href={`/event?eventKey=${event.key}`} as={`/event/${event.key}`}>
            <a>
              {event.year}
              {' '}
              {event.safeShortName()}
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

Events.getInitialProps = async ({ reduxStore }) => {
  if (!reduxStore.getState().getIn(['models', 'events', 2019, 'data'])) {
    await reduxStore.dispatch(fetchEventListPage(2019))
    return { refetchOnLoad: false }
  }
  return { refetchOnLoad: true }
}

Events.propTypes = {
  refetchOnLoad: PropTypes.bool,
}

export default Events
