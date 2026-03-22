// import { tp1, tp2 } from "../assets";
import { profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9 } from '../assets';

interface Host {
  name: string;
  avatar: string;
  
}


interface Event {
  id: number;
  title: string;
  listenerCount: number;
  hosts: Host[];
  hostName: string;
  isLive: boolean;
  schedule?: string;
}

export const placeholderEvents: Event[] = [
  {
    id: 1,
    title: 'How Web3 Is Redefining Digital Identity Through Decentralization',
    listenerCount: 32,
    hosts: [
      { name: 'Hiroshi', avatar: profile1 },
      { name: 'Gustavo', avatar: profile2 },
      { name: 'Giana', avatar: profile3 },
      
      
    ],
    hostName: 'Hiroshi',
    isLive: true,
  },
  {
    id: 2,
    title: 'How Web3 Is Redefining Digital Identity Through Decentralization',
    listenerCount: 32,
    hosts: [
      { name: 'Makenna', avatar: profile4 },
      { name: 'Kaiya', avatar: profile5 },
      { name: 'Cooper', avatar: profile6 },
      
      
    ],
    hostName: 'Hiroshi',
    isLive: false,
    schedule: 'Today at 17:40',
  },
  {
    id: 3,
    title: 'How Web3 Is Redefining Digital Identity Through Decentralization',
    listenerCount: 32,
    hosts: [
      { name: 'Carla', avatar: profile7 },
      { name: 'Jaydon', avatar: profile8 },
      { name: 'Davis', avatar: profile9 },
      
      
    ],
    hostName: 'Hiroshi',
    isLive: false,
    schedule: 'Tomorrow at 17:40',
  },
  {
    id: 4,
    title: 'How Web3 Is Redefining Digital Identity Through Decentralization',
    listenerCount: 32,
    hosts: [
      { name: 'Omar', avatar: profile1 },
      { name: 'Justin', avatar: profile2 },
      { name: 'Marcus', avatar: profile3 },
      
    ],
    hostName: 'Hiroshi',
    isLive: false,
    schedule: '2 July, 2025 at 17:40',
  },
];
