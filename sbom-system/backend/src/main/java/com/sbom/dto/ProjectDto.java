package com.sbom.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long projectId;
    private String projectName;
    private String projectVersion;
    private String projectDescription;
    private String projectNamespace;
    private LocalDateTime scanDate;
    private String scanTool;
    private String sbomFormat;
    private String sbomVersion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ComponentDto> components;
    
    // Statistics
    private Integer totalComponents;
    private Integer totalVulnerabilities;
    private Integer criticalVulnerabilities;
    private Integer highVulnerabilities;
    private Integer mediumVulnerabilities;
    private Integer lowVulnerabilities;
}