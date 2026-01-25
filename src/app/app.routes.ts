import { Routes } from '@angular/router';
import { StartScreenComponent } from './../app/start-screen/start-screen.component';
import { GameComponent } from './../app/game/game.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game/:id', component: GameComponent },
];
