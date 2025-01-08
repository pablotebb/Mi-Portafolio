
// we distinguish parts of the web
const $loader = document.querySelector('.contact-form-loader');
const $response = document.querySelector('.contact-form-response');
const $form = document.getElementById('form');
const $inputs = document.querySelectorAll('#form input');
const $textarea = document.getElementById('textoarea');
const oldValue = '';

// object, containing expressions used, in field validation
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can have accents.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	textArea: /.*\'.*/g 
	// textArea: /^(?!.*\').*/g // if no escape 'returns true
}


const fields = {
	name: false,
	valueName: null,
	mail: false,
	valueMail: null,
	textArea: false,
	valueTextArea: null
}

const validateForm = (e) => {
	switch (e.target.name) {
		case 'name':
			validateField(expressions.name, e.target, 'name');
			break;
		case 'mail':
			validateField(expressions.mail, e.target, 'mail');
		break;
		case 'textArea':
			validateField(expressions.textArea, e.target, 'textArea');
	}
}

const ifFindEscapeEmptyField = (input) => {

	if (input.value.match(/.*\'.*/g)) { 
		// If it finds the escape ', he empties the field
		input.value = oldValue;
	} 
}

const changeArrayState = (field, value, inputValue) => {

	const valueField = createPropertyValueObjectFields(field);
	
	// Boolean
	fields[field] = value;

	// String
	if(value) {
		fields[valueField] = inputValue;
	} else {
		fields[valueField] = null;
	}
} 

const createPropertyValueObjectFields = (string) => {
	
	const valueString = 'value'; // value
	const firstCapitalString = firstCapitalLetter(string); // Ej: Name

	// it will return, for example: valueName...
	return valueString.concat(firstCapitalString);
}

const firstCapitalLetter = (string) => {
	
	const firstCharacterString = string.charAt(0).toUpperCase(); // N
	const restOfString = string.substring(1, string.length); // ame

	return firstCharacterString.concat(restOfString); // Name

  }


const validateField = (expression, input, field) => {

	// let uno = expression.test(input.value);
	// let dos = !input.value.match(/.*\'.*/g);

	// console.log(uno, dos);
	
	if((expression.test(input.value) && (field == 'name' || field == 'mail'))) {
		
		if(field != 'textArea') {
			document.getElementById(`group__${field}`).classList.remove('form-group-incorrect');
			document.getElementById(`group__${field}`).classList.add('form-group-correct');
			document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
			document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
			document.querySelector(`#group__${field} .form-input-error`).classList.remove('form-input-error-active');
			ifFindEscapeEmptyField(input);
			changeArrayState(field, true, input.value);
		}

	} else {
	
		ifFindEscapeEmptyField(input);

		if(field != 'textArea') {
			document.getElementById(`group__${field}`).classList.add('form-group-incorrect');
			document.getElementById(`group__${field}`).classList.remove('form-group-correct');
			document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
			document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
			document.querySelector(`#group__${field} .form-input-error`).classList.add('form-input-error-active');
			changeArrayState(field, false, input.value);
		} else {
			changeArrayState(field, true, input.value);
		}
	}
}


// EVENTS

// of fields
$inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

$textarea.addEventListener('keyup', validateForm);
$textarea.addEventListener('blur', validateForm);

// sending
form.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const fieldsToSend = {
		name: fields.valueName,
		email: fields.valueMail,
		text: fields.valueTextArea
	}
	
	//const terminos = document.getElementById('terminos');
	if(fields.name && fields.mail && fields.textArea){
		
		$form.reset();

		// We remove, in each field, the icons that indicate correct...
		document.querySelectorAll('.form-group-correct').forEach((icono) => {
			icono.classList.remove('form-group-correct');
		});


		$loader.classList.remove('none');

		// We send the data to the API
		fetch('https://formsubmit.co/ajax/pablotebb@hotmail.com', {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				email: fieldsToSend.email,
				name: fieldsToSend.name,
				message: fieldsToSend.text
			})
		})
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((json) => {
			console.log(json);
			location.hash = '#gracias';
			$form.reset();
		})
		.catch((err) => {
			console.log(err);
			let message = err.statusText || 'Ocurrió un error al enviar, intenta nuevamente';
			$response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
		})
		.finally(() => {
			$loader.classList.add('none');
			setTimeout(() => {
				location.hash = '#close';
			}, 3000);
		});
	} else {
		document.getElementById('form-message').classList.add('form-message-activo');
	}
});