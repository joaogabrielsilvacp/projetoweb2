function cadastrarDica() {
    const materialInput = document.getElementById("materialInput");
    const dicaTextarea = document.getElementById("dica");
  
    const material = materialInput.value.toLowerCase();
    const dica = dicaTextarea.value;
  
    if (!material || !dica) {
      alert("Campos em branco.");
      return;
    }
  
    const materiaisValidos = ["plastico", "metal", "papel", "vidro", "organico"];
    if (!materiaisValidos.includes(material)) {
      materialInput.classList.add("error");
      alert("Material indicado não faz parte da lista (plástico, metal, papel, vidro e orgânico).");
      return;
    }
  
    materialInput.classList.remove("error");
  
    const novaDica = { material, dica };
  
    let listaDicas = localStorage.getItem("dicas");
    if (!listaDicas) {
      listaDicas = [];
    } else {
      listaDicas = JSON.parse(listaDicas);
    }
  
    listaDicas.push(novaDica);
  
    localStorage.setItem("dicas", JSON.stringify(listaDicas));
  
    materialInput.value = "";
    dicaTextarea.value = "";
  
    exibirDicas();
  }
  
  function excluirDica(index) {
    let listaDicas = localStorage.getItem("dicas");
    if (!listaDicas) {
      return;
    }
  
    listaDicas = JSON.parse(listaDicas);
    listaDicas.splice(index, 1);
    localStorage.setItem("dicas", JSON.stringify(listaDicas));
  
    exibirDicas();
  }
  
  function exibirDicas() {
    const listaDicasElement = document.getElementById("listaDicas");
    listaDicasElement.innerHTML = "";
  
    let listaDicas = localStorage.getItem("dicas");
    if (!listaDicas) {
      listaDicas = [];
    } else {
      listaDicas = JSON.parse(listaDicas);
    }
  
    const materialFiltroInput = document.getElementById("materialFiltroInput");
    const materialFiltro = materialFiltroInput.value.toLowerCase();
  
    if (materialFiltro) {
      listaDicas = listaDicas.filter((dica) => dica.material === materialFiltro);
    }
  
    listaDicas.forEach((dica, index) => {
      const li = document.createElement("li");
      li.textContent = `${dica.dica} - Material: ${dica.material}`;
  
      switch (dica.material) {
        case "plastico":
          li.classList.add("plastico");
          break;
        case "metal":
          li.classList.add("metal");
          break;
        case "papel":
          li.classList.add("papel");
          break;
        case "vidro":
          li.classList.add("vidro");
          break;
        case "organico":
          li.classList.add("organico");
          break;
      }
  
      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir Dica";
      btnExcluir.addEventListener("click", () => excluirDica(index));
      li.appendChild(btnExcluir);
  
      listaDicasElement.appendChild(li);
    });
  }

  function exibirHorariosColeta() {
    const horariosColetaElement = document.getElementById("horariosColeta");
    horariosColetaElement.innerHTML = "";

    const horarios = [
      "JARDIM BELA VISTA: Segunda-feira: 8h às 12h",
      "VITORDANTAS: Terça-feira: 14h às 18h",
      "PANORAMA: Quarta-feira: 8h às 12h",
      "JARDIM BANDEIRANTES: Quinta-feira: 14h às 18h",
      "BAIRRO UNIVERSITÁRIO: Sexta-feira: 8h às 12h",
    ];
  
    horarios.forEach((horario) => {
      const li = document.createElement("li");
      li.textContent = horario;
      horariosColetaElement.appendChild(li);
    });
  }
  
  function validarCampoBusca() {
    const materialFiltroInput = document.getElementById("materialFiltroInput");
    const materialFiltro = materialFiltroInput.value.toLowerCase();
  
    if (!materialFiltro) {
      alert("Informe um material a ser pesquisado.");
      return false;
    }
  
    const materiaisValidos = ["plastico", "metal", "papel", "vidro", "organico"];
    if (!materiaisValidos.includes(materialFiltro)) {
      materialFiltroInput.classList.add("error");
      alert("Material não encontrado.");
      return false;
    }
  
    materialFiltroInput.classList.remove("error");
    return true;
  }
  
  const form = document.getElementById("cadastroForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarDica();
  });
  
  const btnFiltrar = document.getElementById("btnFiltrar");
  btnFiltrar.addEventListener("click", () => {
    if (validarCampoBusca()) {
      exibirDicas();
    }
  });
  
  const btnHorariosColeta = document.getElementById("btnHorariosColeta");
  btnHorariosColeta.addEventListener("click", exibirHorariosColeta);
  
  exibirDicas();
  