import React, { FunctionComponent } from "react";
import Image from "next/image";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { CDN } from "../../public/environment";
import GridLayout from "../../components/Commons/GridLayout";
import {
  GridType,
  PAGE_BONUSES,
  pageBonusesRemapping,
} from "../../lib/utils/constants";
import BonusCard from "../../components/Cards/BonusCard";
import FreqentlyAsked from "../../components/FrequentlyAsked";
import { device } from "../../lib/utils/device";
import HomeArticle from "../../components/Commons/Articles/Home";
import LazyLoad from "react-lazyload";
import { Bonus } from "../../lib/schemas";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { getBonuses } from "../../lib/graphql/queries/bonuses";
import Head from "next/head";
import { useTranslation } from "react-i18next";

type PageProps = {
  pageBonusesData: Bonus[];
};

const SquadPage: FunctionComponent<PageProps> = ({ pageBonusesData }) => {
  const { t } = useTranslation();

  const MAIN_BONUSES = [
    "LeoVegas",
    "StarCasinò",
    "WinCasino",
    "NetBet",
    "GoldBet",
  ];

  const TOP_BONUSES = ["StarCasinò", "Starvegas", "LeoVegas"];

  const FREE_BONUSES = [
    "LeoVegas",
    "StarCasinò",
    "Starvegas",
    "Betway",
    "Gioco Digitale",
  ];

  const topBonusData = pageBonusesData.filter((bonus) => {
    if (TOP_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  const mainBonusData = pageBonusesData.filter((bonus) => {
    if (MAIN_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  const freeBonusData = pageBonusesData.filter((bonus) => {
    if (FREE_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  return (
    <Layout title="Casino Squad | Il Team Squad vi da il benvenuto">
      <Head>
        <meta
          property="og:description"
          content="Le migliori selezioni di slot machine sclete da: Lucky, Chily, Squad MRJ, Pitbull e Value"
          key="description"
        />
      </Head>

      <div className="layout-container">
        <Main>
          <Container>
            <Profile>
              <Name>CHILY</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD CHILY"}
                      src={`${CDN}/jpeg/squad/chily.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t(
                    "Ciao a tutti! Avete mai sentito parlare di un peperoncino rosso che gioca alle slot machine?",
                  )}
                  {t("No? Esiste eccome e sono io: mi chiamo Chily!")}
                  <br />
                  <br />
                  {t(
                    "Passo le giornate occupando il tempo fra la mia impresa di produzione di marmi e divertentissime lezioni di fisica agli studenti,",
                  )}
                  {t("ma trovo sempre il modo per divertirmi insieme a voi!")}
                  {t(
                    "Amo giocare e provare i tanti giochi dei casinò online. ",
                  )}{" "}
                  <br />
                  {t(
                    "Durante le mie live, mi piace provare le migliori slot in modalità online e giocare alla ",
                  )}
                  {t(
                    "slot digitale Honey Rush e alla slot online Legacy of Dead. ",
                  )}{" "}
                  <br />
                  {t(
                    "Dimenticavo: ultimamente ho scoperto di essermi innamorato alla follia della slot online",
                  )}
                  <strong>{t("Pillars of Asgard")}</strong>{" "}
                  {t("della SG Gaming con il mitico Odino: chissà perché!")}
                  <br />
                  {t("Durante le sessioni di gioco alla slot online")}{" "}
                  <strong>Pillars of Asgard</strong>
                  {t(" e alla slot digitale")}{" "}
                  <strong>Rise of the Mountain King</strong>,
                  {t("ho ottenuto le vincite più gloriose in assoluto!")}
                  <br />
                  {t(
                    "Purtroppo non ho la fortuna di Lucky, anzi, devo sempre lottare contro la sfortuna e ho un mio metodo personale!",
                  )}
                  <br />
                  {t(
                    "Infatti, per incrementare le mie chance di vittoria, mangio sempre qualche peperoncino piccantissimo. ",
                  )}{" "}
                  <br />
                  <br />
                  {t(
                    "Non ci credete? Ebbene, ci sono clip che lo testimoniano!",
                  )}
                  {t(
                    "Ogni volta che mi sento dire: “Esci che non paga” risponderò con la mia tenacia, dicendo:",
                  )}{" "}
                  “<strong>{t("Chi ha detto di uscire da qua")}</strong>
                  ”?
                  {t(
                    "Ad ogni pagata, tra sedie che volano e signore che sbattono la scopa, sono certo che non potrete fare a meno di me. Vi aspetto!",
                  )}
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.facebook.com/chilyslot"}
              >
                <FacebookIcon fontSize={"large"} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/chilyslot"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>MISTER J</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD MR J"}
                      src={`${CDN}/jpeg/squad/mrj.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  Tra tutti voi ci saranno sicuramente dei fan di “La Casa di
                  Carta": beh, io sono il "Professor" della Squad.
                  <br />
                  In effetti, Mister J è importante per la Squad, così come il
                  Professore è importante per Tokyo, Berlino, Rio etc,
                  <br /> <br />
                  e ci sono molte persone che mi considerano Charlie di "2
                  uomini e mezzo"!
                  <br />
                  <br />
                  Nella mia vita mi occupo della gestione e della cura di ogni
                  tipo di evento: dalle discoteche ai concerti. <br />
                  Tuttavia, ovviamente, questo periodo è stato un po' complicato
                  a causa della pandemia.
                  <br />
                  Possiedo vari e-commerce e ho lanciato diversi brand: dai
                  prodotti per l'infanzia, ai ritratti realistici e stilizzati.
                  <br />
                  <br />
                  Ogni tanto faccio live streaming e tornei di poker con i miei
                  amici del canale inglese; <br />
                  Mi piace passare del tempo con loro, così come con Pitbull e
                  compagni, e adorano quando mi vesto da Capitan Canada o Batman
                  perché è pura e sana "follia", <br />
                  ed è ancora meglio se quei momenti sono accompagnati da temi
                  televisivi e molte belle canzoni!
                  <br />
                  Direi che non ho proprio un gioco preferito, ma ricordo con
                  piacere le mie vincite alla Big Bass Bonanza e al Crazy
                  Time... <br />
                  Di solito cerco di regalare un po' di divertimento ai nostri
                  followers e a Chily il gufo durante i nostri Bonus Hunt!
                  <br />
                  <br />
                  Anche se qualcuno ha qualcosa da dire sulle mie giocate, io
                  risponderò con: "I’m Mister J, shhh". E non imitarmi, non
                  farlo a casa!
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/mister.j_17/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>PITBULL</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD PITBULL"}
                      src={`${CDN}/jpeg/squad/pitbull.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t(
                    "Ciao sono Pitbull! State attenti a non farmi arrabbiare!",
                  )}{" "}
                  <br />
                  {t(
                    "Perché mi chiamo così? Dovete sapere che ho tutte le caratteristiche di questo meraviglioso cane. ",
                  )}
                  {t(
                    "Infatti, la forza assieme alla tenacia, mi hanno permesso di ottenere un sacco di soddisfazioni in ambito lavorativo. ",
                  )}
                  <br />
                  {t(
                    "Sono occupato su più fronti fra cui il turismo ed il settore dell’abbigliamento, ma uno dei miei sogni più grandi è diventare pilota d’aereo!",
                  )}
                  <br />
                  {t(
                    "Mi piace scoprire tutte le novità dei casinò digitali, sono appassionato della slot online Reactoonz e amo particolarmente il Monopoly Live e il Blackjack. ",
                  )}{" "}
                  <br />
                  {t(
                    "Fra i miei ricordi, ce ne sono di bellissimi che hanno come protagonista la slot machine White Rabbit, così come la",
                  )}{" "}
                  <strong>Moon Princess</strong> di Play ‘n Go e altre.
                  <br />
                  <br />
                  {t(
                    " Sono fortunato, ma so gestire scrupolosamente bet e bankroll. ",
                  )}
                  <br />
                  {t(
                    "Si narra che le mie numerose vincite siano stato accompagnate dalla “turbochiappa” – una vera e propria candidata a diventare Patrimonio dell’UNESCO. ",
                  )}{" "}
                  <br />
                  {t(
                    "Ogni volta che sento dire: “E che cos’è?” prontamente rispondo:",
                  )}{" "}
                  “<strong>{t("LA SCOTECAAA")}</strong>”.
                  {t("Durante le mie migliori vincite sentirete sempre:")} “
                  <strong>{t("VAMONOOOS")}</strong>”
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.facebook.com/pitbullslot"}
              >
                <FacebookIcon fontSize={"large"} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/pitbullslot/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>VALUE</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD VALUE"}
                      src={`${CDN}/jpeg/squad/value.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t("Salve a tutti, mi presento: sono Mr. Value!")}
                  {t(
                    "Mi occupo di forniture di arredo scolastico ed urbano in giro per il mondo. ",
                  )}
                  {t(
                    "Insieme agli altri ragazzi della Squad, vi farò compagnia quotidianamente, fra una slot digitale ed un gioco di casinò live. ",
                  )}
                  {t("La mia slot machine preferita è la")}{" "}
                  <strong>Book of Dead</strong>.{" "}
                  {t(
                    "Tuttavia, preferisco di gran lunga i giochi live come Blackjack e Roulette. ",
                  )}{" "}
                  <br />
                  <br />
                  {t(
                    "Personalmente sono ancora alla ricerca della grande sbancata,",
                  )}
                  {t(
                    "ma per ora posso ritenermi soddisfatto delle vincite alla slot online",
                  )}{" "}
                  <strong>Book of Dead</strong> e al{" "}
                  <strong>Monopoly Live</strong>.
                </p>
              </div>
            </Profile>
            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/mr_value_bet/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>
        </Main>
      </div>

      <div className="layout-container topBonus">
        <GridContainer id="grid-topBonus">
          <GridLayout
            gridType={GridType.TOPBONUS}
            content={topBonusData.map((bonus) => (
              <BonusCard key={bonus.id} data={bonus} />
            ))}
            label="I top bonus dei casinò online in Italia"
            AlignItem={"center"}
            xs={12}
            sm={4}
            md={4}
            showIndex
            showBoxShadow
            bgColor="#fff"
            spacing={4}
          />
        </GridContainer>
      </div>

      <br />
      <br />

      <FreqentlyAsked />

      <div className="layout-container">
        <Section>
          <HomeArticle
            mainBonuses={mainBonusData}
            freeBonuses={freeBonusData}
          />
        </Section>
      </div>
    </Layout>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0px;
`;

const Container = styled.div`
  position: relative;
  display: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  width: 40%;
  flex-grow: 1;
  padding: 10px;
  margin: 5px;
  background-color: white;
  border-radius: 5px;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const Profile = styled.div`
  position: relative;
  display: inherit;
  flex-direction: column;
  flex-grow: 1;
  width: min-content;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 22px;
`;

const Thumbnail = styled.div`
  height: fit-content;
  overflow: hidden;
  width: 200px;
  float: right;
  box-shadow: 0px 0px 12px 3px rgba(226, 185, 109, 0.65);
  margin: 20px 20px;
  border-radius: 5px;

  @media ${device.mobileL} {
    float: none;
    width: auto;
  }
`;

const SocialNetwork = styled.div`
  position: absolute;
  top: 5px;
  right: 0;

  a {
    color: ${({ theme }) => theme.text.color.black};
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 10px;
`;

export async function getStaticProps() {
  return {
    props: {
      pageBonusesData: (
        await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })
      ).map((b) => {
        b.link = pageBonusesRemapping[b.name];
        return b;
      }),
    },
  };
}

export default SquadPage;
