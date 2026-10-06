import type { Employee, ActiveRequest, PolicyDocument } from './types';

export const employee: Employee = {
  name: 'Ananya Sharma',
  role: 'Senior Product Designer',
  department: 'Design',
  employeeId: 'PHX-0142',
  joinDate: 'March 2022',
  manager: 'Rajesh Krishnan',
  leaveBalances: [
    { type: 'Annual Leave', available: 18, total: 24, unit: 'days' },
    { type: 'Sick Leave', available: 10, total: 12, unit: 'days' },
    { type: 'Remote Work', available: 8, total: 12, unit: 'days' },
    { type: 'Comp Off', available: 3, total: 5, unit: 'days' },
  ],
};

export const activeRequests: ActiveRequest[] = [
  {
    id: 'req-001',
    type: 'annual_leave',
    typeLabel: 'Annual Leave',
    dates: ['Oct 14, 2026'],
    status: 'manager_review',
    submittedDate: 'Oct 1, 2026',
    reason: 'Family vacation to Goa',
  },
  {
    id: 'req-002',
    type: 'remote_work',
    typeLabel: 'Remote Work',
    dates: ['Oct 7, 2026'],
    status: 'approved',
    submittedDate: 'Sep 28, 2026',
    reason: 'Doctor appointment in the afternoon',
  },
];

export const policyDocuments: PolicyDocument[] = [
  {
    id: 'pol-annual',
    title: 'Annual Leave Policy',
    section: 'Section 4 — Annual Leave',
    updatedDate: 'Sep 15, 2026',
    relevantExcerpt:
      'Employees are entitled to 24 days of annual leave per calendar year. Leave requests must be submitted at least 5 working days in advance. A minimum balance of 3 days must be maintained for emergencies. Manager approval is required for all annual leave requests exceeding 2 consecutive days.',
    fullContent:
      'Employees are entitled to 24 days of annual leave per calendar year. Leave requests must be submitted at least 5 working days in advance. A minimum balance of 3 days must be maintained for emergencies. Manager approval is required for all annual leave requests exceeding 2 consecutive days. HR review is required for requests exceeding 5 consecutive days or overlapping with critical project milestones.',
    tags: ['annual_leave', 'vacation', 'planned_leave'],
  },
  {
    id: 'pol-remote',
    title: 'Remote Work Policy',
    section: 'Section 4 — Remote Work',
    updatedDate: 'Sep 20, 2026',
    relevantExcerpt:
      'Employees may work remotely up to 12 days per month with prior manager approval. Remote work requests should be submitted at least 2 working days in advance. Employees must remain available during standard working hours (9:30 AM — 6:30 PM IST) and maintain active communication on company channels.',
    fullContent:
      'Employees may work remotely up to 12 days per month with prior manager approval. Remote work requests should be submitted at least 2 working days in advance. Employees must remain available during standard working hours (9:30 AM — 6:30 PM IST) and maintain active communication on company channels. A stable internet connection (minimum 10 Mbps) is required. Remote work is not permitted on days with scheduled in-person meetings or team workshops.',
    tags: ['remote_work', 'work_from_home', 'wfh'],
  },
  {
    id: 'pol-sick',
    title: 'Sick Leave Policy',
    section: 'Section 5 — Sick Leave',
    updatedDate: 'Aug 30, 2026',
    relevantExcerpt:
      'Employees are entitled to 12 sick days per calendar year. For sick leave exceeding 3 consecutive days, a medical certificate is required. Sick leave can be applied retroactively within 2 working days of return. No prior approval is needed, but employees must notify their manager before 10:00 AM on the first day of absence.',
    fullContent:
      'Employees are entitled to 12 sick days per calendar year. For sick leave exceeding 3 consecutive days, a medical certificate is required. Sick leave can be applied retroactively within 2 working days of return. No prior approval is needed, but employees must notify their manager before 10:00 AM on the first day of absence. Extended sick leave beyond 5 days requires HR review.',
    tags: ['sick_leave', 'medical', 'health'],
  },
  {
    id: 'pol-comp',
    title: 'Compensatory Off Policy',
    section: 'Section 6 — Compensatory Off',
    updatedDate: 'Jul 12, 2026',
    relevantExcerpt:
      'Employees who work on weekends or public holidays are entitled to compensatory time off. Comp off must be claimed within 30 days of the overtime worked. A maximum of 5 comp off days can be accumulated per quarter. Manager approval is required.',
    fullContent:
      'Employees who work on weekends or public holidays are entitled to compensatory time off. Comp off must be claimed within 30 days of the overtime worked. A maximum of 5 comp off days can be accumulated per quarter. Manager approval is required. Comp off requests should reference the date of overtime worked.',
    tags: ['comp_off', 'compensatory', 'overtime'],
  },
];

export const timelineSteps = [
  { status: 'ai_understanding' as const, label: 'AI Understanding', description: 'Parsing your natural request' },
  { status: 'policy_check' as const, label: 'Policy Check', description: 'Verifying eligibility and compliance' },
  { status: 'manager_review' as const, label: 'Manager Review', description: 'Pending approval from your manager' },
  { status: 'hr_review' as const, label: 'HR Review', description: 'Final HR compliance check' },
  { status: 'approved' as const, label: 'Approved', description: 'Request confirmed and recorded' },
];
