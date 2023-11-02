# Library App
## Un'app per la ricerca di libri
Il progetto mira a realizzare un'applicazione che dia informazioni su tutti i libri di una data categoria inserita dall'utente. É un progetto del master in Front-End Development di Start2Impact, pensato come esercitazione pratica personale.

***
### Cosa prevede il progetto
L’applicazione deve essere composta da un semplice textbox per permettere all’utente di inserire una categoria o argomento, ad esempio "romance", "history", "psychology" etc.
Una volta che l’utente cliccherà sul bottone, l’applicazione dovrà contattare le API di Open Library per ottenere la informazioni da visualizzare in pagina. Tali informazioni devono riguardare tutti i libri che indicano come categoria quella ricercata dall'utente.

### Utilizzo
Come funziona l'applicazione?
L'app è caratterizzata appunto da una ```search-box```, costituita da un input in cui l'utente scrive del testo e da un bottone ```Discover books```. Quando si preme il bottone, il sistema fa una chiamata all'API Open Library riportando come risposta nel div ```book-info``` le informazioni inerenti ai libri di quella categoria. Ogni libro riporta un titolo e l'autore (o autori). L'interfaccia è stata resa semplice dal momento che il focus era come gestire il codice Javascript.

## Struttura del progetto ---work in progress---
Il progetto è organizzato nelle seguenti cartelle e file:
- File ```index.html```
- Cartella ```src``` per visualizzare lo script di sviluppo contenuto nel file index.js
- Cartella ```dist``` per visualizzare la versione dello script ottimizzato con Webpack nel file bundle.js 
- Cartella ```CSS``` contenente il file per lo stile
- File di configurazione di Webpack ```webpack.config.js```

### Script Javascript sorgente 
```javascript
document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById("searchButton");
    const subjectInput = document.getElementById("subjectInput");
    const booksInfo = document.querySelector(".books-info")
    const allTitles = booksInfo.querySelector(".all-titles");
    
    searchButton.addEventListener("click", function(){
        const subject = subjectInput.value;
        const libraryUrl = `https://openlibrary.org/subjects/${subject}.json?details=false`;

        if (subject === "") {
            alert("Please, enter a valid value.");
            return
        }
        
        fetch(libraryUrl)
        .then((response) => {
            if (!response.ok){
                throw new error("Error in Open Library API request.")
            }
            return response.json();
        })
        .then((data) => {
            const works = data.works;
            
            while (allTitles.firstChild){
                allTitles.removeChild(allTitles.firstChild)
            }

            if(works.length === 0){
                alert("Invalid input. Try again.");
            } else {
                works.forEach(function(work) {
                    const nuovoDiv = document.createElement("div");
                    const h2 = document.createElement("h2");
                    const p = document.createElement("p");
    
                    h2.textContent = work.title;
                    nuovoDiv.appendChild(h2);
    
                    const authors = work.authors.map(author => author.name);
                    p.textContent = `Author: ${authors.join(", ")}`;
                    nuovoDiv.appendChild(p);
    
                    allTitles.appendChild(nuovoDiv)
                });
            }
        })
        .catch((error) => {
            console.error(error);
            booksInfo.textContent = `${error}`;
        })
    })
})
```

### Correzione bug ---work in progress---
Attualmente la ricerca in input da risultati solo se il testo inserito è tutto minuscolo. L'obiettivo è di rendere fruibile l'app anche inserendo del testo in maiuscolo.

## Link al progetto
https://chiarabis.github.io/library-app/
