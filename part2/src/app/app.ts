/*
Author: Shen Jingyi
Student ID: 24832643
Unit Code: PROG2005
Assessment: A2 - Part 2 (Angular Inventory System)
File Function: Implement product addition, data validation and responsive design with Angular.
Date: 2026/4/8
*/
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // 👈 只保留这一行，引用独立CSS文件
})
export class AppComponent {}