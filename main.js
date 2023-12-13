"use strict";

/* frontend */
const inputs = document.querySelectorAll(".input_control");
const clearBtn = document.getElementById('clear');
const tooltip = document.getElementById('tooltip');
let tooltipTimer;
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
	//matrixCont.textContent = "";
	inputs.forEach(input => {
		input.value = "";
	});
	clearBtn.setAttribute('data-visible', `false`);
	array = [];
	console.log(array)
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
}

function outputMatrix() {
	matrixCont.textContent = "";
	matrixResult.setAttribute('data-visible', `true`);

	for (let i = 0; i < cols; i++) {
		const matrixResultCols = document.createElement('div');
		matrixResultCols.classList.add('matrix_result__cols');
		for (let w = 0; w < rows; w++) {
			const matrixResultCell = document.createElement('div');
			matrixResultCell.classList.add('matrix_result__cell')
			matrixResultCell.textContent = array[i][w];
			matrixResultCols.appendChild(matrixResultCell);
		}
		matrixCont.appendChild(matrixResultCols);
	}

	console.log(array)
}

/* backend */
const inputColumns = document.getElementById("columns");
const inputRows = document.getElementById("rows");
const generateButton = document.getElementById("generate");

let cols, rows, array;

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
		outputMatrix();
	}
}

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min); // случайное число от min до (max+1)
	return Math.floor(rand);
}

