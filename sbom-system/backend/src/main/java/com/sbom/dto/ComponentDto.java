package com.sbom.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponentDto {
    private Long componentId;
    private Long projectId;
    private String projectName;
    private String componentName;
    private String componentVersion;
    private String componentType;
    private String packageManager;
    private String packageUrl;
    private String downloadLocation;
    private String homepage;
    private String supplier;
    private String copyrightText;
    private String fileHash;
    private String hashAlgorithm;
    private String licenseConcluded;
    private String licenseDeclared;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VulnerabilityDto> vulnerabilities;
    
    // Statistics
    private Integer vulnerabilityCount;
    private String highestSeverity;
}