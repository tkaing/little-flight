import fr from "./fr.json";
import en from "./en.json";
import * as Localization from 'expo-localization'

const data = {
    fr,
    en,
};

const setAppLang = () => {
    let trad = Localization.locale.split("-")[0]; //Recuperation de la langue du téléphone
  // Set par défaut une Langue si la langue du téléphone n'est pas traduite dans un JSON 
    if (!data.hasOwnProperty(trad)) {
      trad = "en";
    }
    return trad;
};

const translate = (keyWord = "NOT_DEFINE") => { //Permet de faire le lien avec les Key des fichiers JSON
    let lang = setAppLang();
    return data[lang].hasOwnProperty(keyWord)
      ? data[lang][keyWord]
      : data[lang]["NOT_DEFINE"]; //Si introuvable prend le keyWord "NOT_DEFINE"
  };


export { 
    translate,
    setAppLang, 
};

