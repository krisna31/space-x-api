import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ships: NextPage<any> = (props) => {
  console.log(props);

  return (
    <>
      {
        props.error ? <h1 className="flex justify-center items-center text-2xl text-red-500 text-center">Please Tell Developer Error Has Happened With Messsage :  {props.err}</h1>
          :
          <div className='flex gap-6 flex-col justify-center items-center m-3 mt-0'>
            <h1 className='text-xl font-bold dark:bg-gradient-to-br dark:from-red-400 dark:to-red-700 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>List Of ships</h1>
            {props.ships.map(
              (ship: any, index: number) => {
                return (
                  <React.Fragment key={ship.id}>
                    <div className='flex flex-col justify-center items-center gap-1 cursor-default w-3/4 lg:w-1/2 lg:px-8'>
                      <h1 className='max-w-fit text-xl mb-3'>{index + 1}. {ship.name}</h1>
                      <div className='flex flex-wrap justify-center items-center gap-1'>
                        {ship.image && <Image src={ship.image} width={230} height={230} alt="ship" loader={() => ship.image} unoptimized />}
                      </div>
                      <p className='text-justify text-sm mb-3'>Home Port : {ship.home_port}</p>
                      <p className='text-justify text-sm mb-3'>{ship.active ? "Active" : "Not Active"}</p>
                      <p className='text-justify text-sm mb-3'>Mass : {ship.mass_kg} kg / {ship.mass_lbs} lbs</p>
                      <p className='text-justify text-sm mb-3'>Roles : {ship.roles.join(", ")}</p>
                      <p className='text-justify text-sm mb-3'>Type : {ship.type}</p>
                      <Link href={`/ships/${ship.id}`}>
                        <div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>More Details</div>
                      </Link>
                    </div>
                  </React.Fragment>
                )
              })}
          </div>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let errorCatch = "Something Wrong Here"
  try {
    const options = { method: "GET" }
    const result = await fetch("https://api.spacexdata.com/v4/ships", options)
    const ships = await result.json()
    if (!ships) return {
      props: {
        error: true,
        err: errorCatch
      }
    }
    return {
      props: {
        ships,
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

export default ships