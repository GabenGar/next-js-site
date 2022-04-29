import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getAccountDetails } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { withSessionSSR } from "#server/requests";
import { getInvites } from "#database/queries/account/admin";
import { Page } from "#components/pages";
import { Nav, NavList } from "#components/navigation";
import { CardList } from "#components/lists";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal } from "#components/links";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import type { IInvite } from "#codegen/schema/interfaces";

interface IInvitesPageProps extends BasePageProps {
  invites: IInvite[];
}

function InvitesPage({
  localeInfo,
  invites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: "Invites",
    description: "Invites overview",
  });

  return (
    <Page seoTags={seoTags}>
      <Nav>
        <NavList>
          <LinkInternal href="/account/admin/invites/create">
            Create
          </LinkInternal>
        </NavList>
      </Nav>
      <CardList>
        {invites.map((invite) => (
          <Card key={invite.code}>
            <CardHeader>
              <Heading level={2}>
                <code>{invite.code}</code>
              </Heading>
            </CardHeader>
            <CardBody>
              <DL>
                <DS>
                  <DT>Status</DT>
                  {/* @TODO styling */}
                  <DD>{invite.is_active ? "active" : "inactive"}</DD>
                </DS>
                <DS
                  dKey={"Created at"}
                  dValue={<DateTimeView dateTime={invite.created_at} />}
                />
                <DS
                  dKey={"Expires at"}
                  dValue={
                    invite.expires_at ? (
                      <DateTimeView dateTime={invite.expires_at} />
                    ) : (
                      "Never"
                    )
                  }
                />
                <DS
                  dKey={"Maximum uses"}
                  dValue={invite.max_uses ?? "Unlimited"}
                />
              </DL>
            </CardBody>
            <CardFooter style={{ textAlign: "center" }}>
              <Nav>
                {/* @TODO: endpoints */}
                <NavList>
                  <LinkInternal
                    href={{
                      pathname: "/account/admin/account/[account_id]",
                      query: {
                        account_id: invite.account_id,
                      },
                    }}
                  >
                    Creator details
                  </LinkInternal>
                  <LinkInternal
                    href={{
                      pathname: "/account/admin/invite/[invite_id]",
                      query: {
                        invite_id: invite.id,
                      },
                    }}
                  >
                    Invite details
                  </LinkInternal>
                </NavList>
              </Nav>
            </CardFooter>
          </Card>
        ))}
      </CardList>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<IInvitesPageProps>(
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (!account_id) {
      const redirectURL = createNextURL(localeInfo, "/auth/login").toString();

      return {
        redirect: {
          destination: redirectURL,
          permanent: false,
        },
      };
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      req.session.destroy();

      return {
        notFound: true,
      };
    }

    if (account.role !== "administrator") {
      return {
        notFound: true,
      };
    }

    const invites = await getInvites();

    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "admin",
    ]);

    return {
      props: {
        ...localization,
        localeInfo,
        invites,
      },
    };
  }
);

export default InvitesPage;
