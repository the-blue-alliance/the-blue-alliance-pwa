import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { fetchEventListPage } from '../actions'

const useFetch = refetchOnLoad => {
  const [events, fetching] = useSelector(state => {
    return [state.getIn(['models', 'events', '2019', 'data']), state.getIn(['models', 'events', '2019', 'fetching'])]
  })
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
      <Link href='/'><a>Home</a></Link>
      {events.map(event => (
        <div key={event.get('key')}>
          <Link href={`/event?eventKey=${event.get('key')}`} as={`/event/${event.get('key')}`}>
            <a>{event.get('year')} {event.get('name')}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

Events.getInitialProps = async ({ reduxStore, req }) => {
  if (!reduxStore.getState().getIn(['models', 'events', '2019', 'data'])) {
    await reduxStore.dispatch(fetchEventListPage(2019))
    return { refetchOnLoad: false }
  }
  return { refetchOnLoad: true }
}

export default Events
