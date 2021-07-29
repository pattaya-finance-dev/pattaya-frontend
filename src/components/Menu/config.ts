import { MenuEntry } from '@pattayaswap-dev-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    initialOpenState: true,
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Referrals',
    icon: 'ReferralIcon',
    href: '/referrals',
  },
  {
    label: 'Audits',
    icon: 'ShieldIcon',
    href: 'https://docs.pantherswap.com/security/audits',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/pantherswap',
      },
      {
        label: 'Docs',
        href: 'https://docs.pantherswap.com',
      },
      {
        label: 'Roadmap',
        href: 'https://docs.pantherswap.com/roadmap',
      },
      {
        label: 'Blog',
        href: 'https://pantherswap.medium.com',
      },
      {
        label: 'Voting',
        href: 'https://voting.pantherswap.com/',
      },
    ],
  },
]

export default config
