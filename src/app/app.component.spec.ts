<div class="board-container">
  <div class="card-list" cdkDropList (cdkDropListDropped)="drop($event)">
    <div
      class="card"
      *ngFor="let card of cards; let i = index"
      cdkDrag
      (drop)="onImageDrop($event, card)"
      (dragover)="allowDrop($event)"
    >
      <div class="card-header">
        <div class="menu-btn" (click)="toggleMenu(card)">&#8942;</div>
        <div class="dropdown-menu" *ngIf="card.menu">
          <label class="menu-option">
            Add Image
            <input type="file" hidden (change)="onImageUpload($event, card)" />
          </label>
          <button class="menu-option" (click)="editCardText(card, prompt('Enter new text:', card.text) || card.text)">Edit Text</button>
          <button class="menu-option" (click)="deleteCard(i)">Delete</button>
          <button class="menu-option" (click)="sortCards()">Sort by Date</button>
        </div>
      </div>
      <img *ngIf="card.imageUrl" [src]="card.imageUrl" class="card-image" />
      <div class="card-text">{{ card.text }}</div>
      <button class="add-btn">+ Add to Cart</button>
    </div>
  </div>
</div>

<button class="floating-btn" (click)="addCard()">+</button>