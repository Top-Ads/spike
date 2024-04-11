import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import StatsCard from "../../../components/Cards/StatsCard";
import Divider from "../../../components/Commons/Divider";
import GridLayout from "../../../components/Commons/GridLayout";
import CustumSelect from "../../../components/Commons/Inputs/Select";
import Layout from "../../../components/Layout";
import { GridType, LiveStats } from "../../../lib/utils/constants";
import axios from "axios";
import { APISOCKET } from "../../../public/environment";
import { io, Socket } from "socket.io-client";
import { Bonus, MonopolyTables, Spin, Stat } from "../../../lib/schemas";
import SpinsTable from "../../../components/Commons/Tables/SpinsTable";
import LazyLoad from "react-lazyload";
import BonusTable from "../../../components/Commons/Tables/BonusTable";
import BonusCard from "../../../components/Cards/BonusCard";
import { device } from "../../../lib/utils/device";
import DiceRollTable from "../../../components/Commons/Tables/DiceRollTable";
import { getBonuses } from "../../../lib/graphql/queries/bonuses";
import { format } from "date-fns";
import italianLocale from "date-fns/locale/it";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { MarkdownStyleProvider } from "../../blog/[firstLevel]/[secondLevel]/[slug]";
import Markdown from "markdown-to-jsx";

type PageProps = {
  statsData: Stat[];
  spinsData: Spin[];
  bonusesData: Bonus[];
  tablesData: MonopolyTables;
};

