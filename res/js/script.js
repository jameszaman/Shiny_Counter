// ToDo #2: add choosable multiple backgorund.

// code about counter.
counter_up.addEventListener("click", () => {
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
})

counter_down.addEventListener("click", () => {
    if(parseInt(counter.innerHTML)) {
        counter.innerHTML = parseInt(counter.innerHTML) - 1;
    }
})

reset.addEventListener("click", () => {
    counter.innerHTML = 0;
})


// show suggestion on key press.
search_bar.addEventListener("keydown", (event) => {
    if(event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
        if(timeout_id) {
            clearTimeout(timeout_id);
        }
        timeout_id = setTimeout(() => {
            const suggestionData = getSuggestion(search_bar.value);
            suggestionData.then(res => {
                res.json().then(resJson => {
                    hideSuggestion();
                    resJson.forEach((data, index) => {
                        search_suggestions[index].style.width = `${window.innerWidth*.82}px`;
                        search_suggestions[index].innerText = data.name;
                        search_suggestions[index].classList.remove("hidden");
                    })
                })
            })
        }, 100);
    }
});

// try to generate pokemon on pressing Enter.
search_bar.addEventListener("keydown", (event) => {
    if(event.keyCode === 13) {
        search_bar.blur();
        const pokemon_name = search_bar.value;
        const pokemon = getPokemon(pokemon_name);
        pokemon.then(res => {
            res.json().then(data => {
                pokemon_image.src = `./server/pokemon/${data.name}.gif`;
                counter.innerHTML = 0;
            })
        })
        .catch(res => {
            
        })
        hideSuggestion();
    }
});

// If I click suggestion load that pokemon.
search_suggestions.forEach((suggestion, index) => {
    suggestion.addEventListener("click", (event) => {
        showSuggestionPokemon(suggestion);
    });
    suggestion.addEventListener("keydown", (event) => {
        if(event.keyCode === 13) {
            showSuggestionPokemon(suggestion);
            hideSuggestion();
        }
    });
    suggestion.addEventListener("mouseover", event => {
        item_focused = index;
        suggestion.focus();
    })
})

search_form.addEventListener("submit", e => {
    e.preventDefault();
});

// Press Space to increase counters
document.addEventListener("keydown", (event)=>{
    if(document.activeElement !== search_bar && (event.keyCode === 96 || event.keyCode === 32)) {
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
    }
})

// Some basic effects.
document.addEventListener('click', () => {
    hideSuggestion();
})

window.addEventListener('resize', ()=> {
    search_suggestions.forEach((suggestion) => {
        suggestion.style.width = `${window.innerWidth*.82}px`;
    });
})

//Using keyboard to navigate search suggestion.
search_bar.addEventListener("keydown", (event) => {
    changeFocus();
});

search_suggestions.forEach(suggestion => {
    suggestion.addEventListener("keydown", event => {
        changeFocus();
    })
})

search_bar.addEventListener("click", (event) => {
    item_focused = default_item_focus;
});

// Test code.



