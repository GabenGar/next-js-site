import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { Form } from "#components/forms";
import { clearAccounts } from "#database/queries/account/admin";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface TablesPageProps {}

function TablesPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Tables</title>
        <meta name="description" content="Tables" />
      </Head>
      <h1>Tables</h1>
      <h2>Accounts</h2>
      <Form submitButton="Clear" method="POST">
      </Form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<TablesPageProps> = async ({
  req,
}) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  if (req.method === "POST") {
    await clearAccounts()
  }

  return {
    props: {},
  };
};

export default TablesPage;
