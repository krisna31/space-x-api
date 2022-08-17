import type { NextPage } from 'next'
import Link from 'next/link'
import MyLi from '../components/MyLi'

const Home: NextPage = () => {
  return (
    <main className='flex items-center flex-col grow mt-2 transition-all'>
      <h1 className='font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 cursor-default to-slate-900 mb-8 text-lg drop-shadow-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>Welcome To Space X API by <a href='https://github.com/krisna31' target={"_blank"} rel={"noreferrer"}><span className='text-slate-600 dark:text-slate-400 hover:text-black'>Krisna31</span></a></h1>
      <ul className='flex flex-wrap flex-col transition-all items-center flex-1 justify-evenly'>
        <MyLi href={'/launches'} text={"1. Launches"} />
        <MyLi href={'/ships'} text={"2. Ships"} />
        <MyLi href={'/rockets'} text={"3. Rockets"} />
        <MyLi href={'/roadster'} text={"4. Roadster"} />
      </ul>
    </main>
  )
}

export default Home