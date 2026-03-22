import { type FilterCategory, type FilterConfig,  type Card } from '../pages/search/components/filterDataTypes'

const createFilterConfig = (type: FilterConfig['type'], property?: keyof Card, valueMap?: { [label: string]: any }): FilterConfig => ({
  type,
  property,
  valueMap
});

const filterData: FilterCategory[] = [
  {
    category: "Job Category",
    subItems: [
      { label: "Design" },
      { label: "Development" },
      { label: "Marketing" },
      { label: "Content" },
      { label: "Community" },
    ],

    filterConfig: createFilterConfig('arrayIncludes', 'func'),
  },
  {
    category: "Opportunity Type",
    subItems: [
      { label: "Job" },
      { label: "Project" },
      { label: "VC-backend project" },
      { label: "Hackathon" },
    ],
    
    filterConfig: createFilterConfig('customLogic', 'type'),
  },
  {
    category: "Payment Type",
    subItems: [
      { label: "Paid" },
      { label: "Volunteer" },
      { label: "Bounty" },
    ],
    filterConfig: createFilterConfig('propertyMatch', 'paymentType', {
      "Paid": "Paid",
      "Volunteer": "Volunteer",
      "Bounty": "Bounty",
    }),
  },
  {
    category: "Membership Level Access",
    subItems: [
      { label: "Free" },
      { label: "Tier1", locked: true }
    ],
  
    filterConfig: createFilterConfig('propertyMatch', 'accessLevel', {
      "Free": "Free",
      "Tier1": "Tier1",
    }),
  },
  {
    category: "Sort By",
    subItems: [
      { label: "Newest" },
      { label: "Popular" },
      { label: "Ending soon" },
      { label: "Most followed" }
    ],
    isSortBy: true, // sorting category
    
  },
];

export default filterData;