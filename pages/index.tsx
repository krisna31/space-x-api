import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main className='flex items-center flex-col grow mt-2 transition-all'>
      <h1 className='font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 cursor-default to-slate-900 mb-8 text-lg drop-shadow-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>Welcome To Space X API by Krisna31</h1>
      <ul className='flex flex-wrap flex-col transition-all items-center flex-1 justify-evenly'>
        <li className='cursor-pointer bg-transparent backdrop-blur-xl my-3 text-3xl hover:text-4xl md:text-4xl md:hover:text-5xl lg:text-5xl lg:hover:text-6xl font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>
          <Link href="/rockets">
            1. Rockets
          </Link >
        </li>
        <li className='cursor-pointer bg-transparent backdrop-blur-xl my-3 text-3xl hover:text-4xl md:text-4xl md:hover:text-5xl lg:text-5xl lg:hover:text-6xl font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>
          <Link href="/ships">
            2. Ships
          </Link >
        </li>
        <li className='cursor-pointer bg-transparent backdrop-blur-xl my-3 text-3xl hover:text-4xl md:text-4xl md:hover:text-5xl lg:text-5xl lg:hover:text-6xl font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>
          <Link href="/roadster">
            3. Roadster
          </Link >
        </li>
        <li className='cursor-pointer bg-transparent backdrop-blur-xl my-3 text-3xl hover:text-4xl md:text-4xl md:hover:text-5xl lg:text-5xl lg:hover:text-6xl font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>
          <Link href="/launches">
            4. Launches
          </Link >
        </li>
      </ul>
    </main>
  )
}

export default Home