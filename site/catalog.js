(function () {
  var payload = window.SCHEMASPY_CATALOG;
  var selector = document.getElementById("server-selector");
  var tableBody = document.getElementById("database-table-body");
  var statusMessage = document.getElementById("status-message");

  function showStatus(message) {
    statusMessage.textContent = message;
    statusMessage.style.display = "block";
  }

  function hideStatus() {
    statusMessage.textContent = "";
    statusMessage.style.display = "none";
  }

  function clearTable() {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }

  function appendRow(name, description, link) {
    var row = document.createElement("tr");

    var dbCell = document.createElement("td");
    dbCell.className = "detail";

    if (link) {
      var dbLink = document.createElement("a");
      dbLink.href = link;
      dbLink.target = "_blank";
      dbLink.rel = "noopener noreferrer";
      dbLink.textContent = name;
      dbCell.appendChild(dbLink);
    } else {
      dbCell.textContent = name;
    }

    var descriptionCell = document.createElement("td");
    descriptionCell.className = "comment detail";
    descriptionCell.style.display = "table-cell";
    descriptionCell.textContent = description || "";

    row.appendChild(dbCell);
    row.appendChild(descriptionCell);
    tableBody.appendChild(row);
  }

  function renderDatabases(server) {
    clearTable();

    var databases = server && Array.isArray(server.databases) ? server.databases : [];
    if (databases.length === 0) {
      appendRow("-", "No hi ha bases de dades", "");
      return;
    }

    databases.forEach(function (db) {
      appendRow(db.name || "-", db.description || "", db.link || "");
    });
  }

  function initSelector(servers) {
    selector.innerHTML = "";

    servers.forEach(function (server, index) {
      var option = document.createElement("option");
      option.value = server.id || String(index);
      option.textContent = server.name || server.id || ("Server " + (index + 1));
      selector.appendChild(option);
    });

    selector.addEventListener("change", function (event) {
      var selectedValue = event.target.value;
      var selectedServer = servers.find(function (server, index) {
        var serverId = server.id || String(index);
        return serverId === selectedValue;
      });

      renderDatabases(selectedServer || null);
    });

    if (servers.length > 0) {
      selector.value = servers[0].id || "0";
      renderDatabases(servers[0]);
    }
  }

  if (!payload || !Array.isArray(payload.servers)) {
    clearTable();
    selector.innerHTML = "";
    appendRow("-", "There are no databases.", "");
    showStatus("Failed to load server catalog (invalid format). Please check ./site/data/catalog.data.js");
    return;
  }

  hideStatus();

  if (payload.servers.length === 0) {
    selector.innerHTML = "";
    appendRow("-", "There are no configured servers.", "");
    return;
  }

  initSelector(payload.servers);
})();