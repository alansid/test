package com.sbom.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "SBOM_COMPONENTS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Component {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMPONENT_ID")
    private Long componentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID", nullable = false)
    private Project project;
    
    @Column(name = "COMPONENT_NAME", nullable = false, length = 255)
    private String componentName;
    
    @Column(name = "COMPONENT_VERSION", length = 100)
    private String componentVersion;
    
    @Column(name = "COMPONENT_TYPE", length = 50)
    private String componentType; // library, framework, application, etc.
    
    @Column(name = "PACKAGE_MANAGER", length = 50)
    private String packageManager; // npm, maven, pip, etc.
    
    @Column(name = "PACKAGE_URL", length = 500)
    private String packageUrl; // PURL format
    
    @Column(name = "DOWNLOAD_LOCATION", length = 500)
    private String downloadLocation;
    
    @Column(name = "HOMEPAGE", length = 500)
    private String homepage;
    
    @Column(name = "SUPPLIER", length = 255)
    private String supplier;
    
    @Column(name = "COPYRIGHT_TEXT", length = 1000)
    private String copyrightText;
    
    @Column(name = "FILE_HASH", length = 100)
    private String fileHash;
    
    @Column(name = "HASH_ALGORITHM", length = 20)
    private String hashAlgorithm; // SHA1, SHA256, etc.
    
    @Column(name = "LICENSE_CONCLUDED", length = 255)
    private String licenseConcluded;
    
    @Column(name = "LICENSE_DECLARED", length = 255)
    private String licenseDeclared;
    
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
    
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "component", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vulnerability> vulnerabilities;
    
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