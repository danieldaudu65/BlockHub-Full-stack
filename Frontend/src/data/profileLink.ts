import { diploma, dollar, note } from "../assets";

export type ProfileLink = {
    label: string;
    disc: string;
    icon: string;
    link: string;
};

export const profileLink: ProfileLink[] = [
    // {
    //     label: "Job Board",
    //     disc: "Explore different job opportunities at your fingertips.",
    //     icon: case2,
    //     link: "job-board"
    // },
    {
        label: "Learning Dashboard",
        disc: "Explore your courses and continue learning.",
        icon: note,
        link: "academy"
        
    },
    // {
    //     label: "Listing",
    //     disc: "Explore items and products you have put up for sale.",
    //     icon: case2,
    //     link: "listings"

    // },
    {
        label: "Tutors Dashboard",
        disc: "Create courses and help others scale their web3 journey.",
        icon: diploma,
        link: "dashboard/academy-management"

    },
    // {
    //     label: "Manage GrindFi",
    //     disc: "Manage your project as you reward ambassadors for their participation.",
    //     icon: chart,
    //     link: "grindfi"

    // },
    {
        label: "My Purchase",
        disc: "Explore product and items you’ve purchased.",
        icon: dollar,
        link: "my-purchase"

    },
];
