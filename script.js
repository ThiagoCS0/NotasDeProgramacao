const lel = ['.dia', '.mes', '.ano', '.linguagem'], ano = [], mes = [], dia = [], linguagem = ['C#', 'C++', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'Ruby', 'Assembly', 'PHP', 'C', 'Lua', 'Rust', 'TypeScript', 'Kotlin', 'Go', 'Objective-C', 'Swift', 'R'];
const tabela = document.getElementById('tabelaConsulta'), dados = document.querySelectorAll('.add'),
	abrir = document.getElementById('abrirArquivo');
let idlinha = 0;
abrir.addEventListener('change', (event) => {
	const arquivo = event.target.files[0], ler = new FileReader();
	ler.onload = function () { const texto = ler.result; Ler(texto); }
	ler.readAsText(arquivo);
})
function Criar(ls, el, iin, ifn) {
	const elm = document.querySelectorAll('.' + el);
	elm.forEach(emt => {
		if (ls != linguagem) { for (; iin <= ifn; iin++) { ls.push(iin); } } else { linguagem.sort(); }
		ls.forEach(x => { let y = document.createElement('option'); y.value = x; y.innerText = x; emt.appendChild(y); });
	});
}
function Paginas(p) {
	Limpar();
	const s = document.querySelectorAll('section');
	s.forEach(x => {
		x.setAttribute('style', 'display:' + (x.id != p ? 'none;' : 'flex;'));
	});
}
function Requerido(e) {
	if (e.value.length > 0) { e.setAttribute('style', 'border: none;'); } else { e.setAttribute('style', 'border: 1px solid red;'); }
}
function Adicionar() {
	if (dados.length == 6 && dados[0].value.length > 0 && dados[4].value.length > 0) {
		AdcTabela(dados, false);
		registerTask();
		Limpar();
		dados[0].setAttribute('style', 'border: 1px solid red;');
		dados[4].setAttribute('style', 'border: 1px solid red;');
	}
}
function AdcTabela(linha, carregar) {
	const v1 = carregar ? linha[0].length : linha[0].value.length, v2 = carregar ? linha[4].length : linha[4].value.length;
	if (linha.length == 6 && v1 > 0 && v2 > 0) {
		let tr_linha = document.createElement('tr');
		for (let i = 0; i < linha.length; i++) {
			let td_celulas = document.createElement('td');
			if (i > 0 && i < 5) { td_celulas.setAttribute('style', 'text-align: center;') }
			td_celulas.innerText = carregar ? linha[i] : linha[i].value;
			tr_linha.appendChild(td_celulas);
		}
		tr_linha.id = `i${Aleatorio()}${Agora(false)}`;
		tr_linha.classList.add('linhas');
		tr_linha.onclick = LinhaAtual;
		tabela.appendChild(tr_linha);
	} else { return; }
}
function Aleatorio() {
	return Math.ceil(Math.random() * 100000);
}
function Limpar() {
	lel.forEach(x => { const y = document.querySelectorAll(x); y.forEach(z => { z.options[0].selected = 'selected'; }) })
	document.querySelectorAll('.titulo').forEach(x => { x.value = ''; })
	document.querySelector('.descricao').value = '';
}
function Hoje() {
	const a = document.querySelectorAll('.calendario');
	const d = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()]
	for (let i = 0; i < a.length; i++) { a[i].value = d[i < 3 ? i : i - 3]; };
}
document.getElementById("busca").addEventListener('keypress', function (event) {
	if (event.key === "Enter") { Buscar(); }
});
function diasNoMes() {
	const ano = new Date().getFullYear();
	const diasNesteMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return diasNesteMes[new Date().getMonth()];
}
function Buscar() {
	LinhasLimparSelecao();
	const tab = document.querySelectorAll('#tabelaConsulta tr'), bsc = document.querySelector('#busca');
	if (tab.length > 1) {
		const calD = document.getElementById('consultaDia'), calM = document.getElementById('consultaMes'), calA = document.getElementById('consultaAno'), Ling = document.getElementById('consultaLingua');
		const dia = calD.options[calD.selectedIndex].text, mes = calM.options[calM.selectedIndex].text, ano = calA.options[calA.selectedIndex].text, lin = Ling.options[Ling.selectedIndex].text;
		const bDia = !dia.includes("DIA"), bMes = !mes.includes("MÊS"), bAno = !ano.includes("ANO"), bLin = !lin.includes("LINGUAGEM"), bBsc = bsc.value.length > 0;
		var linha; let i = 0, f = 0;
		tab.forEach(linhaAtual => {
			const celulas = linhaAtual.querySelectorAll('td');
			if (linhaAtual.id != "cabecalho") {
				if (bDia) { i++; } if (bMes) { i++; } if (bAno) { i++; } if (bBsc) { i++; } if (bLin) { i++; }
				if (bDia && celulas[1].innerText == dia) { f++; } if (bMes && celulas[2].innerText == mes) { f++; } if (bAno && celulas[3].innerText == ano) { f++; }
				if (bBsc && celulas[0].innerText.toLowerCase().includes(bsc.value.toLowerCase())) { f++; } if (bLin && celulas[4].innerText == lin) { f++; }
				if (i != 0 && i == f) { linhaAtual.classList.toggle('linhaSelec'); }
				i = f = 0;
			}
		});
	}
}
function LinhaAtual(e) {
	LinhasLimparSelecao();
	e.currentTarget.classList.toggle('linhaSelec');
	idlinha = e.currentTarget.id;
}
function ApagarLinha() {
	document.getElementById(`${idlinha}`)?.remove();
}
function LinhasLimparSelecao() {
	document.querySelectorAll('.linhas').forEach(l => { l.classList.remove('linhaSelec'); });
}
function Agora(completo) {
	const a = `${new Date().getDate().toString().padStart(2, '0')}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getFullYear()}`;
	const b = `${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;
	const r = completo ? a + b : b;
	return r;
}
function LimparTabela() {
	const trs = tabela.querySelectorAll('tr');
	if (trs.length > 0) { trs.forEach(x => { if (x.id != "cabecalho") { x.remove(); } }); }
}
function Ler(texto) {
	LimparTabela();
	let linhas = texto.split('§');
	linhas.forEach((x) => {
		let linha = x.split('₢');
		AdcTabela(linha, true);
	});
}
function Salvar() {
	let tx = "", f = '0'; const tb = document.querySelectorAll('#tabelaConsulta td'); let l = '';
	for (let i = 0; i < tb.length; i++) {
		if (f != 5) { l = '₢'; f++; } else { if (i != tb.length - 1) { l = '§'; } else { l = ''; } f = 0; }
		tx += tb[i].innerText + l;
	}
	const link = document.createElement("a"); link.style.setProperty('display', 'none');
	link.href = URL.createObjectURL(new Blob([tx], { type: 'text/plain' }));
	link.download = `Dados[${Agora(true)}].txt`;
	link.click();
	URL.revokeObjectURL(link.href);
	link.remove();
}
function ImExportar(importar) {
	if (importar) {
		abrir.click()
	} else {
		Salvar();
	};
}
function M(m) { console.log(m); };
Criar(dia, 'dia', 1, diasNoMes()); Criar(mes, 'mes', 1, 12); Criar(ano, 'ano', 2024, 2050); Criar(linguagem, 'linguagem', null, null);



// --------------------- Exercicio da aula 23
class Task {
	constructor(titulo, dia, mes, ano, linguagem, descricao) {
		this.titulo = titulo; this.dia = dia; this.mes = mes; this.ano = ano; this.linguagem = linguagem; this.descricao = descricao
	}
	validadeData() { for (let i in this) { if (this[i] === undefined || this[i] === "") { return false } }; return true; }
}
class Database {
	constructor() { const id = localStorage.getItem('id'); if (id == null) { localStorage.setItem('id', 0) } }
	createTask(task) { const id = getId(); localStorage.setItem('id', id); localStorage.setItem(id, JSON.stringify(task)); }
	deleteTask() {
		localStorage.removeItem(2);
		//localStorage.clear();
	}
}
function getId() { let id = localStorage.getItem('id'); return parseInt(id == "NaN" ? 0 : id == null ? 0 : id) + 1; }
function registerTask() {
	const titulo = document.getElementById("cadTit").value, dia = document.getElementById("cadDia").value,
		mes = document.getElementById("cadMes").value, ano = document.getElementById("cadAno").value,
		linguagem = document.getElementById("cadLin").value, descricao = document.getElementById("cadDes").value;
	const task = new Task(titulo, dia, mes, ano, linguagem, descricao);
	if (task.validadeData()) { db.createTask(task); }
}
const db = new Database();
