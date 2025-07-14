import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project, PageResponse } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="project-list-container">
      <header class="page-header">
        <h1><i class="fas fa-project-diagram"></i> SBOM 專案管理</h1>
        <p class="subtitle">查看和管理您的軟件物料清單 (SBOM) 專案</p>
      </header>

      <!-- 搜尋區域 -->
      <div class="search-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="搜尋專案名稱..." 
            [(ngModel)]="searchTerm"
            (keyup.enter)="searchProjects()"
            class="search-input">
          <button 
            (click)="searchProjects()" 
            class="search-btn"
            [disabled]="loading">
            <i class="fas fa-search"></i>
          </button>
          <button 
            (click)="clearSearch()" 
            class="clear-btn"
            *ngIf="searchTerm">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- 載入指示器 -->
      <div *ngIf="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> 載入中...
      </div>

      <!-- 專案列表 -->
      <div *ngIf="!loading" class="projects-grid">
        <div 
          *ngFor="let project of projects.content" 
          class="project-card"
          [routerLink]="['/projects', project.projectId]">
          
          <div class="project-header">
            <h3 class="project-name">{{ project.projectName }}</h3>
            <span class="project-version" *ngIf="project.projectVersion">
              v{{ project.projectVersion }}
            </span>
          </div>
          
          <p class="project-description" *ngIf="project.projectDescription">
            {{ project.projectDescription }}
          </p>
          
          <div class="project-meta">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(project.scanDate) }}</span>
            </div>
            <div class="meta-item" *ngIf="project.scanTool">
              <i class="fas fa-tools"></i>
              <span>{{ project.scanTool }}</span>
            </div>
          </div>
          
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-number">{{ project.totalComponents || 0 }}</span>
              <span class="stat-label">組件</span>
            </div>
            <div class="stat-item">
              <span class="stat-number critical">{{ project.criticalVulnerabilities || 0 }}</span>
              <span class="stat-label">嚴重</span>
            </div>
            <div class="stat-item">
              <span class="stat-number high">{{ project.highVulnerabilities || 0 }}</span>
              <span class="stat-label">高風險</span>
            </div>
            <div class="stat-item">
              <span class="stat-number medium">{{ project.mediumVulnerabilities || 0 }}</span>
              <span class="stat-label">中風險</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div *ngIf="!loading && projects.content.length === 0" class="empty-state">
        <i class="fas fa-folder-open"></i>
        <h3>沒有找到專案</h3>
        <p>目前沒有可顯示的SBOM專案</p>
      </div>

      <!-- 分頁 -->
      <div *ngIf="!loading && projects.totalPages > 1" class="pagination">
        <button 
          (click)="goToPage(currentPage - 1)" 
          [disabled]="currentPage === 0"
          class="page-btn">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <span class="page-info">
          第 {{ currentPage + 1 }} 頁，共 {{ projects.totalPages }} 頁
        </span>
        
        <button 
          (click)="goToPage(currentPage + 1)" 
          [disabled]="currentPage >= projects.totalPages - 1"
          class="page-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: PageResponse<Project> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 12,
    number: 0,
    first: true,
    last: true,
    numberOfElements: 0,
    empty: true
  };
  
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 12;
  loading: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getAllProjects(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.projects = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.loading = false;
        }
      });
  }

  searchProjects() {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.currentPage = 0;
      this.projectService.searchProjects(this.searchTerm, this.currentPage, this.pageSize)
        .subscribe({
          next: (response) => {
            this.projects = response;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error searching projects:', error);
            this.loading = false;
          }
        });
    } else {
      this.loadProjects();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadProjects();
  }

  goToPage(page: number) {
    this.currentPage = page;
    if (this.searchTerm.trim()) {
      this.searchProjects();
    } else {
      this.loadProjects();
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('zh-TW');
  }
}