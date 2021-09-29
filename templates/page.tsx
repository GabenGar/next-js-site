import Head from "next/head";

import { Section } from "#components/page";

import type { NextPage } from "next";

const TemplatePage: NextPage = () => {

  return (<Section heading="">
    <Head>
      <title></title>
      <meta name="description" content="" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
  </Section>);
};

export default TemplatePage;
