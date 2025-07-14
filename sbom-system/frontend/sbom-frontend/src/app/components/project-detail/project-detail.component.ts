import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ComponentService } from '../../services/component.service';
import { Project, Component as ProjectComponent } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="project-detail-container">
      <div *ngIf="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> 載入中...
      </div>
      
      <div *ngIf="!loading && project">
        <header class="project-header">
          <div class="header-content">
            <h1>{{ project.projectName }}</h1>
            <span class="version" *ngIf="project.projectVersion">v{{ project.projectVersion }}</span>
          </div>
          <p class="description" *ngIf="project.projectDescription">{{ project.projectDescription }}</p>
        </header>
        
        <div class="project-info">
          <div class="info-grid">
            <div class="info-item">
              <label>掃描日期</label>
              <span>{{ formatDate(project.scanDate) }}</span>
            </div>
            <div class="info-item" *ngIf="project.scanTool">
              <label>掃描工具</label>
              <span>{{ project.scanTool }}</span>
            </div>
            <div class="info-item" *ngIf="project.sbomFormat">
              <label>SBOM 格式</label>
              <span>{{ project.sbomFormat }}</span>
            </div>
          </div>
        </div>
        
        <div class="stats-overview">
          <div class="stat-card">
            <i class="fas fa-cubes"></i>
            <span class="number">{{ project.totalComponents || 0 }}</span>
            <span class="label">總組件數</span>
          </div>
          <div class="stat-card critical">
            <i class="fas fa-exclamation-triangle"></i>
            <span class="number">{{ project.criticalVulnerabilities || 0 }}</span>
            <span class="label">嚴重漏洞</span>
          </div>
          <div class="stat-card high">
            <i class="fas fa-warning"></i>
            <span class="number">{{ project.highVulnerabilities || 0 }}</span>
            <span class="label">高風險漏洞</span>
          </div>
          <div class="stat-card medium">
            <i class="fas fa-info-circle"></i>
            <span class="number">{{ project.mediumVulnerabilities || 0 }}</span>
            <span class="label">中風險漏洞</span>
          </div>
        </div>
        
        <div class="components-section">
          <h2>組件列表</h2>
          <div *ngIf="components.length === 0" class="empty-state">
            <p>暫無組件資料</p>
          </div>
          <div *ngIf="components.length > 0" class="components-list">
            <div *ngFor="let component of components" class="component-item">
              <h3>{{ component.componentName }}</h3>
              <p *ngIf="component.componentVersion">版本: {{ component.componentVersion }}</p>
              <p *ngIf="component.packageManager">套件管理器: {{ component.packageManager }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="!loading && !project" class="error-state">
        <h2>專案不存在</h2>
        <p>找不到指定的專案</p>
        <a [routerLink]="['/projects']" class="back-link">返回專案列表</a>
      </div>
    </div>
  `,
  styles: [`
    .project-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .loading {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
      color: #7f8c8d;
    }
    
    .project-header {
      margin-bottom: 2rem;
      
      .header-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        h1 {
          color: #2c3e50;
          margin: 0;
        }
        
        .version {
          background: #3498db;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.9rem;
        }
      }
      
      .description {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin: 0;
      }
    }
    
    .stats-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
      
      .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
        
        i {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #3498db;
        }
        
        .number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
        }
        
        .label {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        &.critical i, &.critical .number { color: #e74c3c; }
        &.high i, &.high .number { color: #f39c12; }
        &.medium i, &.medium .number { color: #f1c40f; }
      }
    }
    
    .components-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      h2 {
        color: #2c3e50;
        margin-bottom: 1.5rem;
      }
      
      .components-list {
        display: grid;
        gap: 1rem;
        
        .component-item {
          padding: 1rem;
          border: 1px solid #ecf0f1;
          border-radius: 6px;
          
          h3 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
          }
          
          p {
            margin: 0.25rem 0;
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        }
      }
    }
    
    .error-state {
      text-align: center;
      padding: 3rem;
      
      .back-link {
        color: #3498db;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  components: ProjectComponent[] = [];
  loading = true;
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private componentService: ComponentService
  ) {}
  
  ngOnInit() {
    const projectId = Number(this.route.snapshot.params['id']);
    if (projectId) {
      this.loadProject(projectId);
    }
  }
  
  loadProject(projectId: number) {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadComponents(projectId);
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.loading = false;
      }
    });
  }
  
  loadComponents(projectId: number) {
    this.componentService.getComponentsByProject(projectId, 0, 50).subscribe({
      next: (response) => {
        this.components = response.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading components:', error);
        this.loading = false;
      }
    });
  }
  
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('zh-TW');
  }
}