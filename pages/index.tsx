import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/my-questions');
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>My question list app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>لطفا چند لحظه صبر کنید</div>
    </div>
  )
}

export default Home
