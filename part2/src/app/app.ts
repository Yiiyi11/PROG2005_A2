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