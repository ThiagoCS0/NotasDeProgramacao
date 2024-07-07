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
function Inicio() {

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
		Limpar();
		dados[0].setAttribute('style', 'border: 1px solid red;');
		dados[4].setAttribute('style', 'border: 1px solid red;');
	}
}
function AdcTabela(linha, carregar) {
	const v1 = carregar ? linha[0].length : linha[0].value.length, v2 = carregar ? linha[4].length : linha[4].value.length;
	if (linha.length == 6 && v1 > 0 && v2 > 0) {
		let tr = document.createElement('tr');
		for (let i = 0; i < linha.length; i++) {
			let td = document.createElement('td');
			if (i > 0 && i < 5) { td.setAttribute('style', 'text-align: center;') }
			td.innerText = carregar ? linha[i] : linha[i].value;
			tr.appendChild(td);
		}
		tr.id = `i${Aleatorio()}${Agora(false)}`;
		tr.classList.add('linhas');
		tr.onclick = LinhaAtual;
		tabela.appendChild(tr);
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
	for (let i = 0; i < a.length; i++)(a[i].value = d[i < 3 ? i : i - 3]);
}
function Ir() {
	// BUSCAR NA TABELA
	document.querySelectorAll(".cst").forEach(z => { M(".:" + z.tagName == 'INPUT' ? z.innerText : z.value); })
}
function LinhaAtual(e) {
	LinhasLimparSelecao();
	e.currentTarget.classList.toggle('linhaSelec');
	idlinha = e.currentTarget.id;
}
function ApagarLinha() {
	document.getElementById(`${idlinha}`).remove();
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
	if (trs.length > 0) { trs.forEach(x => { x.remove(); }); }
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

}
function ImExportar(importar) {
	if (importar) {
		abrir.click()
	} else {
		Salvar();
	};
}
function M(m) { console.log(m); };
Criar(dia, 'dia', 1, 30); Criar(mes, 'mes', 1, 12); Criar(ano, 'ano', 2020, 2024); Criar(linguagem, 'linguagem', null, null);
Inicio();