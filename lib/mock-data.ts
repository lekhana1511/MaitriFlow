import type {
  Application,
  ComplianceItem,
  Scheme,
  Inspection,
  Notification,
  ChecklistRequirement,
  User,
  AuditLogEntry,
} from "./types";

export const currentUser: User = {
  id: "u-1001",
  username: "abc.industries",
  email: "contact@abcindustries.in",
  role: "entrepreneur",
  companyName: "ABC Industries",
};

export const officerUser: User = {
  id: "u-2001",
  username: "s.deshmukh",
  email: "s.deshmukh@mpcb.gov.in",
  role: "officer",
  department: "MPCB",
};

export const applications: Application[] = [
  {
    id: "app-1",
    applicationCode: "MF202601",
    approvalType: "Consent to Establish",
    department: "Industries",
    status: "approved",
    riskScore: "low",
    submittedAt: "2026-09-02T09:00:00Z",
    slaDeadline: "2026-10-02T00:00:00Z",
    currentStage: 3,
    industrySector: "Food Processing",
    documents: [
      { id: "d-1", name: "Building Plan.pdf", type: "building_plan", validated: true, uploadedAt: "2026-09-02T09:05:00Z" },
      { id: "d-2", name: "Udyam Certificate.pdf", type: "udyam_cert", validated: true, uploadedAt: "2026-09-02T09:06:00Z" },
    ],
  },
  {
    id: "app-2",
    applicationCode: "MF202602",
    approvalType: "Consent to Operate",
    department: "MPCB",
    status: "under_review",
    riskScore: "medium",
    submittedAt: "2026-09-08T11:20:00Z",
    slaDeadline: "2026-10-10T00:00:00Z",
    currentStage: 1,
    industrySector: "Food Processing",
    documents: [
      { id: "d-3", name: "Effluent Treatment Plan.pdf", type: "mpcb_consent", validated: true, uploadedAt: "2026-09-08T11:22:00Z" },
    ],
  },
  {
    id: "app-3",
    applicationCode: "MF202603",
    approvalType: "Fire NOC",
    department: "Fire",
    status: "inspection_scheduled",
    riskScore: "low",
    submittedAt: "2026-09-10T10:00:00Z",
    slaDeadline: "2026-10-15T00:00:00Z",
    currentStage: 2,
    industrySector: "Food Processing",
    documents: [
      { id: "d-4", name: "Fire Safety Layout.pdf", type: "fire_layout", validated: true, uploadedAt: "2026-09-10T10:03:00Z" },
    ],
  },
  {
    id: "app-4",
    applicationCode: "MF202604",
    approvalType: "Factory License",
    department: "Labour",
    status: "query_raised",
    riskScore: "high",
    submittedAt: "2026-09-06T14:15:00Z",
    slaDeadline: "2026-10-06T00:00:00Z",
    currentStage: 1,
    industrySector: "Food Processing",
    documents: [
      { id: "d-5", name: "Employee Roster.xlsx", type: "employee_roster", validated: false, validationErrors: ["Missing signatory stamp on page 2"], uploadedAt: "2026-09-06T14:18:00Z" },
    ],
    queryThread: [
      { id: "q-1", from: "department", message: "Please re-upload the employee roster with an authorized signatory stamp.", timestamp: "2026-09-20T09:30:00Z" },
    ],
  },
  {
    id: "app-5",
    applicationCode: "MF202605",
    approvalType: "Consent to Establish",
    department: "Industries",
    status: "approved",
    riskScore: "low",
    submittedAt: "2026-08-25T08:40:00Z",
    slaDeadline: "2026-09-25T00:00:00Z",
    currentStage: 3,
    industrySector: "Small Manufacturing",
    documents: [],
  },
];

export const complianceItems: ComplianceItem[] = [
  {
    id: "c-1",
    title: "MPCB Consent Renewal",
    regulationType: "pollution",
    deadline: "2026-11-15T00:00:00Z",
    status: "due_soon",
    documentsRequired: ["Renewed Consent Application", "Latest Effluent Test Report"],
  },
  {
    id: "c-2",
    title: "Fire Department NOC Renewal",
    regulationType: "fire",
    deadline: "2026-12-20T00:00:00Z",
    status: "pending",
    documentsRequired: ["Fire Safety Audit Report"],
  },
  {
    id: "c-3",
    title: "Factory License Renewal",
    regulationType: "factory",
    deadline: "2026-10-05T00:00:00Z",
    status: "overdue",
    documentsRequired: ["Updated Employee Roster", "Safety Committee Minutes"],
  },
  {
    id: "c-4",
    title: "Labour Welfare Fund Filing",
    regulationType: "labour",
    deadline: "2026-11-30T00:00:00Z",
    status: "compliant",
    documentsRequired: ["Quarterly Filing Receipt"],
  },
];

