import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Rockets: NextPage<any> = (props) => {
  return (
    <div className='flex gap-3 flex-col'>
      {props.rockets.map(
        rocket => {
          return (
            <React.Fragment key={rocket.id}>
              <div>
                <Link href={`/rockets/${rocket.id}`}>{rocket.name}</Link>
                <p>{rocket.description}</p>
                {
                  rocket.flickr_images.map(
                    (source, index) => <Image src={source} width={222} height={222} key={index} alt="rocket" loader={() => source}></Image>
                  )
                }
              </div>
            </React.Fragment>
          )
        }
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const options = { method: "GET" }
  const result = await fetch("https://api.spacexdata.com/v4/rockets", options)
  const rockets = await result.json()
  return {
    props: {
      rockets
    }
  }
}

export default Rockets