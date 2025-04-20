const STORAGE_KEY = 'notesAppData';


const getNotes = () => {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
};


const saveNotes = (notes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};


import notes from './data.js';

const initializeStorage = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        saveNotes(notes);
    }
};


initializeStorage();

export { getNotes, saveNotes };
