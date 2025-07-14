import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="page-header">
        <h1><i class="fas fa-chart-bar"></i> 統計資訊</h1>
        <p class="subtitle">SBOM 專案統計與分析概覽</p>
      </header>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-project-diagram"></i>
          </div>
          <div class="stat-content">
            <h3>總專案數</h3>
            <span class="stat-number">--</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-cubes"></i>
          </div>
          <div class="stat-content">
            <h3>總組件數</h3>
            <span class="stat-number">--</span>
          </div>
        </div>
        
        <div class="stat-card critical">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-content">
            <h3>嚴重漏洞</h3>
            <span class="stat-number">--</span>
          </div>
        </div>
        
        <div class="stat-card high">
          <div class="stat-icon">
            <i class="fas fa-warning"></i>
          </div>
          <div class="stat-content">
            <h3>高風險漏洞</h3>
            <span class="stat-number">--</span>
          </div>
        </div>
      </div>
      
      <div class="coming-soon">
        <h2>功能開發中</h2>
        <p>詳細的統計圖表和分析功能正在開發中...</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
      
      h1 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        
        i {
          color: #3498db;
          margin-right: 1rem;
        }
      }
      
      .subtitle {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin: 0;
      }
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3498db;
        
        i {
          font-size: 1.5rem;
          color: white;
        }
      }
      
      .stat-content {
        flex: 1;
        
        h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
        }
      }
      
      &.critical {
        .stat-icon {
          background: #e74c3c;
        }
        .stat-number {
          color: #e74c3c;
        }
      }
      
      &.high {
        .stat-icon {
          background: #f39c12;
        }
        .stat-number {
          color: #f39c12;
        }
      }
    }
    
    .coming-soon {
      text-align: center;
      background: white;
      padding: 4rem 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      
      h2 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      
      p {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin: 0;
      }
    }
  `]
})
export class DashboardComponent {
  // TODO: Implement dashboard statistics
}