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
  UPDATED_AT = 'updated_at',
  CREATED_AT = 'created_at',
  ALPHABETIC = 'name',
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