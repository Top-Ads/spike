import Head from "next/head";
import React, { FunctionComponent } from "react";
import { Fragment } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Divider from "../../components/Commons/Divider";
import Link from "next/link";

type Props = {
  data: any;
};

const LiveStats: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Layout title="Casino Squad | Live Stats">
        <Head>
          <meta
            property="og:description"
            content="Gira la ruota di Crazy Time in real time i risultati recenti più vincenti"
            key="description"
          />
        </Head>

        <div className="layout-container">
          <Link passHref href={`/live-stats/crazy-time`}>
            <Header className="intro-header">
              <h2>
                {t(
                  "Statistiche Crazy Time Live: Tutte le Estrazioni in Tempo Reale",
                )}
              </h2>

              <Intro>
                <p>
                  {t(
                    "Benvenuto sulla pagina dedicata alle Statistiche Live di Crazy Time. ",
                  )}
                  {t(
                    "Qui puoi seguire in tempo reale le statistiche della ruota di Crazy Time. ",
                  )}
                  {t(
                    "Esamina le statistiche live per selezionare i numeri vincenti e scoprire Bonus incredibili”",
                  )}
                  <br />
                  <br />

                  {t(
                    "Hai a disposizione i dati sulle estrazioni in diretta alla ruota della Crazy Time. ",
                  )}
                  {t(
                    "In questa sezione puoi confrontare le probabilità teoriche rispetto ai numeri usciti realmente a questi Game Show. ",
                  )}
                  <br />
                  {t(
                    "Inoltre, hai a disposizione i dati sui numeri ritardatari – la migliore occasione per elaborare la tua strategia di gioco,",
                  )}
                  {t(
                    "oltre a informazioni che raccontano la storia di questo gioco digitale. ",
                  )}
                </p>

                <Thumbnail>
                  <Image
                    alt={"Crazy Time statistiche"}
                    src={`https://spike-images.s3.eu-central-1.amazonaws.com/crazy-time-stats_1c1293a185.jpeg`}
                    layout="responsive"
                    priority={true}
                    sizes={"30vw"}
                    quality={70}
                    width={975}
                    height={548}
                  />
                </Thumbnail>
              </Intro>
            </Header>
          </Link>

          <Divider />

          <Link passHref href={`/live-stats/crazy-time`}>
            <Header className="intro-header">
              <h2>
                {t(
                  "Monopoly Statistiche Live: Tutte le Estrazioni in Tempo Reale",
                )}
              </h2>

              <Intro>
                <p>
                  {t(
                    "In questa sezione hai a tua disposizione tutte le informazioni e i dati relativi alle",
                  )}
                  {t(
                    "estrazioni in tempo reale della ruota di Monopoly Live di Evolution Gaming. ",
                  )}
                  <br />
                  {t(
                    "Così, hai la possibilità di confrontare le probabilità teoriche con i valori estratti",
                  )}
                  {t(
                    "effettivamente nel gioco e predisporre positivamente la tua strategia di gioco. ",
                  )}
                  <br />
                  {t(
                    "Impara a giocare online ed a esplorare uno dei giochi digitali più popolari del momento. ",
                  )}
                  {t(
                    "E scopri le Statistiche di Monopoly Live in tempo reale. ",
                  )}
                </p>

                <Thumbnail>
                  <Image
                    alt={"Monopoly Statistiche live"}
                    src={`https://images.spikeslot.com/monopoly-live-stats_3f844ffed7.jpeg`}
                    layout="responsive"
                    priority={true}
                    sizes={"30vw"}
                    quality={70}
                    width={892}
                    height={501}
                  />
                </Thumbnail>
              </Intro>
            </Header>
          </Link>

          <Divider />

          <Link passHref href={`/live-stats/crazy-time`}>
            <Header className="intro-header">
              <h2>
                {t(
                  "LiveStats Dream Catcher: Tutte le Estrazioni in Tempo Reale. ",
                )}
              </h2>

              <Intro>
                <p>
                  {t(
                    "Dream Catcher significa “acchiappasogni” e ricorda il famoso amuleto dei nativi americani",
                  )}{" "}
                  <br />
                  {t(
                    "Si tratta di una ruota della fortuna di Evolution Gaming, gioco digitale uscito nel 2017. ",
                  )}
                </p>
                <Thumbnail>
                  <Image
                    alt={"LiveStats Dream Catcher"}
                    src={`https://images.spikeslot.com/statistiche-live-dream-catcher_f2cbe49cd8.jpeg`}
                    layout="responsive"
                    priority={true}
                    sizes={"30vw"}
                    quality={70}
                    width={1186}
                    height={667}
                  />
                </Thumbnail>
              </Intro>
            </Header>
          </Link>
        </div>
      </Layout>
    </Fragment>
  );
};

const Header = styled.div`
  &.stats-card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h3 {
      display: flex;
      align-items: center;
    }

    span {
      font-size: 13px;
    }
  }
`;

const Thumbnail = styled.div`
  width: 450px;
  margin: auto;
  cursor: pointer;
`;

const Intro = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-wrap: wrap;

  @media screen and (min-width: 1024px) {
    p {
      width: 50%;
    }
    flex-wrap: nowrap;
  }
`;

export default LiveStats;
