# Angular Packages – Privates NPM Registry

## Gliederung
1. [Einleitung](#1-einleitung)
2. [Lokale Entwicklung](#2-lokale-entwicklung)
3. [Hilfreiche Befehle](#3-hilfreiche-befehle)
4. [Neue Komponente hinzufügen](#4-neue-komponente-hinzufügen)
5. [Neue Library erstellen](#5-neue-library-erstellen)
6. [Library veröffentlichen](#6-library-veröffentlichen)

---

# 1. Einleitung

Dieses Projekt wurde mit der [Angular CLI](https://github.com/angular/angular-cli) Version **19.2.15** erstellt.  
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

```bash
ng generate component <component-name> --project=<lib-name>
```

Damit die Komponente in **Storybook** sichtbar wird, muss zusätzlich eine `.stories.ts` Datei im `stories`-Ordner erstellt werden.

---

# 5. Neue Library erstellen

```bash
ng generate library <lib-name>   # erstellt die Library unter /projects
```

### Registry-URL setzen
```bash
# <npm-registry-url> und <lib-name> ersetzen
npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>
```

### Library als NPM Package initialisieren
```bash
npm init ./projects/<lib-name>
# Vergib dabei einen sinnvollen Namen z. B. @angular-packages/shared-components
```

---

# 6. Library veröffentlichen

## Voraussetzungen (nur einmal einrichten)

### 1. Registry-URL setzen
Nur nötig, wenn sie noch nicht in der `package.json` steht:
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
npm version x.x.x --prefix projects/<lib-name>   # Beispiel: 1.0.0
```

### 2. Library bauen
```bash
ng build <lib-name> --configuration production
# oder falls vorhanden:
npm run build:<lib-name>
```

### 3. Veröffentlichen
```bash
npm publish ./dist/<lib-name>
```