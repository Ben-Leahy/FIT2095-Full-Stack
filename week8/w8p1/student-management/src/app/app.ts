import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student, createStudent, getFullName } from './student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Basic properties for state management
  protected students: Student[] = [];
  protected newStudent = {
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    year: 1
  };

  // Add student method
  protected addStudent(): void {
    if (this.isValidStudent(this.newStudent)) {
      const newId = this.students.length > 0 
        ? Math.max(...this.students.map(s => s.id)) + 1 
        : 1;
      
      const studentToAdd = createStudent(
        newId,
        this.newStudent.studentId,
        this.newStudent.firstName,
        this.newStudent.lastName,
        this.newStudent.email,
        this.newStudent.year
      );
      
      // Add to students array
      this.students = [...this.students, studentToAdd];
      this.resetForm();
    }
  }

  // Delete student method
  protected deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
  }

  // Utility methods
  protected getFullName = getFullName;
  
  private isValidStudent(student: any): boolean {
    return student.studentId.trim() && 
           student.firstName.trim() && 
           student.lastName.trim() && 
           student.email.trim();
  }

  private resetForm(): void {
    this.newStudent = {
      studentId: '',
      firstName: '',
      lastName: '',
      email: '',
      year: 1
    };
  }
}