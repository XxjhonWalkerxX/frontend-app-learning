import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  dashboard: {
    id: 'header.menu.dashboard',
    defaultMessage: 'Dashboard',
    description: 'Link to the learner dashboard',
  },
  courses: {
    id: 'header.menu.courses',
    defaultMessage: 'Courses',
    description: 'Link to courses',
  },
  programs: {
    id: 'header.menu.programs',
    defaultMessage: 'Programs', 
    description: 'Link to programs',
  },
  profile: {
    id: 'header.menu.profile',
    defaultMessage: 'Profile',
    description: 'Link to user profile',
  },
  account: {
    id: 'header.menu.account',
    defaultMessage: 'Account',
    description: 'Link to account settings',
  },
  signOut: {
    id: 'header.menu.signOut',
    defaultMessage: 'Sign Out',
    description: 'Sign out link',
  },
});

export default messages;
