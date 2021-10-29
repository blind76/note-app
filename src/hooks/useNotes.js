import {useContext} from 'react';

import NotesContext from '../context/NotesContext';

/**
 * Shorthand hook for working NotesContext.
 */
export default function useNotes() {
	const context = useContext(NotesContext);

	if (context === undefined) {
		throw new Error('useNotes must be used within a NotesProvider');
	}

	return context;
}
