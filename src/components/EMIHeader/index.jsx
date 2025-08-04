import React from 'react';
import { useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Header } from '@edx/frontend-component-header';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import messages from './messages';

const EMIHeader = () => {
  const intl = useIntl();
  const { courseId } = useSelector(state => state.courseHome || {});
  const authenticatedUser = getAuthenticatedUser();
  
  // Menu items principales para EMI
  const mainMenuItems = [
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages.dashboard),
    },
    {
      type: 'item', 
      href: `${getConfig().LMS_BASE_URL}/courses`,
      content: intl.formatMessage(messages.courses),
    },
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/programs`,
      content: intl.formatMessage(messages.programs),
    },
  ];

  // Menu items secundarios
  const secondaryMenuItems = [
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/u/${authenticatedUser?.username}`,
      content: intl.formatMessage(messages.profile),
    },
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/account/settings`,
      content: intl.formatMessage(messages.account),
    },
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/logout`,
      content: intl.formatMessage(messages.signOut),
    },
  ];

  return (
    <Header
      logo={getConfig().LOGO_URL}
      logoAltText="EMI"
      logoDestination={`${getConfig().LMS_BASE_URL}/dashboard`}
      loggedIn={!!authenticatedUser}
      username={authenticatedUser?.username}
      avatar={authenticatedUser?.avatar}
      mainMenuItems={mainMenuItems}
      secondaryMenuItems={secondaryMenuItems}
      courseId={courseId}
      className="emi-header"
    />
  );
};

export default EMIHeader;
