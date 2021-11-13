import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: any;
  boardSize: number = 9;
  activePlayer: string = "N";
  turnCount: 0 | any;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor() {
    this.newGame()
  }
  ngOnInit(): void {

  }

  newGame() {
    this.activePlayer = "N";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push({ id: i, state: null })
    };
    return this.board
  }

  get getBoard() {
    return this.board
  }

  changePlayer(board:any): void{
    this.isGameRunning = true;
    if ( this.isGameRunning && board.state === null ){
      this.board[board.id].state = this.activePlayer;
      this.changePlayerTurn(board);
    }
  }

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked)
    this.activePlayer = this.activePlayer === "N" ? "X" : "N";
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state
    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false
  }

  get isWinner(): boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
  }

  checkRows(board: { state: any; }[], mode: string): boolean {
    const
      ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;
    for (let i = 0; i < NUMTIMES; i += INC) {
      let
        firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + (DIST * 2)].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare) return true
      }
    }
    return false
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;
    for (let i = 0; i <= timesRun; i += 2) {
      let
        upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;
      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner) return true
      }
    }
    return false
  }
}