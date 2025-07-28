import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  board = [
    {
      title: 'Today',
      cards: ['Task 1', 'Task 2'],
      des:'ram'
    },
    {
      title: 'This week',
      cards: ['Task 3'],
      des:'ram'
    },
    {
      title: 'This month',
      color: 'white',
      cards: ['Task 4'],
      des:'ram'
    }
  ];

  dropdownIndex: number | null = null;
  cardDropdownIndex: { list: number, card: number } | null = null;

  toggleDropdown(index: number): void {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  toggleCardDropdown(listIndex: number, cardIndex: number): void {
    const isOpen =
      this.cardDropdownIndex?.list === listIndex &&
      this.cardDropdownIndex?.card === cardIndex;
    this.cardDropdownIndex = isOpen ? null : { list: listIndex, card: cardIndex };
  }

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
    const cardText = prompt('Enter card title')?.trim();
    if (cardText) {
      list.cards.push(cardText);
    }
  }

  deleteCard(list: any, cardIndex: number): void {
    list.cards.splice(cardIndex, 1);
    this.cardDropdownIndex = null;
  }

  editCard(listIndex: number, cardIndex: number): void {
    const current = this.board[listIndex].cards[cardIndex];
    const updated = prompt('Edit card text:', current)?.trim();

    if (updated) {
      this.board[listIndex].cards[cardIndex] = updated;
      this.cardDropdownIndex = null;
    }
  }

  deleteColumn(index: number): void {
    this.board.splice(index, 1);
    this.dropdownIndex = null;
  }

  editColumn(index: number): void {
    const current = this.board[index];
    const newTitle = prompt('Enter new column title:', current.title)?.trim();

    if (!newTitle) {
      alert('Column title cannot be empty.');
      return;
    }

    const isDuplicate = this.board.some((col, i) =>
      i !== index && col.title.toLowerCase() === newTitle.toLowerCase()
    );
    if (isDuplicate) {
      alert('Column title already exists.');
      return;
    }

    this.board[index].title = newTitle;
    this.dropdownIndex = null;
  }

  addColumn(): void {
    const columnTitle = prompt('Enter new column title')?.trim();

    if (!columnTitle) return;

    const isDuplicate = this.board.some(
      col => col.title.toLowerCase() === columnTitle.toLowerCase()
    );
    if (isDuplicate) {
      alert('Column title already exists.');
      return;
    }

    this.board.push({
      title: columnTitle,
      color: '#f3f4f6',
      cards: [],
      des: 'ram'
    });
  }
}




