export enum Category {
	FAVORITES = 'preferiti',
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
	ONLINE = 'online',
	BAR = 'rtp',
	VLT = 'vlt',
}

export enum SlotFilterList {
	RTP = 'RTP',
	UPDATED_AT = 'Data Aggiornamento',
	CREATED_AT = 'Data pubblicazione',
	NAME = 'Nome',
	SHUFFLE = 'Ordina',
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
	'LeoVegas',
	'StarCasinò',
	'Starvegas',
	'PokerStars Casino',
	'WinCasino',
	'NetBet',
	'GoldBet',
	'888 Casino',
	'King Casino',
	'Eurobet',
	'Betway',
	'Gioco Digitale',
]

export const pageBonusesRemapping: any = {
	LeoVegas: 'https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965',
	StarCasinò:
		'http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/',
	Starvegas: 'https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7',
	WinCasino:
		'https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173',
	GoldBet: 'https://media.goldbetpartners.it/redirect.aspx?pid=5116&bid=1495',
	NetBet: 'https://banners.livepartners.com/view.php?z=151484',
	'888 Casino': 'https://ic.aff-handler.com/c/43431?sr=1864253',
	'King Casino': 'http://cs.kingcasino.it/',
	Eurobet:
		'https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/113/',
	Betway: 'https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3379473685189866&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3379473685189866',
	'Gioco Digitale':
		'https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706',
	'PokerStars Casino':
		'https://secure.starsaffiliateclub.com/C.ashx?btag=a_184856b_6258c_&affid=100976968&siteid=184856&adid=6258&c=',
}
