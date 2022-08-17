import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MyBox from '../components/MyBox'

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <main className='fixed container bg-gradient-to-b from-sky-400 to-sky-200 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 h-full min-w-full'>
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <MyBox args={[1, 1, 1]} color="skyblue" speed={0} position={[2, 2, 0]} scale={1} />
        <MyBox args={[1, 2, 1]} color="blue" speed={0} position={[4, -1, 0]} scale={1} />
        <MyBox args={[2, 1, 1]} color="green" speed={0} position={[-2, -2, 0]} scale={1} />
        <MyBox args={[1, 1, 2]} color="brown" speed={0} position={[-4, 2, 0]} scale={1} />
        <OrbitControls autoRotate enableZoom={false} enablePan={false} />
      </Canvas>
    </main>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default MyApp
