# Angular Packages - Privates NPM Registry

- Generiert mit [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.
- Dieses Projekt ist ein Template für Angular Component Libraries, welche in ein (privates) NPM registry hochgeladen werden können.
- Im Template ist bereits eine Beispiel Librar enthalten unter `projects\shared-components`

## Lokale Entwicklung

```bash
npm i # dev-dependencies installieren
npm run storybook:[projekt] # startet storybook für ein Projekt z.b. shared-components. Storybook ist dann erreichbar unter `http://localhost:6006/`
```

## Hilfreiche Befehle

```bash
ng generate component component-name # generiert eine neue Angular Component
npm run build # bzw. baut alle Projekte
npm run test # execute unit tests with karma
```

## Eine neue Library erstellen

```bash
ng generate library <library-name> # erstellt eine neue Library unter `projects`

cd projects/lib-name

# ersetze <npm-registry-url> und <lib-name>
# Registry-URL: {scope}:registry=https://gitea.example.com/api/packages/{owner}/npm/
npm pkg set publishConfig.registry=<npm-registry-url>

# Initialisiere die Library als NPM Package (zum publishen später)
# vergebe hierbei einen sinnvollen Namen und scope z.b. @angular-packages/shared-components
npm init
```

### Eine Library als NPM Package publishen

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

2. Baue die Library, welche gepublished werden soll: 
    ```bash
    ng build <projekt> --configuration production

    # ODER falls ein entsprechendes npm skript gibt in Projekt-Root package.json
    npm run build:[project]
    ```

3. Setze dein AUTH Token für das NPM Registry
    ```bash
    # 1. kopiere example.npmrc nach .npmrc
    move example.npmrc .npmrc

    # 2. Ersetze die in mit {} Klammern markierten Variablen

    npm publish dist/<projekt>
    ```

3. Gehe in das `dist` Verzeichnis der Librar, die gepushed werden soll:
    ```bash
    cd dist/<projekt>
    ```

3. Führe den Befehl `npm publish` aus um das NPM Packge zu einem Registry zu pushen:
    ```bash
    npm publish
    ```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
