import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: Firestore) { }

  async newGame() {
    const game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    try {
      const docRef = await addDoc(gamesCollection, game.toJson());
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(['/game/' + docRef.id]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

}
