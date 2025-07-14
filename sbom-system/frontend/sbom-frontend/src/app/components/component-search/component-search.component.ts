import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-component-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="search-container">
      <header class="page-header">
        <h1><i class="fas fa-search"></i> 套件搜尋</h1>
        <p class="subtitle">搜尋特定套件並查看哪些專案使用了它們</p>
      </header>
      
      <div class="search-form">
        <div class="search-input-group">
          <input 
            type="text" 
            placeholder="輸入套件名稱..."
            [(ngModel)]="searchTerm"
            (keyup.enter)="searchComponents()"
            class="search-input">
          <button 
            (click)="searchComponents()" 
            class="search-btn"
            [disabled]="!searchTerm.trim()">
            <i class="fas fa-search"></i> 搜尋
          </button>
        </div>
      </div>
      
      <div class="search-results">
        <p class="coming-soon">此功能正在開發中...</p>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 800px;
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
    
    .search-form {
      margin-bottom: 2rem;
      
      .search-input-group {
        display: flex;
        gap: 1rem;
        
        .search-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #ecf0f1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
          
          &:focus {
            border-color: #3498db;
          }
        }
        
        .search-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
          
          &:hover:not(:disabled) {
            background: #2980b9;
          }
          
          &:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
          }
        }
      }
    }
    
    .coming-soon {
      text-align: center;
      color: #7f8c8d;
      font-size: 1.2rem;
      padding: 3rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ComponentSearchComponent {
  searchTerm: string = '';
  
  searchComponents() {
    if (this.searchTerm.trim()) {
      console.log('Searching for:', this.searchTerm);
      // TODO: Implement component search functionality
    }
  }
}