import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyBOVwBs5rNJyqd_1aQM8cBPXkkHbA-7NTk",
    authDomain: "kubator-test2-mehdi.firebaseapp.com",
    databaseURL: "https://kubator-test2-mehdi.firebaseio.com",
    projectId: "kubator-test2-mehdi",
    storageBucket: "",
    messagingSenderId: "497632131916",
    appId: "1:497632131916:web:009b121d04d6ff4b"
  }


class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}
	
	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}
	google(email, password) {
		return this.auth.signInWithGoogle(email, password)
	}
	
	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}



export default new Firebase()