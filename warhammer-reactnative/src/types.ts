// A unit as it comes from the API
export interface Unit {
  _id: string;
  name: string;
  faction: string;
  role: string;
  points: number;
  keywords: string[];
}

// A unit that has been added to the army
export interface ArmyUnit {
  id: string;
  name: string;
  faction: string;
  role: string;
  points: number;
}

// The screens in the app and the params each screen takes
export type RootStackParamList = {
  Home: undefined;
  UnitDetails: {
    id: string;
    name: string;
    faction: string;
    role: string;
    points: string;
  };
  Army: undefined;
};
