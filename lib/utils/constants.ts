export enum Category {
  FAVORITES = "preferiti",
}

export enum GridType {
  SLOTS,
  GIOCHISLOTS,
  TOPBONUS,
  BONUS,
  QUESTIONS,
  FREE,
  STATS,
  PRODUCER,
}

export enum SlotType {
  NEW,
  ONLINE = "online",
  BAR = "rtp",
  VLT = "vlt",
}

export enum SlotFilterList {
  RTP = "RTP",
  UPDATED_AT = "Data Aggiornamento",
  CREATED_AT = "Data pubblicazione",
  NAME = "Nome",
  SHUFFLE = "Ordina",
}

export enum LiveStats {
  MONOPOLY,
  CRAZYTIME,
  DREAMCATCHER,
}

export enum SymbolLayout {
  CARD,
  TABLE,
}

export const PAGE_BONUSES = [
  "GekoBet",
  "BETIC",
  "StarCasinò",
  "AdmiralBet",
  "Starvegas",
  "QuiGioco",
  "NetBet",
  "LeoVegas",
  "Snai",
  "888 Casino",
  "William Hill",
  "Netwin",
  "BetFlag",
  "Eurobet",
  "Gioco Digitale",
  "Bwin",
  "Betway",
];

export const pageBonusesRemapping: any = {
  GekoBet: "https://gekobet.it/fwlink/account-registration?father=GKCSSI",
  LeoVegas:
    "https://ntrfr.leovegas.com/redirect.aspx?pid=3708703&lpid=1757&bid=19140",
  StarCasinò:
    "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
  BetRoom:
    "https://www.promovt.info/betroomcasino/?page=user&p=registration&mp=b76750fa-ea90-424c-85d2-00e33416391e",
  WinCasino:
    "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173",
  GoldBet: "https://media.goldbetpartners.it/redirect.aspx?pid=5116&bid=1495",
  NetBet: "https://netbetit.livepartners.com/view.php?z=163305",
  "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1864253",
  "King Casino": "http://cs.kingcasino.it/",
  Eurobet:
    "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/113/",
  Betway: "https://partners.betway.it/bwp/casino/?s=bpi29951&a=bpiadid167219",
  "Gioco Digitale":
    "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706",
  "PokerStars Casino":
    "https://secure.starsaffiliateclub.com/C.ashx?btag=a_186177b_6907c_&affid=100976968&siteid=186177&adid=6907&c=",
  "William Hill":
    "https://campaigns.williamhill.it/C.ashx?btag=a_201973b_834c_&affid=1742025&siteid=201973&adid=834&c=",
  BETIC:
    "https://www.promovt.info/casino3/index.php?id=casino&main=betic&promo=betic&banner=beticWelcomeBonus3000&skin=welcomeBonus3000&mp=3236f5fb-6745-4e41-ae78-a26aeccea794",
  Lottomatica:
    "https://media.lottomaticapartners.it/redirect.aspx?pid=11624&bid=1509",
  BetFlag:
    "https://info.betflag.it/landing/affiliazioni/bonus-registrazione-slot/?btag=PV99_283455F9C2AE423D8A6D232C87DE09E9",
  QuiGioco:
    "https://tracking.quigiocopartners.it/C.ashx?btag=a_264b_20c_&affid=38&siteid=264&adid=20&c=",
  AdmiralBet:
    "https://www.admiralbet.it/gmg/refer/67484085cf050135d4a0481a",
  Starvegas: "https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7",
  Snai: "https://informatoriads.snai.it/redirect.aspx?pid=30828&bid=2748",
  Netwin: "https://m.netwin.it/Redirect.aspx?mid=21&sid=5444&cid=&pid=&affid=3138",
  Bwin: "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031707"
};
