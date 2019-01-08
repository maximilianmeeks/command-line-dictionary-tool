#!/usr/bin/env node

const word = process.argv[2];
const OxfordClient = require('../lib/oxford-client')

if(!word) {
    console.log("Sorry, please provide a word to find it's meaning");
    process.exit();
}

const oxfordClient = new OxfordClient('9a83c15d', 'c9da37286128ecc19800ae4d4e87d241');

function formatSenses(sense, i){
    return `${i+1}.${sense.short_definitions.join(', ')}`
}

function formatEntry(entry){
    const sensesReducer = (flatSenses, item) => {
        return flatSenses.concat(item.senses);
    }

    const title = `${entry.text} (${entry.lexicalCategory})`;
    const senses = entry.entries.reduce(sensesReducer, [])
    .map(formatSenses)
    .join('\n')
    
    return title + '\n' + senses;
}

function formatResult(result){
    return result.lexicalEntries.map(formatEntry).join('\n');
}

oxfordClient.getEntries(word).then(data => {
    const entries = data.results.map(formatResult).join('\n\n');

    const providerLine = `\n\n Provided by ${data.metadata.provider}`
    console.log(entries +  providerLine)
});