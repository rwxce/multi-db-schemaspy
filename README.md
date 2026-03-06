# SchemaSpy Docker for Informix and other DBs

**SchemaSpy Docker** is a Docker-based project designed to generate documentation for **Informix databases and other DBs** using [SchemaSpy](https://schemaspy.org/).
It simplifies connecting to, analyzing, and visualizing the structure of an Informix database — all inside a lightweight, dependency-free container.

---

## 🧩 Features

* **Automatic documentation**: Generates full HTML reports of the database structure, relationships, and keys.

* **Docker-based execution**: Everything runs in an isolated, reproducible container environment.

* **Native Informix connection**: Uses the Informix JDBC driver for direct connections.

* **Web output**: Produces browsable documentation (`index.html`).

* **Flexible configuration**: All parameters are customizable via `.env` files and property templates.

* **Multi-database support**:
  The project is designed to handle **multiple Informix databases** easily.
  Just copy one existing database directory and rename it, e.g.:

  ```
  db/
  ├── db-analytics/
  ├── db-inventory/
  ├── db-customers/
  ```

  Each database folder can have its own `.env`, `output/`, and configuration.
  This allows you to generate documentation for multiple databases independently.

* **Centralized `site` folder for database links**: A folder named `site` located in the **root of the project**. Its purpose is to centralize links to the `index.html` files generated for each database output.

   * All database outputs (`output/db/index.html`) should be linked in the `site/index.html` file.
   * When adding a new database, include its link inside the **Databases Link** section.
   * Update the `<a href="...">` and `<p>` content to reflect the new database’s name and description.
   * This setup ensures that all database documentation is accessible from a single, centralized HTML page (`site/index.html`).

* **Custom schema metadata**:
  Inside each database folder, you can optionally include an XML file to provide **manual documentation** or **custom descriptions** for databases, tables, columns, and relationships.
  To do this, create the following file:

  ```
  db/db-analytics/metadata/schema.meta.xml
  ```

  The XML file should follow the structure of the official SchemaSpy metadata format.
  An example of this structure is already included in the repository for reference.

  When present, this file is automatically used by SchemaSpy to **enhance the generated documentation** with these descriptions.

---

## 🚀 Installation and Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/rwxce/schemaspy-informix.git
   cd schemaspy-informix
   ```

2. **Make sure Docker is running**

   Ensure both Docker and Docker Compose are installed and active.

3. **Create your `.env` file**

   Copy the example file and edit your connection details:

   ```bash
   cp ./db/db-analytics/env/.env.example ./db/db-analytics/env/.env
   ```

   Available variables:

   ```
   INFORMIX_HOST=
   INFORMIX_PORT=
   INFORMIX_SERVER=
   INFORMIX_DBNAME=
   INFORMIX_USER=
   INFORMIX_PASSWORD=
   ```

4. **Download the Informix JDBC driver**

   Go to:
   🔗 [https://repo1.maven.org/maven2/com/ibm/informix/jdbc/](https://repo1.maven.org/maven2/com/ibm/informix/jdbc)

   * Find the **latest compatible version** for your Informix setup.
   * Download the `.jar` file.
   * Place it inside:

     ```
     ./drivers/
     ```

5. **Run SchemaSpy**

   ```bash
   docker compose up
   ```

6. **View the generated documentation**

   After execution, open:

   ```
   ./db/db-analytics/output/index.html
   ```

---

## ⚙️ Additional Configuration

* You can modify `schemaspy.properties.template` to adjust JDBC parameters, output path, or advanced settings.
* The container automatically replaces environment variables using `envsubst` before running SchemaSpy.
* If a `metadata/schema.meta.xml` file exists, SchemaSpy will automatically apply it to enrich the generated output.

---

## 🧾 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more details.

---

## 📬 Contact

For questions or suggestions, contact:
**[148581386+rwxce@users.noreply.github.com](mailto:148581386+rwxce@users.noreply.github.com)**
