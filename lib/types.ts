export type Role = "entrepreneur" | "officer" | "inspector" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  companyName?: string;
  department?: string;
}

export type ApprovalStatus =
  | "submitted"
  | "under_review"
  | "inspection_scheduled"
  | "query_raised"
  | "approved"
  | "rejected";

export type RiskLevel = "low" | "medium" | "high";

export interface Application {
  id: string;
  applicationCode: string; // e.g. MF202601
  approvalType: string; // MPCB, Fire, Labour, Industries
  department: string;
  status: ApprovalStatus;
  riskScore: RiskLevel;
  submittedAt: string; // ISO date
  slaDeadline: string; // ISO date
  currentStage: number; // 0=submitted,1=review,2=inspection,3=approval
  industrySector: string;
  documents: DocumentRef[];
  queryThread?: QueryMessage[];
}

export interface QueryMessage {
  id: string;
  from: "department" | "applicant";
  message: string;
  timestamp: string;
}

export interface DocumentRef {
  id: string;
  name: string;
  type: string;
  validated: boolean;
  validationErrors?: string[];
  uploadedAt: string;
}

export type ComplianceStatus = "compliant" | "due_soon" | "overdue" | "pending";

export interface ComplianceItem {
  id: string;
  title: string;
  regulationType: "pollution" | "fire" | "labour" | "factory";
  deadline: string;
  status: ComplianceStatus;
  documentsRequired: string[];
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  benefits: string;
  confidenceScore: number; // 0-100
  missingCriteria: string[];
  applicationLink: string;
}

export interface Inspection {
  id: string;
  department: string;
  date: string;
  time: string;
  location: string;
  clustered: boolean;
  clusterWith?: string[];
}

export interface Notification {
  id: string;
  message: string;
  type: "approval_status" | "compliance_deadline" | "new_scheme" | "query";
  read: boolean;
  createdAt: string;
}

export interface ChecklistRequirement {
  approvalType: string;
  department: string;
  requiredDocuments: string[];
  estimatedSlaDays: number;
  description: string;
}

export interface ChatCitation {
  source: string;
  url: string;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: ChatCitation[];
  confidence?: number;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  resourceType: string;
  timestamp: string;
  ipAddress: string;
}
