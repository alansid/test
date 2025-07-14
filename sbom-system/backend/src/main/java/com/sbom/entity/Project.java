package com.sbom.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "SBOM_PROJECTS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROJECT_ID")
    private Long projectId;
    
    @Column(name = "PROJECT_NAME", nullable = false, length = 255)
    private String projectName;
    
    @Column(name = "PROJECT_VERSION", length = 100)
    private String projectVersion;
    
    @Column(name = "PROJECT_DESCRIPTION", length = 1000)
    private String projectDescription;
    
    @Column(name = "PROJECT_NAMESPACE", length = 500)
    private String projectNamespace;
    
    @Column(name = "SCAN_DATE")
    private LocalDateTime scanDate;
    
    @Column(name = "SCAN_TOOL", length = 100)
    private String scanTool;
    
    @Column(name = "SBOM_FORMAT", length = 50)
    private String sbomFormat; // SPDX, CycloneDX, etc.
    
    @Column(name = "SBOM_VERSION", length = 20)
    private String sbomVersion;
    
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
    
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Component> components;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}