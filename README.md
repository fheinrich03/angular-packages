# Angular Packages – Privates NPM Registry

Dieses Repository dient als Monorepo für Angular Component Libraries. Es kombiniert die Nutzungshinweise für Entwickler (Teil 1) mit der technischen Dokumentation zur Erstellung des Templates (Teil 2).

## Inhaltsverzeichnis

**Teil 1: Nutzung des Templates**

1. [Einleitung](#1-einleitung)
2. [Lokale Entwicklung & Setup](#2-lokale-entwicklung--setup)
2. [Privates Registry Setup](#3-privates-registry-setup)
3. [Hilfreiche Befehle](#4-hilfreiche-befehle)
4. [Workflow: Neue Komponente hinzufügen](#5-workflow-neue-komponente-hinzufügen)
5. [Workflow: Neue Library erstellen](#6-workflow-neue-library-erstellen)
6. [Workflow: Neue Story für Komponente erstellen](#7-workflow-neue-story-für-komponente-erstellen)
7. [Library veröffentlichen](#8-library-veröffentlichen)

**Teil 2: Dokumentation & Template-Erstellung**

8. [Hintergrund: Template Erstellung & Struktur](#9-hintergrund-template-erstellung--struktur)
9. [Setup: Storybook](#10-setup-storybook)
10. [Setup: Tailwind CSS](#11-setup-tailwind-css)
11. [Setup: Angular Material](#12-setup-angular-material)

---

# Teil 1: Nutzung des Templates

## 1. Einleitung

Dieses Projekt wurde mit der [Angular CLI](https://github.com/angular/angular-cli) Version **19.2.15** erstellt.
Es dient als Template für **Angular Component Libraries**, die in ein **privates NPM-Registry** hochgeladen werden können.

Eine Beispiel-Library ist bereits enthalten:
**shared-components** – `projects/shared-components`

- Angular v19
- Angular Material v19
- Material Symbols (Icons)
- Tailwind CSS v3.4
- Storybook für Component Preview und Docs

## 2. Lokale Entwicklung

### Installation

Im Workspace ausführen:
```bash
npm i  # Dev-Dependencies installieren
````

### Storybook starten

Im Workspace ausführen:
```bash
npm run storybook:[project]  # Startet Storybook für ein Projekt, z. B. shared-components
# Storybook läuft dann unter: http://localhost:6006/
```

## 3. Privates Registry Setup

Um Pakete publishen zu können (und ggf. aufzulösen), müssen Registry-URL und Auth-Token gesetzt werden. 
Dies gilt für lokale Entwicklung und CI/CD.
Pro Entwickler PC muss diese Konfiguration nur einmalig eingerichtet werden.


**1. Registry-URL setzen**

Dokumentation: [Gitea: NPM Package Registry](https://docs.gitea.com/usage/packages/npm)

```bash
# Mit Scope (empfohlen): @myscope:registry=https://mycustomregistry.example.org
npm config set <scope>:registry <registry-url>

# Oder default registry url (für alle libraries ohne scope)
npm config set registry <registry-url>
```

**2. Auth-Token setzen**
Das Token ist ein **Personal Access Token (PAT)** aus Gitea (Profil → Einstellungen → Anwendungen). Es benötigt **Lese- und Schreibrechte für Packages**.

```bash
npm config set //<registry-url>:_authToken="<auth-token>"
```

**3. Firmen Zertifikat setzen**
Für den Zugriff auf Gitea müssen wir für NPM entweder:
- Das Firmen Zertifkat bereitstellen (empfohlen)
- ODER in der NPM config strict-ssl auf false setzen

Option A: Firmen Zeritifkat bereitstellen (empfohlen)
```bash
npm config set cafile "C:\Users\<your-user>\.cert\firm-certificate.pem" # Pfad zum Firmen Zertifikat setzen (empfohlen)
```

Option B: In der NPM config strict-ssl auf false setzen
```bash
npm config set strict-ssl false # (strict ssl deaktivieren)
```

## 4. Hilfreiche Befehle

```bash
npm run build   # Baut alle Projekte im Workspace
npm run test    # Führt Unit-Tests mit Karma aus (für alle Projekte)
```

## 5. Workflow: Neue Komponente hinzufügen

Komponenten können aus bestehenden Projekten ausgelagert oder neu erstellt werden.

```bash
ng generate component <component-name> --project=<lib-name>
```

### Wichtige Hinweise zur Struktur

  * **Aufteilung:** Komponenten sollten je nach Art in verschiedene Packages (Libraries) aufgeteilt werden (z. B. `shared-components`, `ui`, `utils`).
  * **Storybook:** Damit die Komponente in Storybook sichtbar wird, muss eine `.stories.ts` Datei im `stories`-Ordner der jeweiligen Library erstellt werden.

### Peer Dependencies handhaben

Benötigt eine Komponente externe Abhängigkeiten (z. B. `@angular/material` für UI-Komponenten), müssen diese korrekt markiert werden:

1.  **Für die Nutzung der Library (Consumer):**
    In `projects/<library-name>/package.json` unter `peerDependencies` eintragen.
2.  **Für die lokale Entwicklung der Library:**
    In `<repo-root>/package.json` unter `devDependencies` eintragen.

## 6. Workflow: Neue Library erstellen

```bash
# Mit Scope (empfohlen): ng generate library @scope/library-name
ng generate library <lib-name>   # erstellt die Library unter /projects
```

## 7. Workflow: Neue Story für Komponente erstellen

  - Unter `projects/<lib-name>/src/lib` liegen die Components der Library.
  - Unter `projects/<lib-name>/src/stories` können Stories hinzugefügt werden (jeweils eine `Story` pro Komponente).
  - Im Storybook Web Server werden nur die Komponenten angezeigt, für die eine `Story` konfiguriert ist.
  - Dokumentation: [Storybook - Stories erstellen](https://storybook.js.org/docs/get-started/whats-a-story#create-a-new-story)

### Library als NPM Package initialisieren

```bash
npm init ./projects/<lib-name>
# Vergib einen sinnvollen Namen, z. B. @angular-packages/shared-components
```

## 8. Library veröffentlichen

### Voraussetzungen

  * Registry-URL und Auth Token sind gesetzt (siehe [Privates Registry Setup](#3-privates-registry-setup)).
  * Der Nutzer muss Schreibrechte auf das NPM Registry haben (z.b. Mitglied in der Gitea Organisation)

### Publish-Vorgang

1.  **Version setzen**

    ```bash
    npm version x.x.x --prefix projects/<lib-name>   # Beispiel: 1.0.0
    ```

2.  **Library bauen**

    ```bash
    ng build <lib-name> --configuration production
    # oder falls Skript vorhanden: npm run build:<lib-name>
    ```

3.  **Veröffentlichen**

    ```bash
    npm publish ./dist/<lib-name>
    ```

-----

# Teil 2: Dokumentation & Template-Erstellung

Dieser Teil beschreibt, wie das Template erstellt wurde und wie der Workspace konfiguriert oder erweitert werden kann (z. B. Tailwind/Storybook Integration).

## 9. Hintergrund: Template Erstellung & Struktur

Basis-Dokumentation: [Angular Libraries Creating](https://angular.dev/tools/libraries/creating-libraries)

### Workspace initialisieren

Der Workspace wurde wie folgt erstellt:

```bash
ng new <my-workspace> --no-create-application
cd <my-workspace>
git remote add origin git@localhost:test-org/my-lib.git
```

### Verzeichnisstruktur

Der Workspace ist für mehrere Libraries ausgelegt:

```txt
<workspace>
|-- README.md
|-- angular.json
|-- package.json
|-- projects
|   `-- <lib-name>          # z.B. shared-components
|       |-- ng-package.json
|       |-- package.json
|       |-- src
|       |   |-- lib
|       |   `-- public-api.ts
```

## 10. Setup: Storybook

Tutorials: 
- [RubenR Dev](https://rubenr.dev/angular-libraries-storybook/)
- [Dev.to Guide](https://dev.to/saulodias/angular-library-storybook-44ma)

### Initialisierung

1.  **Storybook initialisieren**

    Im Workspace Root Verzeichnis ausführen:

    ```bash
    npx sb init
    ```

2.  **CSS Datei erstellen:**

      - Erstelle `projects/<lib-name>/src/styles.css`
      - Diese Datei ist nur für das Storybook Preview und enthält die globalen styles der Library

### Konfiguration in angular.json

Stelle sicher, dass der Builder und die Konfigurationspfade korrekt gesetzt sind:

  - in `styles` referenziere die eben erstellte `styles.css`

<!-- end list -->

```json
"storybook": {
  "builder": "@storybook/angular:start-storybook",
  "options": {
    "configDir": "projects/<lib-name>/.storybook",
    "browserTarget": "<lib-name>:build",
    "compodoc": true,
    "compodocArgs": ["-e", "json", "-d", "projects/<lib-name>"],
    "port": 6006,
    "styles": [
      "projects/<lib-name>/src/styles.css"
    ]
  }
}
```

## 11. Setup: Tailwind CSS

Das Template nutzt Tailwind CSS v3.
- Die Tailwind Klassen können im Storybook Preview aufgelöst werden. Das Setup dafür ist folgend beschrieben.
- Im Storybook Preview wir die `tailwind.config.js` (inkl. Theme) vom Workspace Root angewendet
- Im Consumer Projekt wird die `tailwind.config.js` (inkl. Theme) vom Consumer Projekt angewendet

Tailwind wurde wie folgt in diesem Template installiert:

### A) Globale Initialisierung (Workspace Root)

1.  **Installation:**

    ```bash
    npm install -D tailwindcss@3
    npx tailwindcss init
    ```

2.  **Konfiguration (`tailwind.config.js` im Root):**

    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./projects/**/*.{html,ts}",
        "./stories/**/*.{html,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

### B) Library-spezifische Einrichtung

Damit Tailwind in einer Library (und deren Storybook) funktioniert:

1.  **Peer Dependency:**
    Damit Tailwind im Consumer Projekt als Dependency mit installiert wird.
    In `projects/<lib-name>/package.json`:

    ```json
    "peerDependencies": {
      "tailwindcss": "^3.4.18"
    }
    ```
2.  **Tailwind directives hinzufügen**
    Das ist nur notwendig um die Tailwind Styles im Storybook Preview zu sehen.
    Füge die Directives in `projects/<lib-name>/src/styles.css` hinzu:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## 12. Setup: Angular Material

Das Template nutzt Angular Material v19 und Material Symbols
- Die Angular Material Komponenten und Symbols können im Storybook Preview aufgelöst werden. Das Setup dafür ist folgend beschrieben.
- Im Storybook Preview übernimmt Angular Material das Theme und die Styles von `projects/<lib-name>/src/styles.css`.
- Im Consumer Projekt werden Theme und Styles von vom Consumer Projekt angewendet (i.d.R. in der globalen `styles.css` definiert)

1. **Angular Material hinzufügen**
    Im Workspace Root ausführen
    ```bash
    ng add @angular/material
    npm i material-symbols@latest
    ```
    
    In `projects/<lib-name>/package.json`:
    Peer Dependencies hinzufügen im Block `peerDependencies`
    - `"@angular/material": "^19.2.17",`
    - `"material-symbols": "^0.40.2"`
    
2. **Angular Material in Storybook Preview aktivieren** 

    Theme erstellen (prebuilt oder custom): [Angular Material Theming v19](https://v19.material.angular.dev/guide/getting-started)
    
    In `projects/<lib-name>/src/theme.css`:
    ```css
    // Beispiel: Minimales Theme mit prebuilt color (blue)
    @use "@angular/material" as mat;
    
    html {
      @include mat.theme(
        (
          color: mat.$blue-palette,
        )
      );
    }
    ```
    
   In `projects/<lib-name>/src/styles.css` das Angular Material Theme und Material Symbols importieren
    ```css
    @use "./theme" as *;
    
    @import "material-symbols";
    ```