const URL_BASE = "http://54.196.13.40:8090"
// const URL_BASE = "http://localhost:8090"
import createStore from '@/store'
let jwt = ""

// METODOS - USUARIO -

const addUser = async data =>{
	const url = URL_BASE+"/signup"
	const settings = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	}
	try {
		const response = await fetch(url, settings)
		return response
	} catch (e) {
		console.log(e);
		return false
	}
}

const logIn = async data =>{
	const url = URL_BASE+"/login"
	const settings = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}

// METDODOS - DOCTORS -

const addDoctor = async data =>{
	const url = URL_BASE+"/doctors"
	jwt = createStore.getters.getUser.jwt
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}

// METDODOS - ROOM -

const addRoom = async data => {
	const url = URL_BASE+"/rooms"
	jwt = createStore.getters.getUser.jwt
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}
const addTypeRoom = async data => {
	const url = URL_BASE+"/typerooms"
	jwt = createStore.getters.getUser.jwt
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}

const addImg = async (data) =>{
	jwt = createStore.getters.getUser.jwt
	const url = URL_BASE+"/images/upload"
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
		},
		body: data
	}
	try {
		const response = await fetch(url, settings)
		return response
	} catch (e) {
		console.log(e)
		return false
	}
}
const addImgTyperoom = async (data) =>{
	jwt = createStore.getters.getUser.jwt
	const url = URL_BASE+"/images/upload/typeroom"
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
		},
		body: data
	}
	try {
		const response = await fetch(url, settings)
		return response
	} catch (e) {
		console.log(e)
		return false
	}
}

// EMAILS 

const sendEmail = async (mailBody) => {
	const url = "https://api.emailjs.com/api/v1.0/email/send"
    const settings = {
		method: "POST",
		headers: {
			
		},
		body: JSON.stringify(mailBody)
	}
	try {
		const response = await fetch(url, settings)
		return response
	} catch (e) {
		console.log(e)
		return false
	}
}

// CARACTERISTICAS

const addCaracteristica = async data =>{
	const url = URL_BASE+"/characteristics"
	jwt = createStore.getters.getUser.jwt
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}
const addBooking = async data =>{
	const url = URL_BASE+"/bookings"
	jwt = createStore.getters.getUser.jwt
	const settings = {
		method: "POST",
		headers: {
			'Authorization' : "Bearer " + jwt,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url, settings)
		const json = await response.json()
		return json
	} catch (e) {
		console.log(e);
		return false
	}
}

const postMethods = {
	addUser: addUser,
	logIn: logIn,
	addDoctor: addDoctor,
	addRoom: addRoom,
	addTypeRoom: addTypeRoom,
	addImg: addImg,
	addImgTyperoom: addImgTyperoom,
	sendEmail: sendEmail,
	addCaracteristica: addCaracteristica,
	addBooking: addBooking,
}



export default postMethods