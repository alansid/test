export interface Project {
  projectId: number;
  projectName: string;
  projectVersion?: string;
  projectDescription?: string;
  projectNamespace?: string;
  scanDate?: Date;
  scanTool?: string;
  sbomFormat?: string;
  sbomVersion?: string;
  createdAt?: Date;
  updatedAt?: Date;
  components?: Component[];
  
  // Statistics
  totalComponents?: number;
  totalVulnerabilities?: number;
  criticalVulnerabilities?: number;
  highVulnerabilities?: number;
  mediumVulnerabilities?: number;
  lowVulnerabilities?: number;
}

export interface Component {
  componentId: number;
  projectId: number;
  projectName?: string;
  componentName: string;
  componentVersion?: string;
  componentType?: string;
  packageManager?: string;
  packageUrl?: string;
  downloadLocation?: string;
  homepage?: string;
  supplier?: string;
  copyrightText?: string;
  fileHash?: string;
  hashAlgorithm?: string;
  licenseConcluded?: string;
  licenseDeclared?: string;
  createdAt?: Date;
  updatedAt?: Date;
  vulnerabilities?: Vulnerability[];
  
  // Statistics
  vulnerabilityCount?: number;
  highestSeverity?: string;
}

export interface Vulnerability {
  vulnerabilityId: number;
  componentId: number;
  componentName?: string;
  componentVersion?: string;
  cveId?: string;
  vulnerabilityName?: string;
  description?: string;
  severity?: string;
  cvssScore?: number;
  cvssVector?: string;
  cweId?: string;
  referenceUrl?: string;
  publishedDate?: Date;
  lastModifiedDate?: Date;
  affectedVersion?: string;
  fixedVersion?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}