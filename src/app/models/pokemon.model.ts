export interface Pokemon {
  id: number;
  name: string;
  img: string;
  color: string;
}

export interface PlayerTile extends Pokemon {
  marked: boolean;
}

export interface Player {
  id: number;
  name: string;
  won: boolean;
  tiles: PlayerTile[];
}

