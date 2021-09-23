import Head from 'next/head';
// import Image from 'next/image';

import { ComponentOne, ComponentThree, ComponentTwo } from "#components";
import { Section } from '#components/page';
import styles from '#styles/Home.module.scss';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  
  return (<Section  >
    <Head>
      <title>test</title>
      <meta name="description" content="test" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className={styles.title}>Next.JS site</h1>
    <ComponentOne />
    <ComponentTwo />
    <ComponentThree />
  </Section>);
};

export default Home;
