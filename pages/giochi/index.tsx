import React, { FunctionComponent, useState } from "react";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import SlotCard from "../../components/Cards/SlotCard";
import Divider from "../../components/Commons/Divider";
import GridLayout from "../../components/Commons/GridLayout";
import Layout from "../../components/Layout";
import SlotsCounter from "../../components/SlotsCounter";
import {
  GridType,
  pageBonusesRemapping,
  SlotFilterList,
  SlotType,
} from "../../lib/utils/constants";
import { device } from "../../lib/utils/device";
import CustomTextField from "../../components/Commons/Inputs/Textfield";
import SlotsFilter from "../../components/SlotsFilter";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { Fragment } from "react";
import ProducersTable from "../../components/Commons/Tables/ProducersTable";
import Image from "next/image";
import { CDN } from "../../public/environment";
import GiochiFooter from "../../components/GiochiFooter";
import GiochiArticle from "../../components/Commons/Articles/Giochi";
import ProvidersDialog from "../../components/Modals/ProvidersDialog";
import { Bonus, Producer, Slot, ThemeSlot } from "../../lib/schemas";
import FreeBonusList from "../../components/Lists/FreeBonusList";
import { getBonuses } from "../../lib/graphql/queries/bonuses";
import { getProducers } from "../../lib/graphql/queries/producers";
import { getSlots } from "../../lib/graphql/queries/slots";
import { debounce } from "lodash";
import { format } from "date-fns";
import italianLocale from "date-fns/locale/it";
import { getTotalSlots } from "../../lib/api";
import Head from "next/head";
import { getRandomInt } from "../../lib/utils/getRandomInt";
import { MarkdownStyleProvider } from "../blog/[firstLevel]/[secondLevel]/[slug]";
import Markdown from "markdown-to-jsx";

type PageProps = {
  giochiSlotsData: Slot[];
  slotsData: ThemeSlot;
  producersData: Producer[];
  freeBonusData: Bonus[];
  totalSlots: number;
};

