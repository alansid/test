package com.sbom.service;

import com.sbom.dto.ComponentDto;
import com.sbom.dto.VulnerabilityDto;
import com.sbom.entity.Component;
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
public class ComponentService {
    
    private final ComponentRepository componentRepository;
    private final VulnerabilityRepository vulnerabilityRepository;
    
    public Page<ComponentDto> getComponentsByProject(Long projectId, Pageable pageable) {
        Page<Component> components = componentRepository.findByProjectProjectId(projectId, pageable);
        return components.map(this::convertToDto);
    }
    
    public Page<ComponentDto> searchComponentsByName(String componentName, Pageable pageable) {
        Page<Component> components = componentRepository.findByComponentNameContaining(componentName, pageable);
        return components.map(this::convertToDto);
    }
    
    public Optional<ComponentDto> getComponentById(Long componentId) {
        return componentRepository.findById(componentId)
                .map(this::convertToDtoWithVulnerabilities);
    }
    
    public List<String> getDistinctComponentNames() {
        return componentRepository.findDistinctComponentNames();
    }
    
    public List<String> getDistinctPackageManagers() {
        return componentRepository.findDistinctPackageManagers();
    }
    
    public List<ComponentDto> findComponentsByNameAndVersion(String componentName, String version) {
        List<Component> components = componentRepository.findByComponentNameAndVersion(componentName, version);
        return components.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private ComponentDto convertToDto(Component component) {
        ComponentDto dto = new ComponentDto();
        dto.setComponentId(component.getComponentId());
        dto.setProjectId(component.getProject().getProjectId());
        dto.setProjectName(component.getProject().getProjectName());
        dto.setComponentName(component.getComponentName());
        dto.setComponentVersion(component.getComponentVersion());
        dto.setComponentType(component.getComponentType());
        dto.setPackageManager(component.getPackageManager());
        dto.setPackageUrl(component.getPackageUrl());
        dto.setDownloadLocation(component.getDownloadLocation());
        dto.setHomepage(component.getHomepage());
        dto.setSupplier(component.getSupplier());
        dto.setCopyrightText(component.getCopyrightText());
        dto.setFileHash(component.getFileHash());
        dto.setHashAlgorithm(component.getHashAlgorithm());
        dto.setLicenseConcluded(component.getLicenseConcluded());
        dto.setLicenseDeclared(component.getLicenseDeclared());
        dto.setCreatedAt(component.getCreatedAt());
        dto.setUpdatedAt(component.getUpdatedAt());
        
        // Calculate vulnerability statistics
        List<VulnerabilityDto> vulnerabilities = vulnerabilityRepository
                .findByComponentComponentId(component.getComponentId())
                .stream()
                .map(this::convertVulnerabilityToDto)
                .collect(Collectors.toList());
        
        dto.setVulnerabilityCount(vulnerabilities.size());
        dto.setHighestSeverity(getHighestSeverity(vulnerabilities));
        
        return dto;
    }
    
    private ComponentDto convertToDtoWithVulnerabilities(Component component) {
        ComponentDto dto = convertToDto(component);
        
        List<VulnerabilityDto> vulnerabilities = vulnerabilityRepository
                .findByComponentComponentId(component.getComponentId())
                .stream()
                .map(this::convertVulnerabilityToDto)
                .collect(Collectors.toList());
        
        dto.setVulnerabilities(vulnerabilities);
        return dto;
    }
    
    private VulnerabilityDto convertVulnerabilityToDto(com.sbom.entity.Vulnerability vulnerability) {
        VulnerabilityDto dto = new VulnerabilityDto();
        dto.setVulnerabilityId(vulnerability.getVulnerabilityId());
        dto.setComponentId(vulnerability.getComponent().getComponentId());
        dto.setComponentName(vulnerability.getComponent().getComponentName());
        dto.setComponentVersion(vulnerability.getComponent().getComponentVersion());
        dto.setCveId(vulnerability.getCveId());
        dto.setVulnerabilityName(vulnerability.getVulnerabilityName());
        dto.setDescription(vulnerability.getDescription());
        dto.setSeverity(vulnerability.getSeverity());
        dto.setCvssScore(vulnerability.getCvssScore());
        dto.setCvssVector(vulnerability.getCvssVector());
        dto.setCweId(vulnerability.getCweId());
        dto.setReferenceUrl(vulnerability.getReferenceUrl());
        dto.setPublishedDate(vulnerability.getPublishedDate());
        dto.setLastModifiedDate(vulnerability.getLastModifiedDate());
        dto.setAffectedVersion(vulnerability.getAffectedVersion());
        dto.setFixedVersion(vulnerability.getFixedVersion());
        dto.setStatus(vulnerability.getStatus());
        dto.setCreatedAt(vulnerability.getCreatedAt());
        dto.setUpdatedAt(vulnerability.getUpdatedAt());
        return dto;
    }
    
    private String getHighestSeverity(List<VulnerabilityDto> vulnerabilities) {
        if (vulnerabilities.isEmpty()) {
            return null;
        }
        
        for (String severity : List.of("CRITICAL", "HIGH", "MEDIUM", "LOW")) {
            if (vulnerabilities.stream().anyMatch(v -> severity.equals(v.getSeverity()))) {
                return severity;
            }
        }
        return "UNKNOWN";
    }
}