
/**
 * Utils helper with general methods to be called on demend, 
 * regardless of any instance of a class.
 */
 import { Injectable } from '@angular/core';
 import { globals } from 'environments/environment';

 @Injectable()
 export class Utils {

 	static generateAnonToken() {
 		return Math.floor(Math.random() * 100000000).toString();
 	}

 	static setAnonToken() {
 		let anonToken = this.generateAnonToken();
 		globals.anon_token = anonToken;
 		globals.setAnonToken();
 		localStorage.setItem('anon_user_token', anonToken);
 	}
 }