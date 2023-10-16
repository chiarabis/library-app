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

            /*for (let i = 0; i < works.length; i++) {
                const titles = works[i].title;
                console.log(titles);
                allTitles.textContent = `${titles}`;
            }*/
        })
        .catch((error) => {
            console.error(error);
            booksInfo.textContent = `${error}`;
        })
    })
})