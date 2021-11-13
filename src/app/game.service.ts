import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public board = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: 0 | any;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;
  constructor() { }
}
