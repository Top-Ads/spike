import React, { Fragment, FunctionComponent } from "react";
import styled from "styled-components";
import Divider from "../Divider";
import { device } from "../../../lib/utils/device";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Main>
        <Container>
          <List>
            <strong>{"slots"}</strong>
            <Link href={"/giochi"}>
              <a>{t("Giochi")}</a>
            </Link>
          </List>

          <List>
            <strong>{t("bonuses")}</strong>
            <Link href={"/offerte-bonus-casino"}>
              <a>{t("Offerte Bonus Casino")}</a>
            </Link>
          </List>

          <List>
            <strong>{t("casino")}</strong>
            <a>{t("Nuovi Casinò Online")}</a>
            <a>{t("Casinò in Italia")}</a>
            <Link href={"/blog"}>
              <a>{t("Blog")}</a>
            </Link>
          </List>

          <List>
            <strong>{"rete sociale"}</strong>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/eXxhPXWHmY"
            >
              Discord
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/casinosquad"
            >
              Facebook
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/casino.squad.team/"
            >
              Instagram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/casino_squad"
            >
              Telegram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/@squadita6767"
            >
              YouTube
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://kick.com/casinosquad_ita"
            >
              Kick
            </a>
          </List>

          <List>
            <strong>{"informazioni"}</strong>
            <Link href={"/squad"}>
              <a>{t("Team")}</a>
            </Link>
            <Link href={"/shop"}>
              <a>{t("Shop")}</a>
            </Link>
            <Link href={"/privacy-policy"}>
              <a>{t("Informativa sulla privacy")}</a>
            </Link>
            <Link href={"/sitemap"}>
              <a>{t("Sitemap")}</a>
            </Link>

            <a href="mailto: info@casinosquad.com">{t("Email")}</a>
          </List>
        </Container>

        <Divider color="#f2f2f2" />
      </Main>
    </Fragment>
  );
};

const Main = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 33px;
  padding: 5px;

  @media ${device.tablet} {
    margin-bottom: 44px;
  }

  strong {
    font-weight: bold;
    font-size: 17px;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 7px;

    @media ${device.mobileL} {
      margin-bottom: 7px;
      margin-top: 7px;
    }
  }

  a {
    font-size: 14px;
    padding: 4px;
    text-align: left;
    color: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 20px;

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

const List = styled.div`
  display: inherit;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media ${device.tablet} {
    margin-right: 10px;
  }

  @media ${device.mobileL} {
    width: 50%;
    flex-grow: 1;
    margin-right: 0px;
  }
`;

export default Footer;
