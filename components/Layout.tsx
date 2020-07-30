import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  useTranslation,
  Box,
  ResponsiveLayout,
  InvestingClubLatam,
  HeaderLink,
  NavLink,
  FooterLink,
  Whatsapp,
  Instagram,
  Facebook,
  Messenger,
  Email,
} from "@cabezonidas/shop-ui";
import { useGetPinnedPublicPathsQuery } from "../graphql-queries";
import { usePostMapping } from "../utils/helpers";
import { companyName } from "../utils/config";

type Props = {
  title?: string | null;
  onMainScrollBottom?: () => void;
};

const enUsRoutes = {
  routes: {
    home: "Home",
    about: "Us",
    pinned: "Investements",
  },
  footer: "I'm here to stay!",
};
const esArRoutes = {
  routes: {
    home: "Inicio",
    about: "Nosotros",
    pinned: "Inversiones",
  },
  footer: "Estoy para quedarme!",
};

const Layout: React.FunctionComponent<Props> = (props) => {
  const { title, children, onMainScrollBottom } = props;
  const { t, i18n } = useTranslation();
  const { getPostTitle } = usePostMapping();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { layout: enUsRoutes },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { layout: esArRoutes },
    true,
    true
  );
  const { data } = useGetPinnedPublicPathsQuery();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content={companyName} />
      </Head>
      <ResponsiveLayout
        header={
          <Box display="grid" gridTemplateColumns="1fr auto">
            <Link href="/" passHref={true}>
              <InvestingClubLatam style={{ cursor: "pointer" }} />
            </Link>
            <Box alignSelf="center">
              <Link href="/pinned" passHref={true}>
                <HeaderLink>{t("layout.routes.pinned")}</HeaderLink>
              </Link>
              <Link href="/about" passHref={true}>
                <HeaderLink>{t("layout.routes.about")}</HeaderLink>
              </Link>
            </Box>
          </Box>
        }
        nav={
          <>
            <Link href="/" passHref={true}>
              <NavLink>{t("layout.routes.home")}</NavLink>
            </Link>
            <Link href={"/about"} passHref={true}>
              <NavLink>{t("layout.routes.about")}</NavLink>
            </Link>
            {data?.getPinnedPublicPaths.map((i) => {
              return (
                <Link
                  key={i._id}
                  href={"/pinned/[id]"}
                  as={`/pinned/${i._id}`}
                  passHref={true}
                >
                  <NavLink>{getPostTitle(i.titles)}</NavLink>
                </Link>
              );
            })}
          </>
        }
        footer={
          <Box display="flex" justifyContent="space-between">
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 50px)"
              width="max-width"
              ml="auto"
            >
              <FooterLink href="mailto:latamtradingclub@gmail.com">
                <Email />
              </FooterLink>
              <FooterLink href="https://api.whatsapp.com/send?phone=+5491151398747">
                <Whatsapp />
              </FooterLink>
              <FooterLink href="https://www.instagram.com/tradingclublatam">
                <Instagram />
              </FooterLink>
              <FooterLink href="https://www.facebook.com/latamtradingclub">
                <Facebook />
              </FooterLink>
              <FooterLink href="https://www.messenger.com/t/latamtradingclub">
                <Messenger />
              </FooterLink>
            </Box>
          </Box>
        }
        onMainScrollBottom={onMainScrollBottom}
      >
        <Box maxWidth="600px" mx="auto" px="2" pt="4">
          {children}
        </Box>
      </ResponsiveLayout>
    </>
  );
};

export default Layout;
