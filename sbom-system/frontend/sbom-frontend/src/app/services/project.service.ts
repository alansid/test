import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, PageResponse } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(page: number = 0, size: number = 10, sortBy: string = 'scanDate', sortDir: string = 'desc'): Observable<PageResponse<Project>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<PageResponse<Project>>(this.apiUrl, { params });
  }

  searchProjects(projectName: string, page: number = 0, size: number = 10): Observable<PageResponse<Project>> {
    const params = new HttpParams()
      .set('projectName', projectName)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Project>>(`${this.apiUrl}/search`, { params });
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  findProjectsByComponent(componentName: string): Observable<Project[]> {
    const params = new HttpParams().set('componentName', componentName);
    return this.http.get<Project[]>(`${this.apiUrl}/by-component`, { params });
  }
}