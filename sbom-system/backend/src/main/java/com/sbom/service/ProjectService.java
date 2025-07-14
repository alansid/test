package com.sbom.service;

import com.sbom.dto.ProjectDto;
import com.sbom.entity.Project;
import com.sbom.repository.ProjectRepository;
import com.sbom.repository.ComponentRepository;
import com.sbom.repository.VulnerabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ComponentRepository componentRepository;
    private final VulnerabilityRepository vulnerabilityRepository;
    
    public Page<ProjectDto> getAllProjects(Pageable pageable) {
        Page<Project> projects = projectRepository.findAllOrderByScanDateDesc(pageable);
        return projects.map(this::convertToDto);
    }
    
    public Page<ProjectDto> searchProjectsByName(String projectName, Pageable pageable) {
        Page<Project> projects = projectRepository.findByProjectNameContainingIgnoreCase(projectName, pageable);
        return projects.map(this::convertToDto);
    }
    
    public Optional<ProjectDto> getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .map(this::convertToDtoWithComponents);
    }
    
    public List<ProjectDto> findProjectsByComponentName(String componentName) {
        List<Project> projects = projectRepository.findProjectsByComponentName(componentName);
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private ProjectDto convertToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setProjectId(project.getProjectId());
        dto.setProjectName(project.getProjectName());
        dto.setProjectVersion(project.getProjectVersion());
        dto.setProjectDescription(project.getProjectDescription());
        dto.setProjectNamespace(project.getProjectNamespace());
        dto.setScanDate(project.getScanDate());
        dto.setScanTool(project.getScanTool());
        dto.setSbomFormat(project.getSbomFormat());
        dto.setSbomVersion(project.getSbomVersion());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        
        // Calculate statistics
        Long totalComponents = componentRepository.countByProjectProjectId(project.getProjectId());
        dto.setTotalComponents(totalComponents.intValue());
        
        Long criticalVulns = vulnerabilityRepository.countVulnerabilitiesByProjectAndSeverity(project.getProjectId(), "CRITICAL");
        Long highVulns = vulnerabilityRepository.countVulnerabilitiesByProjectAndSeverity(project.getProjectId(), "HIGH");
        Long mediumVulns = vulnerabilityRepository.countVulnerabilitiesByProjectAndSeverity(project.getProjectId(), "MEDIUM");
        Long lowVulns = vulnerabilityRepository.countVulnerabilitiesByProjectAndSeverity(project.getProjectId(), "LOW");
        
        dto.setCriticalVulnerabilities(criticalVulns != null ? criticalVulns.intValue() : 0);
        dto.setHighVulnerabilities(highVulns != null ? highVulns.intValue() : 0);
        dto.setMediumVulnerabilities(mediumVulns != null ? mediumVulns.intValue() : 0);
        dto.setLowVulnerabilities(lowVulns != null ? lowVulns.intValue() : 0);
        
        long totalVulns = (criticalVulns != null ? criticalVulns : 0L) + 
                         (highVulns != null ? highVulns : 0L) + 
                         (mediumVulns != null ? mediumVulns : 0L) + 
                         (lowVulns != null ? lowVulns : 0L);
        dto.setTotalVulnerabilities((int) totalVulns);
        
        return dto;
    }
    
    private ProjectDto convertToDtoWithComponents(Project project) {
        ProjectDto dto = convertToDto(project);
        // Components will be loaded lazily through ComponentService if needed
        return dto;
    }
}