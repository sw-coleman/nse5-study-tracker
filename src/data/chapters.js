export const EXAM_DATE = new Date('2026-07-07T00:00:00');

export const FORTISASE_CHAPTERS = [
  { id: 'fs-01', num: '01', title: 'Introduction to SASE and FortiSASE', week: 1 },
  { id: 'fs-02', num: '02', title: 'Deployment Fundamentals', week: 1 },
  { id: 'fs-03', num: '03', title: 'SIA and SSA', week: 2 },
  { id: 'fs-04', num: '04', title: 'Basic Security and Endpoint Profiles', week: 3 },
  { id: 'fs-05', num: '05', title: 'Monitoring and Reporting', week: 3 },
];

export const SDWAN_CHAPTERS = [
  { id: 'sdw-01', num: '01', title: 'Introduction', week: 1 },
  { id: 'sdw-02', num: '02', title: 'Members, Zones and Performance SLAs', week: 1 },
  { id: 'sdw-03', num: '03', title: 'Define and Configure Rules', week: 2 },
  { id: 'sdw-04', num: '04', title: 'Rule Strategies in Action', week: 2 },
  { id: 'sdw-05', num: '05', title: 'Routing and Sessions', week: 2 },
  { id: 'sdw-06', num: '06', title: 'Centralized Management', week: 3 },
  { id: 'sdw-07', num: '07', title: 'Troubleshooting and Redundancy', week: 3, appendix: true },
];

export const ALL_CHAPTERS = [...FORTISASE_CHAPTERS, ...SDWAN_CHAPTERS];

export const WEEK_RANGES = {
  1: 'Jun 16–22',
  2: 'Jun 23–29',
  3: 'Jun 30–Jul 6',
};

export const CHECKBOXES = [
  'Video watched',
  'PDF drilled with Claude',
  'Podcast generated & listened',
  'Weak areas noted & revisited',
];

// index 0 unused; 1=red → 5=green
export const CONF_COLORS = ['', '#c0392b', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
export const CONF_SHADOWS = ['', 'rgba(192,57,43,0.5)', 'rgba(230,126,34,0.5)', 'rgba(241,196,15,0.5)', 'rgba(46,204,113,0.5)', 'rgba(39,174,96,0.5)'];
