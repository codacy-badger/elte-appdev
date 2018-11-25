import {
	Component,
	OnInit,
	HostListener,
	OnDestroy,
	Input,
	ViewChild
} from '@angular/core';
import { User } from '../../model/user.class';
import * as moment from 'moment';
import { AuthService } from '../../service/auth.service';
import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
	FormGroupDirective,
	NgForm,
	ValidatorFn,
	AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';
import { OAuthService } from 'angular-oauth2-oidc';
import { trigger } from '@angular/animations';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	loginForm: FormGroup = this.formBuilder.group({});

	ngOnInit(): void {}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
	}

	doLogin(form: NgForm) {
		this.auth.login(
			this.loginForm.get('user').get('username').value,
			this.loginForm.get('user').get('password').value
		);
	}
}