const MonopolyPage: FunctionComponent<PageProps> = ({
  statsData,
  spinsData,
  bonusesData,
  tablesData,
}) => {
  const { t } = useTranslation();

  const [stats, setStats] = useState<Stat[]>(statsData);
  const [spins, setSpins] = useState<Spin[]>(spinsData);
  const [tables, setTables] = useState<MonopolyTables>(tablesData);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [selected, setSelected] = useState<string>("24h");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()));

  const fetchStatsData = async (timeFrame: string) => {
    const dataStataResponse = await axios.get(
      `${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/${timeFrame}`,
    );
    setStats(dataStataResponse.data.stats.stats);
  };

  useEffect(() => {
    setSocket(
      io(APISOCKET.MONOPOLY, {
        secure: true,
        rejectUnauthorized: false,
        transports: ["websocket"],
      }),
    );

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit(selected);
      socket.on(selected, (data) => {
        setStats(data.stats.stats);
        setSpins(data.spins);
        setTables(data.tables[0]);
        setLastUpdate(new Date(Date.now()));
      });
    }

    return () => {
      socket && socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (selected) fetchStatsData(selected);
  }, [selected]);

  return (
    <Layout title="Casino Squad |Gioco Monopoly Statistiche Live">
      <Head>
        <meta
          property="og:description"
          content="Estrazioni online in tempo reale della Ruota di Monopoly"
          key="description"
        />
      </Head>

      <div className="layout-container">
        <Header className="intro-header">
          <Intro>
            <div className="wrapper">
              <MarkdownStyleProvider>
                <Markdown>
                  {`# Monopoly Statistiche Live: Tutte le Estrazioni in Tempo Reale

In questa sezione hai a tua disposizione tutte le informazioni e i dati relativi alle estrazioni in tempo reale della ruota di Monopoly Live di Evolution Gaming.<br>
Così, hai la **possibilità di confrontare le probabilità teoriche con i valori estratti effettivamente nel gioco** e predisporre consapevolmente la tua strategia di gioco.

Trova informazione per giocare online ed a esplorare uno dei giochi digitali diffusi al momento. E scopri le Statistiche di Monopoly Live in tempo reale.<br>
**Gioca responsabilmente e solo se sei maggiorenne**.`}
                </Markdown>
              </MarkdownStyleProvider>
            </div>
            {/* <p>
							{t(
								'In questa sezione hai a tua disposizione tutte le informazioni e i dati relativi alle'
							)}
							{t(
								'estrazioni in tempo reale della ruota di Monopoly Live di Evolution Gaming. '
							)}
							<br />
							{t(
								'Così, hai la possibilità di confrontare le probabilità teoriche con i valori estratti'
							)}
							{t(
								'effettivamente nel gioco e predisporre positivamente la tua strategia di gioco. '
							)}
							<br />
							{t(
								'Impara a giocare online ed a esplorare uno dei giochi digitali più popolari del momento. '
							)}
							{t(
								'E scopri le Statistiche di Monopoly Live in tempo reale. '
							)}
						</p> */}

            <Thumbnail>
              <LazyLoad height={548}>
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
              </LazyLoad>
            </Thumbnail>
          </Intro>

          <Divider />
        </Header>

        <Main>
          <StatsContainer>
            <Header className="stats-card-header">
              <div>
                <h3>{t("Statistiche Monopoly")}</h3>
                <span
                  style={{ textTransform: "capitalize" }}
                  suppressHydrationWarning
                >
                  {t("Ultimo Aggiornamento:")}{" "}
                  {format(new Date(lastUpdate), "dd MMM yyyy • HH:mm", {
                    locale: italianLocale,
                  }).toString()}
                </span>
              </div>

              <CustumSelect setSelected={setSelected} />
            </Header>
            <Divider />

            <GridContainer className={"stats-cards"}>
              <GridLayout
                gridType={GridType.STATS}
                content={stats.map((stats: Stat, index: number) => (
                  <StatsCard
                    key={index}
                    data={stats}
                    timeFrame={selected}
                    type={LiveStats.MONOPOLY}
                  />
                ))}
                AlignItem={"center"}
                xs={12}
                sm={3}
                md={3}
                showBoxShadow
                bgColor="#fff"
                spacing={3}
              />
            </GridContainer>
          </StatsContainer>

          <br />

          <BonusContainer>
            <h3>{t("Puoi giocare alla MONOPOLY QUI")}</h3>
            <div className="bonus-table">
              <BonusTable data={bonusesData} />
            </div>

            <GridContainer className={"bonus-cards"}>
              <GridLayout
                gridType={GridType.BONUS}
                content={bonusesData.map((bonus) => (
                  <BonusCard key={bonus.id} data={bonus} />
                ))}
                AlignItem={"center"}
                xs={12}
                sm={12}
                md={12}
                showIndex
                showBoxShadow
                bgColor="#fff"
                spacing={2}
              />
            </GridContainer>
          </BonusContainer>

          <br />

          <SpinsContainer>
            <h3>{t("Storico degli Spin")}</h3>
            <SpinsTable data={spins} gameType={LiveStats.MONOPOLY} />
          </SpinsContainer>

          <br />

          <DiceRollContainer>
            <DiceRollTable type="low" data={tables.lowTierTable.rows} />
            <DiceRollTable type="mid" data={tables.midTierTable.rows} />
            <DiceRollTable type="high" data={tables.highTierTable.rows} />
          </DiceRollContainer>
        </Main>

        <Footer>
          <MarkdownStyleProvider>
            <Markdown>
              {`## Controlla gli ultimi numeri usciti al Monopoly Live

Monopoly Live è uno dei giochi live seguiti dal pubblico che rappresenta la versione digitale del classico gioco da tavolo. Le informazioni sugli ultimi numeri usciti, aiutano il giocatore ad essere sempre aggiornato in tempo reale.

In ogni casella puoi visionare la probabilità di uscita, sempre aggiornata in diretta, nonché il numero di giri che passa dall'ultima estrazione di ogni numero,oppure 2 rolls, 4 rolls e chance.<br>
Questo strumento – il live tracker Monopoly Live – consente di visionare il numero di volte in cui ciascun numero o roll è stato estratto, assieme al valore correlato dato dalle previsioni teoriche.<br><br>


## Ci sono vantaggi per i giocatori con i dati mostrati nella sezione Monopoly Statistiche Live?

Questi dati possono essere vantaggiosi sotto alcuni punti di vista: offrono la possibilità di osservare la differenza tra previsioni teoriche e andamento effettivo della ruota Monopoly Live. In effetti, ciascun produttore esprime il valore medio delle probabilità di uscita di ciascun settore della ruota.

È possibile rendersi conto se uno o più valori sono lontani dal valore medio, **ma ricordiamo sempre che non esiste correlazione matematica tra uno spin e l'altro**. <br>
Quindi le probabilità restano invariate e non ci sono strategie che possano funzionare con certezza.<br>Il successo delle scommesse non è mai certo.<br><br>


## Intrattenimento con il meglio del Live Casinò

Tutti gli utenti del sito Casino Squad possono sfruttare gratis questo servizio, consultando la sezione dedicata in modo semplice e veloce.<br>Con la possibilità di seguire in tempo reale il gioco, potrai sempre modificare la strategia ed – eventualmente - personalizzare l'uso del Budget a disposizione.

Ricordiamo inoltre che – sul lungo termine - qualsiasi tipo di giocata porta a perdere il credito, considerando l'**RTP di 96.23%**.<br>
Per tutte le informazioni puoi dare un’occhiata alla nostra Guida di Monopoly Live.<br>
Divertiti con il meglio dei Game Show e ricorda che il gioco è vietato ai minori di 18 anni e può creare dipendenza patologica.`}
            </Markdown>
          </MarkdownStyleProvider>
          {/* <section>
						<h3>
							{t(
								'Controlla gli ultimi numeri usciti al Monopoly Live'
							)}
						</h3>
						<p>
							{t(
								'Monopoly Live è uno dei giochi live più amati dal pubblico perché rappresenta la versione digitale del classico gioco da tavolo. '
							)}
							{t(
								'Le informazioni sugli ultimi numeri usciti, aiuta il giocatore ad essere sempre aggiornato in tempo reale!'
							)}{' '}
							<br />
							{t(
								"In ogni casella puoi visionare la probabilità di uscita, sempre aggiornata in diretta, nonché il numero di giri che passa dall'ultima estrazione di ogni numero,"
							)}
							{t('oppure 2 rolls, 4 rolls e chance. ')}
							{t(
								'Questo strumento – il live tracker Monopoly Live – consente di visionare il numero di volte in cui ciascun numero o roll è stato estratto,'
							)}
							{t(
								'assieme al valore correlato dato dalle previsioni teoriche. '
							)}
						</p>
					</section>

					<section>
						<h3>
							{t(
								'Quali vantaggi consentono ai giocatori i dati mostrati nella sezione Monopoly Statistiche Live?'
							)}
						</h3>
						<p>
							{t(
								'Questi dati sono vantaggiosi per il giocatore:'
							)}
							{t(
								'offrono la possibilità di osservare la differenza tra previsioni teoriche e andamento effettivo della ruota Monopoly Live. '
							)}
							{t(
								'In effetti, ciascun produttore esprime il valore medio delle probabilità di uscita di ciascun settore della ruota. '
							)}{' '}
							<br />
							{t(
								'Tuttavia, se uno o più valori sono lontani dal valore medio, probabilmente assisteremo ad estrazioni in grado di ristabilire le probabilità teoriche. '
							)}{' '}
							<br />
							{t(
								"Ricordiamo sempre, che non esiste correlazione matematica tra uno spin e l'altro. "
							)}
							{t(
								'Nondimeno, le statistiche possono essere utilizzate per definire la propria personale strategia con la fiducia che possa funzionare,'
							)}
							{t('almeno sul breve periodo. ')} <br />
							{t(
								'Facciamo un esempio: se stiamo puntando sul 2 rolls, ma questo è uscito alla giusta frequenza, mentre il 4 rolls non esce da diversi spin,'
							)}
							{t('conviene considerare di puntare il 4 rolls. ')}{' '}
							<br />
							{t(
								'Infatti, i numeri che non escono da vari spin, oppure i rolls potrebbero consentire al giocatore di recuperare il Budget. '
							)}
							{t(
								'Ma ricorda che il successo delle scommesse non è mai certo. '
							)}
						</p>
					</section>

					<section>
						<h3>{t('Divertiti con il meglio del Live Casinò')}</h3>
						<p>
							{t(
								'Tutti gli utenti del sito Casino Squad possono sfruttare gratis questo servizio, consultando la sezione dedicata in modo semplice e veloce. '
							)}{' '}
							<br />
							{t(
								"Con la possibilità di seguire in tempo reale il gioco, potrai sempre modificare la strategia ed – eventualmente - ottimizzare l'uso del Budget a disposizione. "
							)}
							<br />
							{t(
								"Ricordiamo inoltre che – sul lungo termine - qualsiasi tipo di giocata porta a perdere il credito, considerando l'RTP di 96.23%. "
							)}{' '}
							<br />
							{t(
								'Per tutte le informazioni puoi dare un’occhiata alla nostra Guida di Monopoly Live. '
							)}
							<br />
							<br />
							{t(
								'Divertiti con il meglio dei Game Show e ricorda che il gioco è vietato ai minori di 18 anni e può creare dipendenza patologica. '
							)}
						</p>
					</section> */}
        </Footer>
      </div>
    </Layout>
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

const Intro = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-wrap: wrap;

  .wrapper {
    width: 50%;
    @media ${device.mobileL} {
      width: 100%;
    }
  }
`;

const Main = styled.div``;

const Footer = styled.div`
  section {
    margin: 40px 0px;
  }
  h3 {
    color: ${({ theme }) => theme.palette.background};
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BonusContainer = styled.div`
  .bonus-table {
    display: revert;
    @media ${device.mobileL} {
      display: none;
    }
  }

  .bonus-cards {
    display: none;
    @media ${device.mobileL} {
      display: revert;
    }
  }
`;

const SpinsContainer = styled.div``;

const DiceRollContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Thumbnail = styled.div`
  width: 450px;
  margin: auto;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export async function getServerSideProps() {
  const dataStatsResponse = await axios.get(
    `${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/24h`,
  );
  const dataSpinsResponse = await axios.get(
    `${APISOCKET.MONOPOLY}/api/get-latest/15`,
  );
  const PAGE_BONUSES = [
    "888 Casino",
    "BETIC",
    "StarCasinò",
    "NetBet",
    "LeoVegas",
    "QuiGioco",
  ];

  const pageBonusesRemapping: any = {
    "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1864253",
    LeoVegas:
      "https://ntrfr.leovegas.com/redirect.aspx?pid=3708703&lpid=1757&bid=19140",
    StarCasinò:
      "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
    NetBet: " https://netbetit.livepartners.com/view.php?z=163305",
    "William Hill":
      "https://campaigns.williamhill.it/C.ashx?btag=a_201973b_834c_&affid=1742025&siteid=201973&adid=834&c=",
    QuiGioco:
      "https://www.quigioco.it/signup?codAffiliato=R2026&label=squad-sito",
  };
  return {
    props: {
      statsData: dataStatsResponse.data.stats.stats,
      spinsData: dataSpinsResponse.data.latestSpins,
      bonusesData: (
        await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })
      ).map((b) => {
        if (pageBonusesRemapping[b.name]) {
          b.link = pageBonusesRemapping[b.name];
        }
        return b;
      }),
      tablesData: dataStatsResponse.data.tables[0],
    },
  };
}

export default MonopolyPage;
