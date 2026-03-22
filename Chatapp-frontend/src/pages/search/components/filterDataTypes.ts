export interface Card {
  id: string;
  name: string;
  title?: string;
  description: string;
  handle: string;
  type: string;
  func?: string[];
  paymentType?: 'Paid' | 'Volunteer' | 'Bounty';
  accessLevel?: 'Free' | 'Tier1'; 
  isRemote?: boolean;
  skills?: string[];
  employmentType?: string;
  tags?: string[];
  isBeginnerFriendly?: boolean; 

  createdAt?: Date; 
  popularityScore?: number;
  endsAt?: Date;
  followers?: number; 
  avatar: string;
}


export interface FilterConfig {
  type: 'propertyMatch' | 'arrayIncludes' | 'customLogic';
  property?: keyof Card;
  valueMap?: { [label: string]: any };
}

export interface SubItem {
  label: string;
  locked?: boolean;
}


export interface FilterCategory {
  category: string;
  subItems: SubItem[];
  filterConfig?: FilterConfig;
  isSortBy?: boolean;
}

export type OptionSelectedType = { [category: string]: string[]; };