const GiochiPage: FunctionComponent<PageProps> = (props) => {
  const {
    slotsData,
    giochiSlotsData,
    producersData,
    freeBonusData,
    totalSlots,
  } = props;

  const { newest, popular } = slotsData;

  const famousProducersList = producersData.filter((producer: Producer) => {
    if (
      [
        "Novomatic",
        "NetEnt",
        "BTG",
        "Thunderkick",
        "iSoftBet",
        "Pragmatic Play",
        "Play'n GO",
      ].includes(producer.name)
    ) {
      return producer;
    }
  });

  const listItems: string[] = [
    SlotFilterList.RTP,
    SlotFilterList.UPDATED_AT,
    SlotFilterList.CREATED_AT,
    SlotFilterList.NAME,
  ];

  const [giochiSlots, setGiochiSlots] = useState<Slot[]>(giochiSlotsData);
  const [itemSelected, setItemSelected] = useState<SlotFilterList>(
    SlotFilterList.SHUFFLE,
  );
  const [, setProducerSelected] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const loadMore = async () => {
    const moreFreeSlots = await getSlots({
      limit: 12,
      start: giochiSlots.length,
    });

    setGiochiSlots([...giochiSlots, ...moreFreeSlots]);
  };

  const shuffle = async () => {
    clear();

    setItemSelected(SlotFilterList.SHUFFLE);
    const shuffleFreeSlots = await getSlots({
      limit: 36,
      start: getRandomInt(giochiSlots.length, totalSlots),
    });

    setGiochiSlots(shuffleFreeSlots);
  };

  const searchSlot = debounce(async (text: string) => {
    clear();

    if (text.length >= 2) {
      setGiochiSlots(await getSlots({ name_contains: text }));
    } else setGiochiSlots(giochiSlotsData);
  }, 500);

  const filterListSlot = async (itemSelected: SlotFilterList) => {
    clear();

    const keyFilter =
      Object.keys(SlotFilterList)[
        Object.values(SlotFilterList).indexOf(itemSelected)
      ];

    const sortItem =
      keyFilter === "NAME"
        ? `${keyFilter.toLowerCase()}:asc`
        : `${keyFilter.toLowerCase()}:desc`;

    const data = await getSlots({
      countryCode: "it",
      limit: 36,
      start: 0,
      sort: sortItem,
    });
    setGiochiSlots(data);
    setItemSelected(itemSelected);
  };

  const filterByProducerName = async (producerSelected: string) => {
    let keyFilter =
      Object.keys(SlotFilterList)[
        Object.values(SlotFilterList).indexOf(itemSelected)
      ].toLowerCase();

    let response;

    if (keyFilter === "shuffle") {
      response = await getSlots({
        countryCode: "it",
        limit: 36,
        start: 0,
        producer: producerSelected,
      });
    } else {
      response = await getSlots({
        countryCode: "it",
        limit: 36,
        start: 0,
        producer: producerSelected,
        sort: keyFilter,
      });
    }

    setGiochiSlots(response);

    setProducerSelected(producerSelected);
  };

  const clear = () => setProducerSelected("");

  return (
    <Layout title="Casino Squad | Giochi di Slot Gratis, Slot Machine Online Senza Scaricare">
      <Head>
        <meta
          property="og:description"
          content="Prova tutte le slot machine gratis in modalita’ demo senza pagare, bonus e giri gratis alla registrazione"
          key="description"
        />
      </Head>
      <Header className="layout-container">
        <Intro>
          <h2>
            SLOT GRATIS – GIOCA ALLE SLOT MACHINE GRATIS ONLINE IN ITALIANO
          </h2>

          <span>
            Pubblicato: 14 set 2022 • Ultimo aggiornamento
            <span style={{ textTransform: "capitalize" }}>
              {" "}
              {format(new Date(Date.now()), "dd MMM yyyy", {
                locale: italianLocale,
              }).toString()}{" "}
            </span>
          </span>
          <MarkdownStyleProvider>
            <Markdown>
              {`Prima di tutto, benvenuto. Potresti volere informazioni sulle slot machine gratis online.<br>
Abbiamo creato recensioni per i giochi di slot all’interno della nostra collezione di titoli disponibile.<br>
Puoi sfogliare la nostra selezione delle migliori slot machines, sceglierne una e intrattenerti. Senza download o registrazione.`}
            </Markdown>
          </MarkdownStyleProvider>

          {/* <p>
						Prima di tutto, benvenuto! Sappiamo che ti piace giocare
						alle slot machine gratis online: è per quello che sei
						qui! La buona notizia e che anche noi piacciono molto le
						slot machine e abbiamo una grande collezione di giochi
						disponibile. Sfoglia la nostra selezione delle migliori
						slot machines, scegli una che ti piace e divertiti.
						Senza download o registrazione.
					</p> */}
        </Intro>

        <Thumbnail>
          <Image
            alt="Casino Squad"
            src={`${CDN}/png/logo_white.png`}
            layout="intrinsic"
            priority={true}
            width={200}
            height={200}
          />
        </Thumbnail>
      </Header>

      <br />

      <div className="layout-container">
        <GridContainer id="ads-slots">
          <GridLayout
            gridType={GridType.SLOTS}
            content={newest.map((slot: Slot) => (
              <LazyLoad once key={slot.id} height={400} offset={300}>
                <SlotCard key={slot.name} data={slot} type={SlotType.NEW} />
              </LazyLoad>
            ))}
            label="Nuove slot"
            xs={12}
            sm={4}
            md={4}
          />
          <GridLayout
            gridType={GridType.SLOTS}
            content={popular.map((slot: Slot) => (
              <LazyLoad once key={slot.id} height={400} offset={300}>
                <SlotCard key={slot.id} data={slot} type={SlotType.ONLINE} />
              </LazyLoad>
            ))}
            label="Le slot piu popolari"
            xs={12}
            sm={4}
            md={4}
          />
        </GridContainer>

        <Main>
          <Title>
            <h3>LA NOSTRA LIBRERIA DI SLOT - TUTTE DA GIOCARE GRATIS!</h3>
            <Divider />
          </Title>

          <Container>
            <Aside>
              <SlotsCounter total={totalSlots} />
              <ProducersTable
                data={famousProducersList}
                setSelected={filterByProducerName}
                setOpenDialog={setOpenDialog}
              />
              <FreeBonusList
                data={freeBonusData}
                label="I MIGLIORI CASINÒ CON GIRI GRATIS"
              />
            </Aside>

            <Section>
              <Actions>
                <div id="search-input">
                  <CustomTextField
                    onChange={searchSlot}
                    size={"small"}
                    borderRadius={"5px"}
                    searchIcon
                    placeholder="Cerca una slot..."
                  />
                </div>

                <div id="filter-slots">
                  <SlotsFilter
                    listItems={listItems}
                    itemSelected={itemSelected}
                    setItemSelected={filterListSlot}
                  />

                  <div id="shuffle">
                    <ShuffleIcon fontSize={"large"} onClick={shuffle} />
                  </div>
                </div>

                <div id="filter-providers" onClick={() => setOpenDialog(true)}>
                  <span>LIST PROVIDERS</span>
                </div>
              </Actions>

              <GridContainer id="free-slots">
                <GridLayout
                  gridType={GridType.GIOCHISLOTS}
                  content={giochiSlots.map((slot: Slot) => (
                    <Fragment>
                      <SlotInfo>
                        {itemSelected === SlotFilterList.RTP
                          ? slot.rtp
                            ? `RTP: ${slot.rtp}%`
                            : "NA"
                          : ""}
                        {itemSelected === SlotFilterList.CREATED_AT
                          ? slot.created_at
                            ? `${format(
                                new Date(slot.created_at),
                                "dd MMM yyyy",
                              ).toString()}`
                            : "NA"
                          : ""}
                        {itemSelected === SlotFilterList.UPDATED_AT
                          ? slot.created_at
                            ? `${format(
                                new Date(slot.updated_at),
                                "dd MMM yyyy",
                              ).toString()}`
                            : "NA"
                          : ""}
                      </SlotInfo>
                      <SlotCard key={slot.name} data={slot} />
                    </Fragment>
                  ))}
                  width={"100%"}
                  xs={6}
                  sm={4}
                  md={3}
                />
              </GridContainer>

              <LoadMoreButton onClick={loadMore}>
                <span>CARICA ALTRO</span>
              </LoadMoreButton>
            </Section>
          </Container>

          <GiochiFooter totalSlots={totalSlots} />
        </Main>

        <GiochiArticle />

        <ProvidersDialog
          open={openDialog}
          setOpen={setOpenDialog}
          data={producersData}
          setSelected={filterByProducerName}
        />
      </div>
    </Layout>
  );
};

