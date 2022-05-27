import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ParsedUrlQuery } from "querystring";

async function getServerSideProps<Props, Params extends ParsedUrlQuery>(
  context: GetServerSidePropsContext<Params>
) {}
