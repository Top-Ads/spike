export enum Category {
    FAVORITES = 'favorites'
}
  
export enum GridType {
  SLOTS ,
  GIOCHISLOTS,
  TOPBONUS,
  BONUS,
  QUESTIONS,
  FREE,
  STATS 
}

export enum SlotType {
  NEW,
  ONLINE = 'online',
  BAR = 'rtp',
  VLT = 'vlt'
}

export enum SlotFilterList {
  RTP = 'RTP',
  UPDATED_AT = 'Data Aggiornamento',
  CREATED_AT = 'Data pubblicazione',
  NAME = 'Nome',
  SHUFFLE = 'Ordina'
}

export enum LiveStats {
    MONOPOLY,
    CRAZYTIME,
    DREAMCATCHER
}

export enum SymbolLayout {
  CARD,
  TABLE
}