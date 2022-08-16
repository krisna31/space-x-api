import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { RocktetType } from '../../types';

const Rockets: NextPage<any> = (props) => {
  return (
    <>
      {
        props.error ? <h1 className="flex justify-center items-center text-2xl text-red-500 text-center">Please Tell Developer Error Has Happened With Messsage :  {props.err}</h1>
          :
          <div className='flex gap-6 flex-col justify-center items-center m-3 mt-0'>
            <h1 className='text-xl font-bold dark:bg-gradient-to-br dark:from-red-400 dark:to-red-700 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>List Of Rockets</h1>
            {props.rockets.map(
              (rocket: RocktetType, index: number) => {
                return (
                  <React.Fragment key={rocket.id}>
                    <div className='flex flex-col justify-center items-center gap-1 cursor-default w-3/4 lg:w-1/2 lg:px-8'>
                      <h1 className='max-w-fit text-xl mb-3'>{index + 1}. {rocket.name}</h1>
                      <div className='flex flex-wrap justify-center items-center gap-1'>
                        {
                          rocket.flickr_images.map(
                            (source: string, index: number) =>
                              index < 2 && <Image src={source} width={230} height={230} key={index} alt="rocket" loader={() => source} unoptimized className='rounded-lg shadow-md' priority></Image>
                          )
                        }
                      </div>
                      <p className='text-justify text-sm mb-3'>{rocket.description}</p>
                      <Link href={`/rockets/${rocket.id}`}>
                        <div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>More Details</div>
                      </Link>
                    </div>

                  </React.Fragment>
                )
              }
            )}
          </div>
      }
    </>

  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  let errorCatch = "Something Wrong Here"
  try {
    const options = { method: "GET" }
    const result = await fetch("https://api.spacexdata.com/v4/rockets", options)
    const rockets = await result.json()
    if (!rockets) return {
      props: {
        error: true,
        err: errorCatch
      }
    }
    return {
      props: {
        rockets,
        notFound: false,
      }
    }
  } catch (err) {
    if (err instanceof Error) errorCatch = err.message
    return {
      props: {
        error: true,
        err: errorCatch
      }
    }
  }
}
export default Rockets