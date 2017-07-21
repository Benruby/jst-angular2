/**
 * the interface declares the type of Obj that returns from server
 * when a game is over. 
 * @type {[type]}
 */

export interface GameResult {
	numOfQuestions: number;
	numOfCorrectAnswers: number;
	gameScore: number;
}
