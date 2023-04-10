import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    // {
    //   group: 'Base',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/outline/chart-pie.svg',
    //       label: 'Dashboard',
    //       route: '/dashboard',
    //       children: [{ label: 'Nfts', route: '/dashboard/nfts' }],
    //     },
    //     {
    //       icon: 'assets/icons/outline/lock-closed.svg',
    //       label: 'Auth',
    //       route: '/auth',
    //       children: [
    //         { label: 'Sign up', route: '/auth/sign-up' },
    //         { label: 'Sign in', route: '/auth/sign-in' },
    //         { label: 'Forgot Password', route: '/auth/forgot-password' },
    //         { label: 'New Password', route: '/auth/new-password' },
    //         { label: 'Two Steps', route: '/auth/two-steps' },
    //       ],
    //     },
    //   ],
    // },
    {
      group: 'Application',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Research',
          route: '/download',
        },
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Account',
          route: '/users',
        },
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Content',
          route: '/content',
        },
      ],
    },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
    //   ],
    // },
  ];
}
