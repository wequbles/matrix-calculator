"use strict";

/* frontend */
const inputs = document.querySelectorAll(".input_control");
const clearBtn = document.getElementById('clear');
const tooltip = document.getElementById('tooltip');
let tooltipTimer;
const varInput = document.getElementById("variable_1");
const buttonsControl = document.querySelectorAll(".button_control");
const matrixResult = document.getElementById("matrix_result");
const matrixCont = document.getElementById("matrix_result__cont");

inputs.forEach(input => {
	input.addEventListener('input', () => {
		let inputValue = input.value.replace(/[^\d]/g,'');
		input.value = inputValue;

	if (inputColumns.value.length > 0 || inputRows.value.length > 0) {
		clearBtn.setAttribute('data-visible', `true`);
	} else {
		clearBtn.setAttribute('data-visible', `false`);
	}
	});
});

clearBtn.addEventListener('click', () => {
	matrixResult.setAttribute('data-visible', `false`);
	hideTooltip();
	inputs.forEach(input => {
		input.value = "";
	});
	clearBtn.setAttribute('data-visible', `false`);
	array = [];
	varInput.value = "";
	console.log(array)
});

buttonsControl.forEach(buttonControl => {
	buttonControl.addEventListener('click', () => {
		if (buttonControl.dataset.select === 'true') {
			buttonControl.setAttribute('data-select', 'false');
		} else {
			buttonsControl.forEach(btn => {
				btn.setAttribute('data-select', 'false');
			});
			buttonControl.setAttribute('data-select', 'true');
		}
	});
});

varInput.addEventListener('input', () => {
	let inputValue = varInput.value.replace(/[^\d]/g,'');
	varInput.value = inputValue;
});

function showTooltip(tooltipValue, tooltipColor) {
	clearTimeout(tooltipTimer);

	tooltip.setAttribute('data-visible', `true`);
	tooltip.textContent = "#" + tooltipValue;
	tooltip.style.background = tooltipColor;

	tooltipTimer = setTimeout(() => {
		hideTooltip();
	}, 3500);
}

function hideTooltip() {
	tooltip.setAttribute('data-visible', `false`);
	tooltip.textContent = "-";
}

function outputMatrix(matrix) {
	matrixCont.textContent = "";
	matrixResult.setAttribute('data-visible', `true`);

	for (let i = 0; i < cols; i++) {
		const matrixResultCols = document.createElement('div');
		matrixResultCols.classList.add('matrix_result__cols');
		for (let w = 0; w < rows; w++) {
			const matrixResultCell = document.createElement('div');
			matrixResultCell.classList.add('matrix_result__cell')
			matrixResultCell.textContent = matrix[i][w];
			matrixResultCols.appendChild(matrixResultCell);
		}
		matrixCont.appendChild(matrixResultCols);
	}

	console.log(matrix)
}

/* backend */
const inputColumns = document.getElementById("columns");
const inputRows = document.getElementById("rows");
const generateButton = document.getElementById("generate");
let variable1;
const addBtn = document.getElementById("+");
const subtractBtn = document.getElementById("-");
const multiplyBtn = document.getElementById("*");
const divideBtn = document.getElementById("/");

let cols, rows, array = [];

generateButton.addEventListener('click', () => {
	cols = inputColumns.value;
	rows = inputRows.value;
	arrayGenerator();
});

function arrayGenerator() {
	array = [];
	if (cols == "" && rows == "") {
		showTooltip("Укажите размерность матрицы", "#FF32C6");
	}
	else if (cols !== "" && rows == "") {
		showTooltip("введите количество строк", "#1AC69C");
	}
	else if (cols == "" && rows !== "") {
		showTooltip("введите количество столбцов", "#FFAC60");
	}
	else if (cols !== "" && rows !== "") {
		hideTooltip();
		for (let i = 0; i < cols; i++) {
			array[i] = []
			for (let w = 0; w < rows; w++) {
				array[i][w] = randomInteger(-150, 150);
			}
		}
		outputMatrix(array);
	}
}

/* Кнопки сжать */
addBtn.addEventListener('click', () => {
	let newArray = [];
	variable1 = Number(varInput.value);
	if (array.length === 0) {
		showTooltip("Для начала сгенерируйте массив", "#3FA4FF");
		addBtn.setAttribute('data-select', 'false');
	} else if (variable1 === 0) {
		showTooltip("Введите число в поле", "#C478FF");
		addBtn.setAttribute('data-select', 'false');
	} else {
		if (addBtn.dataset.select === 'true') {
				for (let i = 0; i < cols; i++) {
					newArray[i] = [];
					for (let w = 0; w < rows; w++) {
						newArray[i][w] = array[i][w] + variable1;
					}
				}
				outputMatrix(newArray);
		} else {
			outputMatrix(array);
		}
	}
});

subtractBtn.addEventListener('click', () => {
	let newArray = [];
	variable1 = Number(varInput.value);
	if (array.length === 0) {
		showTooltip("Для начала сгенерируйте массив", "#3FA4FF");
		subtractBtn.setAttribute('data-select', 'false');
	} else if (variable1 === 0) {
		showTooltip("Введите число в поле", "#C478FF");
		subtractBtn.setAttribute('data-select', 'false');
	} else {
		if (subtractBtn.dataset.select === 'true') {
				for (let i = 0; i < cols; i++) {
					newArray[i] = [];
					for (let w = 0; w < rows; w++) {
						newArray[i][w] = array[i][w] - variable1;
					}
				}
				outputMatrix(newArray);
		} else {
			outputMatrix(array);
		}
	}
});

multiplyBtn.addEventListener('click', () => {
	let newArray = [];
	variable1 = Number(varInput.value);
	if (array.length === 0) {
		showTooltip("Для начала сгенерируйте массив", "#3FA4FF");
		multiplyBtn.setAttribute('data-select', 'false');
	} else if (variable1 === 0) {
		showTooltip("Введите число в поле", "#C478FF");
		multiplyBtn.setAttribute('data-select', 'false');
	} else {
		if (multiplyBtn.dataset.select === 'true') {
				for (let i = 0; i < cols; i++) {
					newArray[i] = [];
					for (let w = 0; w < rows; w++) {
						newArray[i][w] = array[i][w] * variable1;
					}
				}
				outputMatrix(newArray);
		} else {
			outputMatrix(array);
		}
	}
});

divideBtn.addEventListener('click', () => {
	let newArray = [];
	variable1 = Number(varInput.value);
	if (array.length === 0) {
		showTooltip("Для начала сгенерируйте массив", "#3FA4FF");
		divideBtn.setAttribute('data-select', 'false');
	} else if (variable1 === 0) {
		showTooltip("Введите число в поле", "#C478FF");
		divideBtn.setAttribute('data-select', 'false');
	} else {
		if (divideBtn.dataset.select === 'true') {
				for (let i = 0; i < cols; i++) {
					newArray[i] = [];
					for (let w = 0; w < rows; w++) {
						newArray[i][w] = array[i][w] / variable1;
					}
				}
				outputMatrix(newArray);
		} else {
			outputMatrix(array);
		}
	}
});

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min); // случайное число от min до (max+1)
	return Math.floor(rand);
}

