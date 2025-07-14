package com.sbom.repository;

import com.sbom.entity.Component;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {
    
    List<Component> findByProjectProjectId(Long projectId);
    
    Page<Component> findByProjectProjectId(Long projectId, Pageable pageable);
    
    @Query("SELECT c FROM Component c WHERE c.componentName LIKE %:componentName%")
    Page<Component> findByComponentNameContaining(@Param("componentName") String componentName, Pageable pageable);
    
    @Query("SELECT c FROM Component c WHERE c.componentName LIKE %:componentName% AND c.componentVersion LIKE %:version%")
    List<Component> findByComponentNameAndVersion(@Param("componentName") String componentName, 
                                                 @Param("version") String version);
    
    @Query("SELECT DISTINCT c.componentName FROM Component c ORDER BY c.componentName")
    List<String> findDistinctComponentNames();
    
    @Query("SELECT DISTINCT c.packageManager FROM Component c WHERE c.packageManager IS NOT NULL ORDER BY c.packageManager")
    List<String> findDistinctPackageManagers();
    
    @Query("SELECT c FROM Component c JOIN c.vulnerabilities v WHERE v.severity = :severity")
    List<Component> findComponentsWithVulnerabilityBySeverity(@Param("severity") String severity);
    
    Long countByProjectProjectId(Long projectId);
}