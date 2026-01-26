
const API_URL = "http://localhost:5000/entries";

const archiveList = document.getElementById("archive-list");
const resumoContent = document.getElementById("resumo-content");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const archiveForm = document.getElementById("archive-form");
const entryIdInput = document.getElementById("entry-id");
const entryNameInput = document.getElementById("entry-name");
const entryTypeInput = document.getElementById("entry-type");
const entryDangerInput = document.getElementById("entry-danger");
const entryDescriptionInput = document.getElementById("entry-description");

const addButton = document.getElementById("add-button");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search-button");

let allEntries = [];

async function fetchEntries() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        allEntries = data;
        renderEntries(allEntries);
        updateResumoDefault();
    } catch (error) {
        console.error("Erro:", error);
        archiveList.innerHTML = "<p style='color:red'>Erro ao carregar dados do servidor.</p>";
    }
}

async function saveEntry(entry) {
    const isEdit = !!entry.id;
    const url = isEdit ? `${API_URL}/${entry.id}` : API_URL;
    const method = isEdit ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });

        if (!response.ok) throw new Error("Erro ao salvar");

        closeModal();
        fetchEntries();
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar registro.");
    }
}

async function deleteEntry(id) {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao excluir");

        fetchEntries();
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir registro.");
    }
}

function renderEntries(entries) {
    archiveList.innerHTML = "";

    if (entries.length === 0) {
        archiveList.innerHTML = "<p style='color: white;'>Nenhum registro encontrado.</p>";
        return;
    }

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.className = "archive";

        let statusColor = "#49c418";
        const danger = (entry.dangerLevel || "").toLowerCase();
        if (danger.includes("médio") || danger.includes("medio")) statusColor = "#e48912";
        if (danger.includes("alto") || danger.includes("high")) statusColor = "#ff4d4d";
        if (danger.includes("extremo") || danger.includes("extreme") || danger.includes("fatal")) statusColor = "#ff0000";

        const entryName = entry.name || entry.Agent || "Desconhecido";

        card.innerHTML = `
            <div class="archive-info" onclick="showDetails('${entry.id}')">
                <div class="status" style="background-color: ${statusColor};"></div>
                <h3 class="arquichive-atributo">${entryName}</h3>
                <h3 class="arquichive-atributo">${entry.type || "-"}</h3>
                <h3 class="arquichive-atributo">${entry.dangerLevel || "-"}</h3>
            </div>
            <div class="archive-actions">
                <button class="action-btn edit-btn" onclick="openEditModal('${entry.id}')">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteEntry('${entry.id}')">Excluir</button>
            </div>
        `;

        archiveList.appendChild(card);
    });
}

function showDetails(id) {
    const entry = allEntries.find(e => e.id === id);
    if (!entry) return;

    const entryName = entry.name || entry.Agent || "Desconhecido";

    resumoContent.innerHTML = `
        <h3>${entryName}</h3>
        <p><strong>ID:</strong> ${entry.id}</p>
        <p><strong>Tipo:</strong> ${entry.type || "-"}</p>
        <p><strong>Nível de Perigo:</strong> ${entry.dangerLevel || "-"}</p>
        <br>
        <p><strong>Descrição:</strong></p>
        <p>${entry.description || "Sem descrição."}</p>
    `;
}

function updateResumoDefault() {
    resumoContent.innerHTML = `
        <p>Total de registros: ${allEntries.length}</p>
        <p>Selecione um item para ver os detalhes.</p>
    `;
}

function openModal() {
    archiveForm.reset();
    entryIdInput.value = "";
    modalTitle.textContent = "Novo Registro";
    modalOverlay.classList.remove("hidden");
}

function openEditModal(id) {
    const entry = allEntries.find(e => e.id === id || e.id == id);
    if (!entry) return;

    entryIdInput.value = entry.id;
    entryNameInput.value = entry.name || entry.Agent || "";
    entryTypeInput.value = entry.type;
    entryDangerInput.value = entry.dangerLevel;
    entryDescriptionInput.value = entry.description;

    modalTitle.textContent = "Editar Registro";
    modalOverlay.classList.remove("hidden");
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

window.addEventListener("load", fetchEntries);

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
});

cancelBtn.addEventListener("click", closeModal);

archiveForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const entry = {
        name: entryNameInput.value,
        type: entryTypeInput.value,
        dangerLevel: entryDangerInput.value,
        description: entryDescriptionInput.value,
        status: "active"
    };

    if (entryIdInput.value) {
        entry.id = entryIdInput.value;
    }

    saveEntry(entry);
});

searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allEntries.filter(entry => {
        const name = (entry.name || entry.Agent || "").toLowerCase();
        const type = (entry.type || "").toLowerCase();
        return name.includes(term) || type.includes(term);
    });
    renderEntries(filtered);
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});