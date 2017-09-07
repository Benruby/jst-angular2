import { Injectable } from '@angular/core';

import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

@Injectable()
export class CustomUrlSerializer implements UrlSerializer {
    
	constructor(private defaultSerializer: DefaultUrlSerializer){}

    parse(url: string): UrlTree {
    	url = url.replace(/\-/g, '%20');
 		return this.defaultSerializer.parse(url)  
    }

    serialize(tree: UrlTree): string {

         return this.defaultSerializer.serialize(tree).replace(/%20/g, '-');
    }
}