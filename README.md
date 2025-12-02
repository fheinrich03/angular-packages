# Angular Packages - Privates NPM Registry

- Generiert mit [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.
- Dieses Projekt ist ein Template für Angular Component Libraries, welche in ein (privates) NPM registry hochgeladen werden können.
- Im Template ist bereits eine Beispiel Librar enthalten unter `projects\shared-components`

## Lokale Entwicklung

```bash
npm i # dev-dependencies installieren
npm run storybook:[project] # startet storybook für ein Projekt z.b. shared-components. Storybook ist dann erreichbar unter `http://localhost:6006/`
```

## Hilfreiche Befehle

```bash
ng generate component component-name # generiert eine neue Angular Component
npm run build # baut alle Projekte
npm run test # Führt Unit Tests aus mit Karma (für alle Projekte)
```

## Eine Neue Component hinzufügen

```bash
ng generate component component-name # generiert eine neue Angular Component
```

## Eine neue Library erstellen

```bash
ng generate library <lib-name> # erstellt eine neue Library unter `projects`

# ersetze <npm-registry-url> und <lib-name>
# Registry-URL: {scope}:registry=https://gitea.example.com/api/packages/{owner}/npm/
npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>

# Initialisiere die Library als NPM Package (zum publishen später)
# vergebe hierbei einen sinnvollen Namen und scope z.b. @angular-packages/shared-components
npm init ./projects/<lib-name>
```

### Eine Library als NPM Package publishen

**Vorraussetzungen** - einmaliges Setup
1. NPM Registry-URL setzen
- Muss nur einmalig ausgeführt werden
- Muss nur ausgeführt werden, falls die NPM Registry-URL noch nicht gesetzt ist in der <project>/package.json
    ```bash
    npm pkg set publishConfig.registry=<npm-registry-url> --prefix projects/<lib-name>
    ```

2. NPM Registry Auth Token setzen
- Muss nur einmalig pro Registry konfiguriert werden und bliebt in der Benutzerkonfiguration gespseichert
    ```bash
    # HINWEIS: Ersetze "TOKEN" durch ein Gitea Personal Access Token (PAT)
    # Das Token kann in der Gitea UI erstellt werden unter: Profil -> Einstellungen -> Anwendugnen -> Neuen Token erzeugen
    # Das Token muss Lese- und Schreibrechte für Packages haben.
    npm config set //<registry-url>:_authToken="<auth-token>"
    ```

**Publish der Library**

1. Führe den Befehl `npm version` aus um die Version zu setzen
    ```bash
    npm version x.x.x --prefix projects/<lib-name> # z.b. 1.0.0
    ```

2. Baue die Library, welche gepublished werden soll: 
    ```bash
    ng build <lib-name> --configuration production

    # ODER falls ein entsprechendes npm skript gibt in Projekt-Root package.json
    npm run build:[lib-name]
    ```

3. Publishe die gebaute Library im `dist` Verzeichnis
    ```bash
    npm publish ./dist/<lib-name>
    ```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
