export type MainCategory = 'tank' | 'sniper' | 'warship';

export type TankSubcategory = 'main-battle-tank' | 'light-tank' | 'heavy-tank';
export type SniperSubcategory = 'anti-materiel' | 'designated-marksman' | 'bolt-action';
export type WarshipSubcategory =
  | 'aircraft-carrier'
  | 'destroyer'
  | 'cruiser'
  | 'submarine'
  | 'frigate';

export type Subcategory = TankSubcategory | SniperSubcategory | WarshipSubcategory;

export interface Specification {
  label: string;
  value: string;
}

export interface MilitaryUnit {
  id: string;
  name: string;
  slug: string;
  category: MainCategory;
  subcategory: Subcategory;
  country: string;
  countryCode: string;
  year: number;
  image: string;
  description: string;
  specifications: Specification[];
  technologies: string[];
  history: string;
  featured?: boolean;
}
