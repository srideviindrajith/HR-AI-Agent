export type RequestType = 'annual_leave' | 'sick_leave' | 'remote_work' | 'work_from_home' | 'comp_off';

export type RequestStatus =
  | 'ai_understanding'
  | 'policy_check'
  | 'manager_review'
  | 'hr_review'
  | 'approved'
  | 'rejected';

export interface ParsedRequest {
  type: RequestType;
  typeLabel: string;
  dates: string[];
  reason: string;
  rawInput: string;
  confidence: number;
}

export interface LeaveBalance {
  type: string;
  available: number;
  total: number;
  unit: string;
}

export interface ActiveRequest {
  id: string;
  type: string;
  typeLabel: string;
  dates: string[];
  status: RequestStatus;
  submittedDate: string;
  reason: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  section: string;
  updatedDate: string;
  relevantExcerpt: string;
  fullContent: string;
  tags: string[];
}

export interface Employee {
  name: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  manager: string;
  leaveBalances: LeaveBalance[];
}

export interface TimelineStep {
  status: RequestStatus;
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
}
