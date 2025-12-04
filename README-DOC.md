# Angular Packages – Privates NPM Registry

## Gliederung

1. [Einleitung](#1-einleitung)
2. [Lokale Entwicklung](#2-lokale-entwicklung)
3. [Hilfreiche Befehle](#3-hilfreiche-befehle)
4. [Neue Komponente hinzufügen](#4-neue-komponente-hinzufügen)
5. [Neue Library erstellen](#5-neue-library-erstellen)
6. [Library veröffentlichen](#6-library-veröffentlichen)
7. [Dokumentation: Template selbst erstellen & nutzen](#7-dokumentation-template-selbst-erstellen--nutzen)

---

# 1. Einleitung

Es dient als Template für **Angular Component Libraries**, die in ein **privates NPM-Registry** hochgeladen werden können.

Eine Beispiel-Library ist bereits enthalten:  
`projects/shared-components`

---

# 2. Lokale Entwicklung

```bash
npm i                 # Dev-Dependencies installieren
npm run storybook:[project]  # Startet Storybook für ein Projekt, z. B. shared-components
# Storybook läuft dann unter: http://localhost:6006/
```

---

# 3. Hilfreiche Befehle

```bash
npm run build   # Baut alle Projekte
npm run test    # Führt Unit-Tests mit Karma aus (für alle Projekte)
```

---

# 4. Neue Komponente hinzufügen

- Komponenten können jetzt aus bestehenden Projekten ausgelagert werden
- Oder es können neue Komponenten erstellt werden mit
  - `ng generate component <component-name> --project=<lib-name>`
- Hinweise:
  - Die Komponenten sollten je nach Art in verschiedene Packages aufgeteilt werden
    - z.b. `shared-components`, `ui`, `utils`, usw.
    - Ein Packge entspricht dabei einer Library
  - ggf. also vorher eine neue library erstellen (Siehe "Eine Library erstellen")
- `ng generate library <library-name>`

### Peer Dependencies setzen

- ggf. benötigen die Komponenten Dependencies
- Dann müssen sie in der Library als `peerDependencies` markiert werden
- z.B. `@angular/material` (wird für UI-Components verwendet)
- `peerDependencies` setzen in
  - **für Installieren der Library später**: `projects/<library-name>/package.json` als `peerDependency`
  - **für lokales Entwickeln der Library**: UND unter `<repo-root>/package.json` als `devDependency`

**Storybook**

- Damit die Komponente in **Storybook** sichtbar wird, muss zusätzlich eine `.stories.ts` Datei im `stories`-Ordner erstellt werden.

---

# 5. Neue Library erstellen

```bash
ng generate library <lib-name>   # erstellt die Library unter /projects
```

### Registry-URL setzen

```bash
npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>
```

### Library als NPM Package initialisieren

```bash
npm init ./projects/<lib-name>
# Vergib einen sinnvollen Namen, z. B. @angular-packages/shared-components
```

---

# 6. Library veröffentlichen

## Voraussetzungen (nur einmal einrichten)

### 1. Registry-URL setzen

```bash
npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>
```

### 2. Auth-Token setzen

```bash
npm config set //<registry-url>:_authToken="<auth-token>"
```

Hinweis:  
Das Token ist ein **Person Access Token (PAT)** aus Gitea:  
Profil → Einstellungen → Anwendungen → Neuen Token erzeugen  
Es benötigt **Lese- und Schreibrechte für Packages**.

---

## Publish-Vorgang

### 1. Version setzen

```bash
npm version x.x.x --prefix projects/<lib-name>
```

### 2. Library bauen

```bash
ng build <lib-name> --configuration production
```

### 3. Veröffentlichen

```bash
npm publish ./dist/<lib-name>
```

---

# 7. Dokumentation: Template selbst erstellen & nutzen

Erstellen von Angular Libraries: [Dokumentation](https://angular.dev/tools/libraries/creating-libraries#peer-dependencies)

### Hinweise (Struktur & Benennung):

- in dem Workspace können später mehrere libraries hinzugefügt werden
- eine Sinnvolle Benennung wäre z.b.
- Workspace: `angular packages`
- Library: `shared-components`, `ui`, `utils`, usw.

## Workspace und Repository erstellen

```bash
ng new <my-workspace> --no-create-application
cd <my-workspace>
git remote add origin git@localhost:test-org/my-lib.git
```

## Library erstellen

```bash
ng generate library <lib-name>
npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>
npm init ./projects/<lib-name>
```

### Verzeichnisstruktur

```txt
<workspace>
|-- README.md
|-- angular.json
|-- package.json
|-- projects
|   `-- <lib-name>
|       |-- README.md
|       |-- eslint.config.js
|       |-- ng-package.json
|       |-- package.json
|       |-- src
|       |   |-- lib
|       |   |   |-- component1
|       |   |   `-- component2
|       |   |-- public-api.ts
```

## Komponenten zur Library hinzufügen

```bash
ng generate component <component-name> --project=<lib-name>
```

## Peer Dependencies setzen

- In `projects/<lib-name>/package.json` → `peerDependencies`
- In Root `package.json` → `devDependencies`

---

## Storybook Setup (optional)

```bash
npx sb init
```

Das folgende Projekt in `angular.json` hinzufügen (siehe: [Dokumentation](https://dev.to/saulodias/angular-library-storybook-44ma))

```json
"storybook": {
      "projectType": "application",
      "root": "stories",
      "sourceRoot": "stories",
      "architect": {
        "build": {
          "options": {
            "tsConfig": "tsconfig.json",
            "styles": [],
            "scripts": []
          }
        }
      }
    }
  }
```

---

## Registry & Auth für lokale Entwicklung und CI/CD

- Um die Pakete aufzulösen muss die Registry-URL und ein Auth Token angegeben werden um sich bei dem Registry (Gitea) zu authentifizieren
- Beide der folgenden Commands müssen nur einmal für die Umgebung ausgeführt werden
- Dieser Ablauf funktioniert für die lokale Entwicklung und CI/CD

### Registry setzen

```bash
npm config set @scope:registry https://gitea.example.com/api/packages/{owner}/npm/
```

### Auth-Token setzen

```bash
npm config set //<registry-url>:_authToken="<auth-token>"
```

Hinweis:  
Das Token ist ein **Person Access Token (PAT)** aus Gitea:  
Profil → Einstellungen → Anwendungen → Neuen Token erzeugen  
Es benötigt **Lese- und Schreibrechte für Packages**.

---