export const schemes: Scheme[] = [
  {
    id: "s-1",
    name: "Maharashtra Industrial Policy 2023",
    description: "Capital subsidy and interest subvention for eligible manufacturing units expanding within the state.",
    category: "Capital Subsidy",
    benefits: "Up to 25% capital subsidy, interest subvention for 5 years",
    confidenceScore: 92,
    missingCriteria: [],
    applicationLink: "https://maitri.maharashtra.gov.in",
  },
  {
    id: "s-2",
    name: "MSME Credit Linked Subsidy Scheme",
    description: "Subsidy on technology upgradation loans for registered MSMEs in eligible sectors.",
    category: "Credit Subsidy",
    benefits: "15% capital subsidy on institutional finance up to ₹1 crore",
    confidenceScore: 78,
    missingCriteria: ["Udyam registration date < 3 years"],
    applicationLink: "https://www.msme.gov.in",
  },
  {
    id: "s-3",
    name: "Green Manufacturing Incentive",
    description: "Incentive for units adopting certified pollution-control and energy-efficiency measures.",
    category: "Sustainability",
    benefits: "5% additional subsidy + fast-tracked MPCB clearance",
    confidenceScore: 64,
    missingCriteria: ["ISO 14001 certification", "Energy audit report"],
    applicationLink: "https://maitri.maharashtra.gov.in",
  },
  {
    id: "s-4",
    name: "PMEGP — Prime Minister's Employment Generation Programme",
    description: "Margin money subsidy for new micro-enterprises generating local employment.",
    category: "Employment",
    benefits: "15–35% margin money subsidy depending on category and location",
    confidenceScore: 41,
    missingCriteria: ["Unit must be a new enterprise (< 6 months)", "Project cost within eligible slab"],
    applicationLink: "https://www.kviconline.gov.in/pmegpeportal",
  },
];

export const inspections: Inspection[] = [
  {
    id: "i-1",
    department: "MPCB",
    date: "2026-10-12",
    time: "10:00 AM",
    location: "Plot 14, MIDC Industrial Area, Pune",
    clustered: true,
    clusterWith: ["Fire Department"],
  },
  {
    id: "i-2",
    department: "Fire Department",
    date: "2026-10-15",
    time: "11:00 AM",
    location: "Plot 14, MIDC Industrial Area, Pune",
    clustered: true,
    clusterWith: ["MPCB"],
  },
];

export const notifications: Notification[] = [
  { id: "n-1", message: "Your Consent to Establish (MF202601) has been approved.", type: "approval_status", read: false, createdAt: "2026-09-25T08:00:00Z" },
  { id: "n-2", message: "MPCB Consent Renewal is due in 20 days.", type: "compliance_deadline", read: false, createdAt: "2026-09-24T09:00:00Z" },
  { id: "n-3", message: "Query raised on Factory License application (MF202604).", type: "query", read: false, createdAt: "2026-09-20T09:30:00Z" },
  { id: "n-4", message: "You may be eligible for the Green Manufacturing Incentive.", type: "new_scheme", read: true, createdAt: "2026-09-18T12:00:00Z" },
  { id: "n-5", message: "Fire NOC inspection scheduled for 15 Oct 2026.", type: "approval_status", read: true, createdAt: "2026-09-15T10:00:00Z" },
];

export const checklistDatabase: Record<string, ChecklistRequirement[]> = {
  food_processing: [
    { approvalType: "Consent to Establish", department: "Industries", requiredDocuments: ["Company Incorporation Certificate", "Building Plan", "Land Ownership/Lease Document"], estimatedSlaDays: 21, description: "Required before construction begins on the industrial unit." },
    { approvalType: "Consent to Operate", department: "MPCB", requiredDocuments: ["Effluent Treatment Plan", "Water Usage Declaration"], estimatedSlaDays: 30, description: "Pollution control clearance required before commencing operations." },
    { approvalType: "Fire NOC", department: "Fire", requiredDocuments: ["Fire Safety Layout", "Fire Equipment Certification"], estimatedSlaDays: 15, description: "Fire safety clearance for the built structure." },
    { approvalType: "Factory License", department: "Labour", requiredDocuments: ["Employee Roster", "Safety Committee Formation Proof"], estimatedSlaDays: 20, description: "Required under the Factories Act for units with qualifying employee counts." },
    { approvalType: "FSSAI License", department: "Food Safety", requiredDocuments: ["Product List", "Water Quality Test Report"], estimatedSlaDays: 25, description: "Mandatory for any unit processing or packaging food products." },
  ],
  small_manufacturing: [
    { approvalType: "Consent to Establish", department: "Industries", requiredDocuments: ["Company Incorporation Certificate", "Building Plan"], estimatedSlaDays: 21, description: "Required before construction begins on the industrial unit." },
    { approvalType: "Consent to Operate", department: "MPCB", requiredDocuments: ["Effluent/Emission Declaration"], estimatedSlaDays: 25, description: "Pollution control clearance based on category of manufacturing." },
    { approvalType: "Fire NOC", department: "Fire", requiredDocuments: ["Fire Safety Layout"], estimatedSlaDays: 15, description: "Fire safety clearance for the built structure." },
    { approvalType: "Factory License", department: "Labour", requiredDocuments: ["Employee Roster"], estimatedSlaDays: 20, description: "Required under the Factories Act for units with qualifying employee counts." },
  ],
};

export const auditLogs: AuditLogEntry[] = [
  { id: "al-1", user: "abc.industries", action: "submit_application", resourceType: "application", timestamp: "2026-09-08T11:20:00Z", ipAddress: "103.21.244.10" },
  { id: "al-2", user: "s.deshmukh", action: "raise_query", resourceType: "application", timestamp: "2026-09-20T09:30:00Z", ipAddress: "10.4.2.8" },
  { id: "al-3", user: "admin.msins", action: "update_scheme", resourceType: "scheme", timestamp: "2026-09-18T15:00:00Z", ipAddress: "10.4.2.1" },
  { id: "al-4", user: "abc.industries", action: "upload_document", resourceType: "document", timestamp: "2026-09-06T14:18:00Z", ipAddress: "103.21.244.10" },
];

export function slaDaysRemaining(deadline: string): number {
  const now = new Date("2026-09-26T00:00:00Z").getTime();
  const dl = new Date(deadline).getTime();
  return Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
}