const Header = styled.div`
  background-image: linear-gradient(
    0deg,
    ${({ theme }) => theme.palette.background} 0%,
    ${({ theme }) => theme.palette.gradient} 50%
  );
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  span {
    font-size: small;
  }

  p {
    color: #fff;
  }
`;

const Intro = styled.div`
  width: 70%;

  @media ${device.mobileL} {
    flex-grow: 1;
  }
`;

const Thumbnail = styled.div`
  margin: auto;

  @media ${device.tablet} {
    display: none;
  }
`;

const SlotInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: normal;
  font-size: 10px;
  padding: 5px;
  height: auto;

  .producer {
    display: inherit;
    flex-direction: row;
    flex-grow: 1;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.palette.background};

  @media ${device.tablet} {
    &#ads-slots {
      flex-direction: column;
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.palette.background};
  flex-grow: 1;
  h3 {
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin: 10px 0px;
`;

const Aside = styled.div`
  display: inherit;
  flex-direction: column;
  margin-right: 20px;
  width: 400px;
  height: min-content;

  @media ${device.tablet} {
    display: none;
  }
`;

const Section = styled.div`
  display: inherit;
  flex-direction: column;
  flex-grow: 2;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  #search-input {
    display: inherit;
    flex-grow: 2;
    border: 1px solid ${({ theme }) => theme.palette.background};
    border-radius: 5px;
    height: 35px;

    @media ${device.mobileL} {
      margin-bottom: 10px;
    }
  }

  #filter-providers {
    display: none;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.palette.background};
    border-radius: 5px;
    padding: 12px;
    margin-top: 10px;
    color: #212530;
    background-color: #fff;
    cursor: pointer;
    flex-grow: 0;

    @media ${device.tablet} {
      display: flex;
      padding: 10px 25px;
    }

    @media ${device.mobileL} {
      flex-grow: 1;
      padding: 10px 0px;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.background};
    }
  }

  #filter-slots {
    display: inherit;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 1;
    z-index: 99;
    height: 35px;

    @media ${device.mobileL} {
      justify-content: space-between;
    }

    #shuffle {
      border: 1px solid #e2b96d;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      border-radius: 0px 5px 5px 0px;
      color: #212530;
      background-color: #fff;
      width: 45px;
      height: inherit;
      cursor: pointer;

      &:hover {
        color: #e2b96d;
      }

      @media ${device.mobileL} {
        width: fill-available;
      }
    }
  }
`;

const LoadMoreButton = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  border: 2px solid ${({ theme }) => theme.palette.background};
  color: #fff;
  border-radius: ${({ theme }) => theme.button.borderRadius};
  font-weight: bold;
  cursor: pointer;
  padding: 15px;
  width: fit-content;
  text-transform: uppercase;
  display: flex;
  align-self: center;
`;

export async function getStaticProps() {
  const PAGE_BONUSES = [
    "GekoBet",
    "BETIC",
    "StarCasinò",
    "AdmiralBet",
    "LeoVegas",
  ];

  const unorderedBonuses = (
    await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })
  ).map((b) => {
    if (b.name === "BETIC") return b;
    b.link = pageBonusesRemapping[b.name];
    return b;
  });

  const placeholder: any[] = [];
  PAGE_BONUSES.forEach((b) =>
    placeholder.push(unorderedBonuses.find((ub) => ub.name === b)),
  );

  return {
    props: {
      slotsData: {
        newest: await getSlots({
          limit: 6,
          start: 0,
          sort: "created_at:desc",
        }),
        popular: await getSlots({
          limit: 6,
          start: 0,
          sort: "rating:desc",
        }),
      },
      giochiSlotsData: await getSlots({
        limit: 36,
        start: getRandomInt(0, 500),
      }),
      producersData: await getProducers({ start: 0, sort: "name:asc" }),
      freeBonusData: placeholder,
      totalSlots: await getTotalSlots(),
    },
  };
}

export default GiochiPage;
