import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { fetchEventPage } from '../actions'
import { getEventStatus, getEvent } from '../selectors/EventSelectors'

const useFetch = (eventKey, refetchOnLoad) => {
  const status = useSelector(state => getEventStatus(state, eventKey))
  const events = useSelector(state => getEvent(state, eventKey))
  const dispatch = useDispatch()
  useEffect(() => {
    if (refetchOnLoad) {
      dispatch(fetchEventPage(eventKey))
    }
  }, [])
  return [events, status, () => dispatch(fetchEventPage(eventKey))]
}

const Events = ({ eventKey, refetchOnLoad }) => {
  const [event, status, refetch] = useFetch(eventKey, refetchOnLoad)
  return (
    <div>
      <h1>{event.name}</h1>
      <button onClick={refetch}>Refetch</button>
      <div>{status}</div>
      <Link href="/"><a>Home</a></Link>
    </div>
  )
}

Events.getInitialProps = async ({ reduxStore, query }) => {
  const eventKey = query.eventKey
  if (getEventStatus(reduxStore.getState(), eventKey) !== 'success') {
    await reduxStore.dispatch(fetchEventPage(eventKey))
    return { eventKey, refetchOnLoad: false }
  }
  return { eventKey, refetchOnLoad: true }
}

Events.propTypes = {
  eventKey: PropTypes.string,
  refetchOnLoad: PropTypes.bool,
}

export default Events
