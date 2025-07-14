-- Insert sample projects (H2 compatible)
INSERT INTO SBOM_PROJECTS (PROJECT_NAME, PROJECT_VERSION, PROJECT_DESCRIPTION, PROJECT_NAMESPACE, SCAN_DATE, SCAN_TOOL, SBOM_FORMAT, SBOM_VERSION, CREATED_AT, UPDATED_AT)
VALUES ('E-Commerce Website', '2.1.0', 'Main e-commerce platform', 'com.company.ecommerce', NOW(), 'Syft', 'SPDX', '2.3', NOW(), NOW());

INSERT INTO SBOM_PROJECTS (PROJECT_NAME, PROJECT_VERSION, PROJECT_DESCRIPTION, PROJECT_NAMESPACE, SCAN_DATE, SCAN_TOOL, SBOM_FORMAT, SBOM_VERSION, CREATED_AT, UPDATED_AT)
VALUES ('Mobile App Backend', '1.5.3', 'REST API for mobile application', 'com.company.mobile.api', NOW(), 'CycloneDX', 'CycloneDX', '1.4', NOW(), NOW());

INSERT INTO SBOM_PROJECTS (PROJECT_NAME, PROJECT_VERSION, PROJECT_DESCRIPTION, PROJECT_NAMESPACE, SCAN_DATE, SCAN_TOOL, SBOM_FORMAT, SBOM_VERSION, CREATED_AT, UPDATED_AT)
VALUES ('Data Analytics Platform', '3.0.1', 'Big data processing and analytics', 'com.company.analytics', NOW(), 'Syft', 'SPDX', '2.3', NOW(), NOW());

-- Insert sample components
INSERT INTO SBOM_COMPONENTS (PROJECT_ID, COMPONENT_NAME, COMPONENT_VERSION, COMPONENT_TYPE, PACKAGE_MANAGER, PACKAGE_URL, DOWNLOAD_LOCATION, HOMEPAGE, SUPPLIER, LICENSE_CONCLUDED, LICENSE_DECLARED, CREATED_AT, UPDATED_AT)
VALUES (1, 'spring-boot-starter-web', '3.2.0', 'library', 'maven', 'pkg:maven/org.springframework.boot/spring-boot-starter-web@3.2.0', 'https://repo1.maven.org/maven2/', 'https://spring.io/projects/spring-boot', 'Spring Team', 'Apache-2.0', 'Apache-2.0', NOW(), NOW());

INSERT INTO SBOM_COMPONENTS (PROJECT_ID, COMPONENT_NAME, COMPONENT_VERSION, COMPONENT_TYPE, PACKAGE_MANAGER, PACKAGE_URL, DOWNLOAD_LOCATION, HOMEPAGE, SUPPLIER, LICENSE_CONCLUDED, LICENSE_DECLARED, CREATED_AT, UPDATED_AT)
VALUES (1, 'jackson-databind', '2.15.2', 'library', 'maven', 'pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.15.2', 'https://repo1.maven.org/maven2/', 'https://github.com/FasterXML/jackson-databind', 'FasterXML', 'Apache-2.0', 'Apache-2.0', NOW(), NOW());

INSERT INTO SBOM_COMPONENTS (PROJECT_ID, COMPONENT_NAME, COMPONENT_VERSION, COMPONENT_TYPE, PACKAGE_MANAGER, PACKAGE_URL, DOWNLOAD_LOCATION, HOMEPAGE, SUPPLIER, LICENSE_CONCLUDED, LICENSE_DECLARED, CREATED_AT, UPDATED_AT)
VALUES (2, 'express', '4.18.2', 'library', 'npm', 'pkg:npm/express@4.18.2', 'https://npmjs.com/', 'https://expressjs.com/', 'Express Team', 'MIT', 'MIT', NOW(), NOW());

INSERT INTO SBOM_COMPONENTS (PROJECT_ID, COMPONENT_NAME, COMPONENT_VERSION, COMPONENT_TYPE, PACKAGE_MANAGER, PACKAGE_URL, DOWNLOAD_LOCATION, HOMEPAGE, SUPPLIER, LICENSE_CONCLUDED, LICENSE_DECLARED, CREATED_AT, UPDATED_AT)
VALUES (2, 'lodash', '4.17.20', 'library', 'npm', 'pkg:npm/lodash@4.17.20', 'https://npmjs.com/', 'https://lodash.com/', 'John-David Dalton', 'MIT', 'MIT', NOW(), NOW());

INSERT INTO SBOM_COMPONENTS (PROJECT_ID, COMPONENT_NAME, COMPONENT_VERSION, COMPONENT_TYPE, PACKAGE_MANAGER, PACKAGE_URL, DOWNLOAD_LOCATION, HOMEPAGE, SUPPLIER, LICENSE_CONCLUDED, LICENSE_DECLARED, CREATED_AT, UPDATED_AT)
VALUES (3, 'pandas', '1.5.2', 'library', 'pip', 'pkg:pypi/pandas@1.5.2', 'https://pypi.org/', 'https://pandas.pydata.org/', 'Pandas Team', 'BSD-3-Clause', 'BSD-3-Clause', NOW(), NOW());

-- Insert sample vulnerabilities
INSERT INTO SBOM_VULNERABILITIES (COMPONENT_ID, CVE_ID, VULNERABILITY_NAME, DESCRIPTION, SEVERITY, CVSS_SCORE, CWE_ID, REFERENCE_URL, PUBLISHED_DATE, AFFECTED_VERSION, FIXED_VERSION, STATUS, CREATED_AT, UPDATED_AT)
VALUES (4, 'CVE-2021-23337', 'Prototype Pollution in lodash', 'Lodash versions prior to 4.17.21 are vulnerable to Command Injection via the template function.', 'HIGH', 7.2, 'CWE-1321', 'https://nvd.nist.gov/vuln/detail/CVE-2021-23337', DATEADD('DAY', -30, NOW()), '< 4.17.21', '4.17.21', 'OPEN', NOW(), NOW());

INSERT INTO SBOM_VULNERABILITIES (COMPONENT_ID, CVE_ID, VULNERABILITY_NAME, DESCRIPTION, SEVERITY, CVSS_SCORE, CWE_ID, REFERENCE_URL, PUBLISHED_DATE, AFFECTED_VERSION, FIXED_VERSION, STATUS, CREATED_AT, UPDATED_AT)
VALUES (2, 'CVE-2022-42003', 'Jackson Databind Deserialization', 'Jackson-databind vulnerable to denial of service via a large depth of nested objects.', 'HIGH', 7.5, 'CWE-502', 'https://nvd.nist.gov/vuln/detail/CVE-2022-42003', DATEADD('DAY', -45, NOW()), '< 2.14.0', '2.14.0', 'RESOLVED', NOW(), NOW());