import React, {useMemo, useCallback, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import NotesContext from '../../context/NotesContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import {findNextId} from '../../misc/helpers';

export const NOTES_STORAGE_KEY = 'notes';

const reducer = function(state, action) {
	switch (action.type) {
		case 'ADD':
			// eslint-disable-next-line no-case-declarations
			const newNote = {id: findNextId(state.notes), source: action.initialSource};

			return {
				...state,
				notes: [...state.notes, newNote],
				selectedNote: newNote
			};

		case 'REMOVE':
			return {
				...state,
				notes: state.notes.filter((note) => note.id !== action.id),
				selectedNote: null
			};

		case 'SAVE':
			return {
				...state,
				notes: [...state.notes.filter((note) => note.id !== action.id), {id: action.id, source: action.source}],
				selectedNote: {id: action.id, source: action.source}
			};

		case 'SET_SELECTED':
			return {
				...state,
				selectedNote: action.note
			};

		default:
			throw new Error(`Unhandled reducer action: ${action.type}`);
	}
};

export const NotesProvider = function({children}) {
	const {storedValue: storedNotes, setValue: setStoredNotes} = useLocalStorage(NOTES_STORAGE_KEY, []);

	const [state, dispatch] = useReducer(reducer, {
		notes: storedNotes,
		selectedNote: null
	});

	const {notes, selectedNote} = state;

	useEffect(() => {
		setStoredNotes(notes);
	}, [notes, setStoredNotes]);

	const get = useCallback(
		(id) => {
			return notes.find((note) => note.id === id);
		},
		[notes]
	);

	const add = useCallback((initialSource) => {
		dispatch({
			type: 'ADD',
			initialSource
		});
	}, []);

	const setSelectedNote = useCallback((note) => {
		dispatch({
			type: 'SET_SELECTED',
			note
		});
	}, []);

	const remove = useCallback((id) => {
		dispatch({
			type: 'REMOVE',
			id
		});
	}, []);

	const save = useCallback((id, source) => {
		dispatch({
			type: 'SAVE',
			id,
			source
		});
	}, []);

	const getAllIds = useCallback(() => {
		return notes.map((note) => note.id);
	}, [notes]);

	const context = useMemo(
		() => ({
			notes,
			add,
			getAllIds,
			get,
			selectedNote,
			setSelectedNote,
			remove,
			save
		}),
		[add, get, getAllIds, notes, remove, save, selectedNote, setSelectedNote]
	);

	return <NotesContext.Provider value={context}>{children && children}</NotesContext.Provider>;
};

NotesProvider.propTypes = {
	children: PropTypes.node
};
