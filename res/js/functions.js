const getPokemon = (pokemon) => {
    return fetch(`http://localhost:3000/search/${pokemon}`);
}

const getSuggestion = pokemon => {
    return fetch(`http://localhost:3000/suggest/${pokemon}`);
}

const hideSuggestion = () => {
    search_suggestions.forEach((suggestion) => {
        suggestion.classList.add("hidden");
    });
    item_focused = default_item_focus;
}

const changeFocus = () => {
    if(event.keyCode === 40) {
        if(item_focused === default_item_focus) {
            item_focused = 0;
            search_suggestions[0].focus();
        }
        else {
            item_focused = (item_focused+1)%10;
            search_suggestions[item_focused].focus();
        }
    }
    if(event.keyCode === 38) {
        item_focused = (item_focused-1)%10;
        if(item_focused === -1) {
            search_bar.focus();
            item_focused = default_item_focus;
        }
        else {
            search_suggestions[item_focused].focus();
        }
    }
}

const showSuggestionPokemon = (suggestion) => {
    const pokemon_name = suggestion.innerText;
    search_bar.value = suggestion.innerText;
    const pokemon = getPokemon(pokemon_name);
    pokemon.then(res => {
        res.json().then(data => {
            pokemon_image.src = `./server/pokemon/${data.name}.gif`;
            counter.innerHTML = 0;
        })
    })
    .catch(res => {
        
    })
}
