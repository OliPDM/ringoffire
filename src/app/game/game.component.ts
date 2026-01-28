import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CardInfoComponent } from '../card-info/card-info.component';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatDialogActions, MatDialogContent, MatFormFieldModule, FormsModule, CardInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  gameId: string = '';


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe(params => {
      console.log(params["id"]);
      this.gameId = params['id'];
      if (params['id']) {
        const gameDocRef = doc(this.firestore, 'games', this.gameId);
        docData(gameDocRef).subscribe((game: any) => {
          console.log("Game update:", game);
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.currentPlayer = game.currentPlayer;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
      }
    });
  }

  async saveGame() {
    if (this.gameId) {
      const gameDocRef = doc(this.firestore, 'games', this.gameId);
      try {
        await updateDoc(gameDocRef, this.game.toJson());
        console.log("Game saved successfully");
      } catch (error) {
        console.error("Error saving game: ", error);
      }
    }
  }

  async newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      if (this.game.currentPlayer >= this.game.players.length) {
        this.game.currentPlayer = 0;
      }
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1050);
    }

  }



}
