const coreLangKeywords = {
    "അടിസ്ഥാനം": "default",
    "ആണെങ്കിൽ":"if",
    "അല്ലെങ്കിൽ": "else",
    "ആവട്ടെ": "let",
    "അവസ്ഥ": "case",
    "അസാധു": "null",
    "ഇറക്കുമതി": "import",
    "ഇത്": "this",
    "ഇന്": "for",
    "ഇല്‍": "in",
    "ഉദാഹരണമാണ്": "instanceof",
    "ഉയര്‍ന്നതരം": "super",
    "എറിയുക": "throw",
    "എണ്ണല്‍": "enum",
    "എത്തരം": "typeof",
    "എന്നിരിക്കെ": "while",
    "ഒടുവിൽ": "finally",
    "ഒപ്പം": "with",
    "കയറ്റുമതി": "export",
    "കളയുക": "delete",
    "കാത്തിരിക്കുക": "await",
    "ഗണം": "class",
    "ചെയ്യുക": "do",
    "തിരിക്കുക": "switch",
    "തിരുത്തൽ": "debugger",
    "തുടരുക": "continue",
    "തെറ്റ്": "false",
    "നല്‍കുക": "yield",
    "നിർവഹിക്കുന്നു": "implements",
    "പരിവര്‍ത്തനം": "var",
    "പിടിക്കുക": "catch",
    "പുതിയ": "new",
    "പ്രയോഗം": "function",
    "പൊതു": "public",
    "ഭാണ്‌ഡം": "package",
    "മടക്കം": "return",
    "മുടക്കുക": "break",
    "മൂല്യനിർണ്ണയം": "eval",
    "വാദം": "arguments",
    "വ്യർത്ഥം": "void",
    "വ്യാപിപ്പിക്കുന്നു": "extends",
    "ശരി": "true",
    "ശാശ്വതം": "const",
    "ശ്രമിക്കുക": "try",
    "സമ്പര്‍ക്കമുഖം": "interface",
    "സുരക്ഷിതമാക്കപ്പെട്ട": "protected",
    "സ്വകാര്യ": "private",
    "സ്ഥായി": "static"};

const browserObjects = {"കാണിക്കുക": "console.log", "മുന്നറിയിപ്പ്": "alert"};

const മലയാളം_to_english = Object.assign({}, coreLangKeywords, browserObjects);

async function loadFile(src) {

    let resp = null;
    
    try {
        
        resp = await fetch(src);

    } catch(e) {

        console.log("Error on loading file: ", e);

        return false;
        
    }

    let body = null;

    if(resp) body = await resp.text();

    return body;

};

const translate = (x) => {

    let keys = Object.keys(മലയാളം_to_english);

    let replacer = new RegExp(keys.join("|"),"gi")

    return x.replace(replacer, matched => മലയാളം_to_english[matched]);

};

const run = (code) => {

    try {

	eval(code);

    } catch(e) {

	console.log("Error: ", e);

    }

};

const compile = (x) => run(translate(x));

async function compileScripts() {
    
    let scripts = document.querySelectorAll("script");

    for(let script of scripts) {

        if(script.type == "text/thengascript") {

	    if(script.src) {

	        let contents = await loadFile(script.src);

                compile(contents);

	    } else {

	        compile(script.textContent);

	    }
        }
    } 
};

/* ബ്രൗസേഴ്സിന് വേണ്ടി */
if(typeof window != "undefined")
    window.addEventListener('DOMContentLoaded', compileScripts);

/* തർജ്ജമയും ഇവാലുവേഷനും നോഡിൽ ലഭ്യം */
if(typeof module != "undefined" && module.exports)
    module.exports = {translate, run, compile};
