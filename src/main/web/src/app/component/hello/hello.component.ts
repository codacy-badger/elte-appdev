import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'hello',
	templateUrl: './hello.component.html',
	styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
	constructor(private http: HttpClient) {}

	ngOnInit() {
		console.log('log hello');
	}
}
