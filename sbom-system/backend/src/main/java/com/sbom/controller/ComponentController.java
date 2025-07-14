package com.sbom.controller;

import com.sbom.dto.ComponentDto;
import com.sbom.service.ComponentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/components")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ComponentController {
    
    private final ComponentService componentService;
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<Page<ComponentDto>> getComponentsByProject(
            @PathVariable Long projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "componentName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ComponentDto> components = componentService.getComponentsByProject(projectId, pageable);
        return ResponseEntity.ok(components);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<ComponentDto>> searchComponents(
            @RequestParam String componentName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("componentName").ascending());
        Page<ComponentDto> components = componentService.searchComponentsByName(componentName, pageable);
        return ResponseEntity.ok(components);
    }
    
    @GetMapping("/{componentId}")
    public ResponseEntity<ComponentDto> getComponentById(@PathVariable Long componentId) {
        return componentService.getComponentById(componentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/names")
    public ResponseEntity<List<String>> getDistinctComponentNames() {
        List<String> componentNames = componentService.getDistinctComponentNames();
        return ResponseEntity.ok(componentNames);
    }
    
    @GetMapping("/package-managers")
    public ResponseEntity<List<String>> getDistinctPackageManagers() {
        List<String> packageManagers = componentService.getDistinctPackageManagers();
        return ResponseEntity.ok(packageManagers);
    }
    
    @GetMapping("/by-name-version")
    public ResponseEntity<List<ComponentDto>> findComponentsByNameAndVersion(
            @RequestParam String componentName,
            @RequestParam String version) {
        List<ComponentDto> components = componentService.findComponentsByNameAndVersion(componentName, version);
        return ResponseEntity.ok(components);
    }
}