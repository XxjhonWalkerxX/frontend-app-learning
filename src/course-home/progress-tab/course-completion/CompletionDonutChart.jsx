import React from 'react';
import { useSelector } from 'react-redux';
import {
  getLocale, injectIntl, intlShape, isRtl,
} from '@edx/frontend-platform/i18n';
import { useModel } from '../../../generic/model-store';

import CompleteDonutSegment from './CompleteDonutSegment';
import IncompleteDonutSegment from './IncompleteDonutSegment';
import LockedDonutSegment from './LockedDonutSegment';
import messages from './messages';

const CompletionDonutChart = ({ intl }) => {
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    completionSummary: {
      completeCount,
      incompleteCount,
      lockedCount,
    },
  } = useModel('progress', courseId);

  const numTotalUnits = completeCount + incompleteCount + lockedCount;
  const completePercentage = completeCount ? Number(((completeCount / numTotalUnits) * 100).toFixed(0)) : 0;
  const lockedPercentage = lockedCount ? Number(((lockedCount / numTotalUnits) * 100).toFixed(0)) : 0;
  const incompletePercentage = 100 - completePercentage - lockedPercentage;

  const isLocaleRtl = isRtl(getLocale());

  return (
    <>
      <div className="emi-progress-container">
        {/* Diseño Principal - Circular Progress con glassmorphism */}
        <div className="emi-circular-progress">
          <div className="progress-circle">
            <svg className="progress-ring" width="160" height="160">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#a86a2c" />
                  <stop offset="100%" stopColor="#5a122c" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background circle */}
              <circle
                className="progress-bg"
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              
              {/* Progress circle */}
              <circle
                className="progress-bar"
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${completePercentage * 4.4} 440`}
                transform="rotate(-90 80 80)"
                filter="url(#glow)"
              />
            </svg>
            
            {/* Center content */}
            <div className="progress-content">
              <div className="progress-percentage">{completePercentage}%</div>
              <div className="progress-label">{intl.formatMessage(messages.donutLabel)}</div>
              <div className="progress-stats">
                <span className="completed-units">{completeCount}</span>
                <span className="total-units">/ {numTotalUnits}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="progress-stats-cards">
          <div className="stat-card completed">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{completeCount}</div>
              <div className="stat-label">Completado</div>
            </div>
          </div>
          
          <div className="stat-card incomplete">
            <div className="stat-icon">○</div>
            <div className="stat-info">
              <div className="stat-number">{incompleteCount}</div>
              <div className="stat-label">Pendiente</div>
            </div>
          </div>
          
          {lockedCount > 0 && (
            <div className="stat-card locked">
              <div className="stat-icon">🔒</div>
              <div className="stat-info">
                <div className="stat-number">{lockedCount}</div>
                <div className="stat-label">Bloqueado</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sr-only">
        {intl.formatMessage(messages.percentComplete, { percent: completePercentage })}
        {intl.formatMessage(messages.percentIncomplete, { percent: incompletePercentage })}
        {lockedPercentage > 0 && (
          <>
            {intl.formatMessage(messages.percentLocked, { percent: lockedPercentage })}
          </>
        )}
      </div>
    </>
  );
};

CompletionDonutChart.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CompletionDonutChart);
