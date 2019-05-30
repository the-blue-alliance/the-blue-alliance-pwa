import React from 'react'
import Link from 'next/link'

const Events = () => (
  <div>
    <h1>Events</h1>
    <Link href='/'><a>Home</a></Link>
    {/*<Query query={EVENT_LIST_QUERY} variables={{ year: 2019 }} fetchPolicy='cache-and-network'>
      {({data, loading, error}) => {
        if (error) {
          console.log(error)
          return <div>Error</div>
        }
        if (!data.events) {
          return <div>Loading</div>
        } else {
          return data.events.map(event => (
            <div key={event.key}>
              <Link href={`/event?eventKey=${event.key}`} as={`/event/${event.key}`}>
                <a>{event.year} {event.name}</a>
              </Link>
            </div>
          ))
        }
      }}
    </Query>*/}
  </div>
)

export default Events
