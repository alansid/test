package com.sbom.repository;

import com.sbom.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    Page<Project> findByProjectNameContainingIgnoreCase(String projectName, Pageable pageable);
    
    List<Project> findByProjectNameContainingIgnoreCaseOrderByScanDateDesc(String projectName);
    
    @Query("SELECT p FROM Project p WHERE p.scanDate BETWEEN :startDate AND :endDate ORDER BY p.scanDate DESC")
    List<Project> findProjectsByScanDateRange(@Param("startDate") LocalDateTime startDate, 
                                             @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT DISTINCT p FROM Project p JOIN p.components c WHERE c.componentName LIKE %:componentName%")
    List<Project> findProjectsByComponentName(@Param("componentName") String componentName);
    
    @Query("SELECT p FROM Project p ORDER BY p.scanDate DESC")
    Page<Project> findAllOrderByScanDateDesc(Pageable pageable);
}