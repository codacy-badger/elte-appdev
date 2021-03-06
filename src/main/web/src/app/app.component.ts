import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from './service/auth.service';
import {
	transition,
	animate,
	state,
	style,
	trigger,
	group,
	animateChild,
	query
} from '@angular/animations';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from './animation/route.animation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('expand', [
			transition('open <=> wideopen', [
				group([query('@*', animateChild()), animate('500ms ease')])
			]),
			transition('open <=> closed', [
				group([query('@*', animateChild()), animate('500ms ease')])
			]),
			state(
				'wideopen',
				style({
					height: '90vh',
					minHeight: '32em' // 16 rem
					//transform: 'translateY(-10%)'
					// backgroundColor:4 'black'
				})
			),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '32em' // 16 rem
					// backgroundColor: 'green'
				})
			),
			state('closed', style({}))
		]),
		trigger('expandMain', [
			transition('open <=> wideopen', [group([animate('500ms ease')])]),
			state(
				'wideopen',
				style({
					transform: 'translateY(100vh)'
				})
			),
			state(
				'open',
				style({
					transform: 'translateY(0)'
				})
			)
		]),
		trigger('expandReg', [
			transition('* <=> *', [
				group([
					query(':leave', animate('500ms ease'), { optional: true }),
					animate('500ms ease')
				])
			]),
			state(
				'wideopen',
				style({
					transform: 'translateY(0vh)'
				})
			),
			state(
				'open',
				style({
					transform: 'translateY(-100vh)'
				})
			),
			state(
				'closed',
				style({
					transform: 'translateY(-100vh)'
				})
			)
		]),
		trigger('expandTitle', [
			transition('closed <=> open', [animate('1100ms ease')]),
			state(
				'closed',
				style({
					fontSize: '2rem',
					opacity: 1
				})
			),
			state(
				'open',
				style({
					fontSize: '10rem',
					opacity: 0.8
				})
			),
			state(
				'wideopen',
				style({
					fontSize: '10rem',
					opacity: 0.8
				})
			)
		]),
		slideInAnimation
	]
})
export class AppComponent implements OnInit {
	title: string = 'Cinema';

	open: boolean = true;
	exp: boolean = true;
	show: boolean = true;
	constructor(public auth: AuthService, private route: ActivatedRoute) {}

	ngOnInit(): void {}

	whoami(): any {
		console.log('whoami');
		this.auth.queryCurrentUser().subscribe(observable => {
			console.log(observable);
		});
	}

	navSize() {
		return this.auth.user === undefined
			? this.route.firstChild &&
			  this.route.firstChild.outlet === 'register'
				? 'wideopen'
				: 'open'
			: 'closed';
	}

	animDebug(event) {
		console.log(event);
	}
}
