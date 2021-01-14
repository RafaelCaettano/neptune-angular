import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user.model";
import firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	userData: any;
	MsgError: string = '';

	map = new Map([
		[ 'auth/wrong-password', 'A senha está incorreta!' ],
		[ 'auth/invalid-email', 'Verifique se o seu endereço de e-mail está correto' ],
		[ 'auth/user-not-found', 'Não encontramos seu registro na nossa base de dados.' ],
		[ 'auth/user-disabled', 'Esse usuário foi desativado e está impossibilitado de realizar login.' ],
		[ 'auth/email-already-in-use', 'Usuário já está registrado!']
	]);

	constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
		
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userData = user;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user'));
			} else {
				localStorage.setItem('user', null); 
				JSON.parse(localStorage.getItem('user'));
			}
		})

	}
	
	async signIn(email: string, password: string) {

		try {
			const result = await firebase.auth().signInWithEmailAndPassword(email, password);
			this.ngZone.run(() => {
				this.router.navigate(['home']).then(
					nav => { window.location.reload(); }
				);
			});
			this.setUserData(result.user);
		} catch (error) {
			this.MsgError = this.map.get(error.code);
		}

	}
	
	async signUp(email: string, password: string) {
		
		try {
			const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
			this.sendVerificationMail();
			this.setUserData(result.user);
		} catch (error) {
			this.MsgError = this.map.get(error.code);
		}

	}

	async authLogin(provider: firebase.auth.AuthProvider) {
		try {
			const result = await firebase.auth().signInWithPopup(provider);
			this.ngZone.run(() => {
				this.router.navigate(['dashboard']);
			});
			this.setUserData(result.user);
		} catch (error) {
			this.MsgError = this.map.get(error.code);
		}
	  }
	
	async sendVerificationMail() {
		await firebase.auth().currentUser.sendEmailVerification();
		this.router.navigate(['verify-email-address']);
	}
	
	async forgotPassword(email: string) {

		try {
			await firebase.auth().sendPasswordResetEmail(email);
			this.MsgError = 'Password reset email sent, check your inbox.';
		} catch (error) {
			this.MsgError = this.map.get(error.code);
		}

	}
	
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return (user !== null) ? true : false;
	}
	
	get getEmail(): string {
		if (this.isLoggedIn) {
		  const user = JSON.parse(localStorage.getItem('user'));
		  return (user.email);
		}
	}

	setUserData(user) {

		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
		const userData: User = {
			id: user.id,
			email: user.email,
			name: user.name,
			nickname: user.nickname,
			phone: user.phone,
			date: user.date,
			address: user.address,
			admin: user.admin,
		}
		return userRef.set(userData, {
			merge: true
		})
		
	}
	
	async signOut() {
		await firebase.auth().signOut();
		localStorage.removeItem('user');
		localStorage.removeItem('userLogged');
		this.router.navigate(['home']);
	}

}