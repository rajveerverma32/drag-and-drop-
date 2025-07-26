import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DragDropModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  board = [
    {
      title: 'Today',
      color: '#f8d7da',
      cards: ['Start using Trello', 'New to Trello? Start here'],
    },
    {
      title: 'This Week',
      color: '#d1ecf1',
      cards: ['Capture from email, Slack, and Teams'],
    },
    {
      title: 'Later',
      color: '#d4edda',
      cards: ['Dive into Trello workflows'],
    },
    {
      title: 'Trello Starter Guide',
      color: '#fff3cd',
      cards: ['Download the mobile app', 'Explore boards and cards'],
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addCard(list: any) {
    const newCard = prompt('Enter card title');
    if (newCard) {
      list.cards.push(newCard);
    }
  }
}

