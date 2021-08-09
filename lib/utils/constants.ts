export enum Category {
    FAVORITES = 'favorites',
    SHOPPINGCART = 'shopping cart'
}
  
export enum GridType {
  SLOTS ,
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
  LIKES = 'likes',
  UPDATED_AT = 'updated_at',
  CREATED_AT = 'created_at',
  ALPHABETIC = 'name',
  SHUFFLE = 'shuffle'
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