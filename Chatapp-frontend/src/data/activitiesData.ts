// For placeholder avatar images
import { tp1, tp2 } from "../assets";

interface Host {
  name: string;
  avatar: string;
  // New fields for applicant information
  user: {
    fullName: string;
    level: string
    profileImage: string;
    twitterHandle: string;
    _id: string
    pages: string;
    size: string;
  };
  coverLetter?: string;
}

export interface Notification {
  id: string;
  _id?: string;

  type: 'job_application' | 'job_post' | 'general';
  message: string;
  avatar?: string;
  senderName?: string;
  jobTitle?: string;
  time: string;
  createdAt: string;
}

export interface JobPosting {
  _id: string
  id: number;
  jobTitle: string;
  applicants: Host[];
  applicantCount: number;
  postedDate: string;
  applicationEnd: string;
  salary: string;
  isActive: boolean;
  status: string;
  postedAt: string
  
}

export interface Message {
  id: number;
  sender: 'you' | 'other';
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isRead?: boolean;
  file?: {
    name: string;
    size: string;
    type: 'pdf';
  };
}

export interface Conversation {
  _id: string;
  participants: {
    _id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
}


// export const notifications: Notification[] = [
//   {
//     id: '1',
//     type: 'job_application',
//     message: '44 has applied to your job post ',
//     jobTitle: 'Lead Blockchain Architect',
//     avatar: 'https://via.placeholder.com/48',
//     time: '30mins',
//   },
//   {
//     id: '2',
//     type: 'job_application',
//     message: 'just applied a to your job post ',
//     senderName: 'Hiroshi',
//     jobTitle: '(Lead Blockchain Architect)',
//     avatar: tp1,
//     time: '30mins',
//   },
//   {
//     id: '3',
//     type: 'job_post',
//     message: 'Your job (Lead Blockchain Architect) has been posted successfully',
//     avatar: 'https://via.placeholder.com/48',
//     time: '30mins',
//   },
//   {
//     id: '4',
//     type: 'job_application',
//     message: 'just submitted an application to your job post.',
//     senderName: 'Hiroshi',
//     avatar: tp1,
//     time: '30mins',
//   },
// ];

// export const jobPostings: JobPosting[] = [
//   {
//     id: 1,
//     title: 'Lead Blockchain Architect',
//     applicants: [
//       {
//         name: 'Hiroshi',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Gustavo',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Giana',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Makenna',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Kaiya',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//     ],
//     applicantCount: 10,
//     postedDate: 'Posted 2 days ago',
//     daysLeft: 5,
//     salary: '$150K/yr',
//     isActive: true,

//   },
//   {
//     id: 2,
//     title: 'Lead Blockchain Architect',
//     applicants: [
//       {
//         name: 'Hiroshi',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Gustavo',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Giana',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Makenna',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Kaiya',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//     ],
//     applicantCount: 10,
//     postedDate: 'Posted 2 days ago',
//     daysLeft: 5,
//     salary: '$150K/yr',
//     isActive: true,
//   },
//   {
//     id: 3,
//     title: 'Lead Blockchain Architect',
//     applicants: [
//       {
//         name: 'Hiroshi',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Gustavo',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Giana',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Makenna',
//         avatar: tp2,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//       {
//         name: 'Kaiya',
//         avatar: tp1,
//         cv: {
//           name: 'Resume',
//           pages: '2 Page',
//           size: '5 MB',
//         },
//         coverLetter: "We're seeking a highly experienced Lead Blockchain Architect to design and implement scalable, secure, and innovative blockchain solutions."
//       },
//     ],
//     applicantCount: 10,
//     postedDate: '2 July 2025',
//     daysLeft: 5,
//     salary: '$150K/yr',
//     isActive: false,
//   },
// ];

// export const conversations: Conversation[] = [
//   {
//     id: 1,
//     contactName: 'Redd GG',
//     contactAvatar: tp2,
//     lastMessage: 'Okay give me a minute',
//     lastMessageTime: '16:36',
//     unreadCount: 1,
//   },
//   {
//     id: 2,
//     contactName: 'Hiroshi',
//     contactAvatar: tp1,
//     lastMessage: 'You: Good morning',
//     lastMessageTime: '30mins',
//     unreadCount: 0,
//   },
// ];

export const messages: Message[] = [
  {
    id: 1,
    sender: 'other',
    senderName: 'Redd GG',
    senderAvatar: tp2,
    content: 'Can you design a website for me?',
    time: '16:36',
  },
  {
    id: 2,
    sender: 'you',
    senderName: 'Hiroshi',
    senderAvatar: tp1,
    content: 'Yes',
    time: '16:36',
  },
  {
    id: 3,
    sender: 'you',
    senderName: 'Hiroshi',
    senderAvatar: tp1,
    content: 'What is this project about.',
    time: '16:36',
  },
  {
    id: 4,
    sender: 'other',
    senderName: 'Redd GG',
    senderAvatar: tp2,
    content: 'The project is for celebrity meme coin, it would have about 5-6 pages. How long would it take you to design.',
    time: '16:36',
  },
  {
    id: 5,
    sender: 'you',
    senderName: 'Hiroshi',
    senderAvatar: tp1,
    content: 'Can you send a PRD',
    time: '16:36',
  },
  {
    id: 6,
    sender: 'other',
    senderName: 'Redd GG',
    senderAvatar: tp2,
    content: 'Okay give me a minute',
    time: '16:36',
  },
  {
    id: 7,
    sender: 'other',
    senderName: 'Redd GG',
    senderAvatar: tp2,
    content: '',
    file: {
      name: 'Website requirements',
      size: '5MB',
      type: 'pdf',
    },
    time: '16:36',
    isRead: false,
  },
];