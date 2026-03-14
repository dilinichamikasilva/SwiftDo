import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
  }

  // Get all tasks for the logged-in user
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  // Create a new task
  createTask(taskData: { title: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData, this.getHeaders());
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // Update a task 
  updateTask(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updates, this.getHeaders());
  }
}