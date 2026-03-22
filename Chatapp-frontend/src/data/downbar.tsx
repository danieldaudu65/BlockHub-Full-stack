import {
  discover,
  discover_hover,
  // notification,
  // notification_hover,
  profile,
  profile_hover,
  search,
  search_hover,
  event,
  event_hover,
} from "../assets";

const downbar = [
  {
    icon: discover,
    icon_hover: discover_hover,
    label: "Discover",
    link: '/discover'
  },
  {
    icon: search,
    icon_hover: search_hover,
    label: "Search",
    link:'/search'
  },
  {
    icon: "plus",
    icon_hover: null,
    label: "Create",
    link: ''
  },
  {
    icon: event,
    icon_hover: event_hover,
    label: "Event",
    link : '/event'
  },
  {
    icon: profile,
    icon_hover: profile_hover,
    label: "Profile",
    link: '/profile'
  },
];

export default downbar;

