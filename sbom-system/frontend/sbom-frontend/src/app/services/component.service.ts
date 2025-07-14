import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, PageResponse } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private apiUrl = 'http://localhost:8080/api/components';

  constructor(private http: HttpClient) { }

  getComponentsByProject(projectId: number, page: number = 0, size: number = 10, sortBy: string = 'componentName', sortDir: string = 'asc'): Observable<PageResponse<Component>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<PageResponse<Component>>(`${this.apiUrl}/project/${projectId}`, { params });
  }

  searchComponents(componentName: string, page: number = 0, size: number = 10): Observable<PageResponse<Component>> {
    const params = new HttpParams()
      .set('componentName', componentName)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Component>>(`${this.apiUrl}/search`, { params });
  }

  getComponentById(componentId: number): Observable<Component> {
    return this.http.get<Component>(`${this.apiUrl}/${componentId}`);
  }

  getDistinctComponentNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/names`);
  }

  getDistinctPackageManagers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/package-managers`);
  }

  findComponentsByNameAndVersion(componentName: string, version: string): Observable<Component[]> {
    const params = new HttpParams()
      .set('componentName', componentName)
      .set('version', version);

    return this.http.get<Component[]>(`${this.apiUrl}/by-name-version`, { params });
  }
}