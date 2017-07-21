
/**
 * Utils helper with general methods to be called on demend, 
 * regardless of any instance of a class.
 */
export class Utils {
	static generateAnonToken() {
		return Math.floor(Math.random() * 1000000).toString();
	}
}