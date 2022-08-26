import React from 'react'
import {
  User,
  Minimize,
  CheckCircle,
  MapPin,
  Clipboard,
  List,
  Thermometer,
  Activity,
  Users,
  Phone,
  TrendingUp,
  Key,
  Heart,
  AlertCircle,
} from 'react-feather'
import config from '../../config/config'
import FlagForReview from './flag-for-review/flag-for-review.component'

const { iframes } = config
const SidebarMenuItems = [
  {
    name: 'Members',
    icon: <User />,
    rootUrl: `https://airtable.com/embed/${iframes.default.members}?viewControls=on`,
    url_sandbox: 'https://airtable.com/embed/shrK946uKbTWYhDSa',
  },
  {
    name: 'Interactions',
    icon: <Minimize />,
    component: <FlagForReview />,
  },
  {
    name: 'Tasks',
    icon: <CheckCircle />,
    subItems: [
      {
        name: 'HN Tasks',
        icon: <CheckCircle />,
        rootUrl:
          'https://airtable.com/embed/shrlDv3haSmnW2KXm?backgroundColor=green&viewControls=on',
        url_sandbox:
          'https://airtable.com/embed/shrBT8cqIRfMaixuq?backgroundColor=pink&viewControls=on',
      },
      {
        name: 'Callbacks',
        icon: <Phone />,
        rootUrl:
          'https://airtable.com/embed/shrWh9lzYTjGX7fDT?backgroundColor=green&viewControls=on',
        url_sandbox:
          'https://airtable.com/embed/shrrDnejrjuSDnDAP?backgroundColor=pink&viewControls=on',
      },
      {
        name: 'Members Tasks',
        icon: <CheckCircle />,
        rootUrl:
          'https://airtable.com/embed/shrz0HHYQVgNuca5v/tbljwCFIDT2vG65AH?backgroundColor=green&viewControls=on',
        url_sandbox:
          'https://airtable.com/embed/shrCpg6I7xco5Miov?backgroundColor=pink&viewControls=on',
      },
    ],
  },
  {
    name: 'Appointments',
    icon: <MapPin />,
    rootUrl:
      'https://airtable.com/embed/shrFbonDRzDmoAqfI?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shrtj9Hmpz6omqpxj?backgroundColor=pink&viewControls=on',
  },
  // related to a single member
  {
    name: 'Prescription',
    icon: <Clipboard />,
    rootUrl:
      'https://airtable.com/embed/shrJJPowmXuMD3lwD?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shr5DLzCIdn8p9iEQ?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'HMP',
    icon: <List />,
    rootUrl:
      'https://airtable.com/embed/shrTQVb2Z78fziamV?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shrwGPaLmlMOohQFi?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Conditions',
    icon: <Thermometer />,
    rootUrl:
      'https://airtable.com/embed/shr1IJ9aQ9QhE8O9I?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shr3MFW4g3UU5WK9u?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Interventions',
    icon: <Key />,
    rootUrl:
      'https://airtable.com/embed/shr0y89LFGiiT4oHz?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shr3MFW4g3UU5WK9u?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Vitals',
    icon: <Heart />,
    rootUrl:
      'https://airtable.com/embed/shr0y89LFGiiT4oHz?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shrAKlrx0jgaAayjX?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Interventions Data Tracking',
    icon: <Activity />,
    rootUrl:
      'https://airtable.com/embed/shr0y89LFGiiT4oHz?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shro1UUHqX6TBnC5z?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Risk Rank View',
    icon: <AlertCircle />,
    rootUrl:
      'https://airtable.com/embed/shrbUlLVm043wUSJg?backgroundColor=green&viewControls=on',
    url_sandbox:
      'https://airtable.com/embed/shrsdYjJBIZt35Sup?backgroundColor=pink&viewControls=on',
  },
  {
    name: 'Population',
    icon: <Users />,
    subItems: [
      {
        name: 'Members',
        icon: <User />,
        rootUrl: `https://airtable.com/embed/${iframes.default.members}?viewControls=on`,
      },
      {
        name: 'NPS',
        icon: <TrendingUp />,
        rootUrl:
          'https://airtable.com/embed/shrKb4Z74A074oLaF?backgroundColor=green&viewControls=on',
      },
      {
        name: 'Interactions',
        icon: <Minimize />,
        component: <FlagForReview />,
      },
    ],
    url_sandbox: '',
  },
]

export default SidebarMenuItems
