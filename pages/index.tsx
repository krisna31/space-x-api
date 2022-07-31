import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>ap
        <title>Space X API</title>
        <meta name="description" content="Root Project Of Space X" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome To Space X API by Krisna31</h1>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
