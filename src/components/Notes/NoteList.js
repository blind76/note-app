import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import {isFunction} from '../../misc/helpers';
import NoteModal from './NoteModal';
import useNotes from '../../hooks/useNotes';

export default function NoteList() {
	const {add, selectedNote, setSelectedNote, notes} = useNotes();

	const handleAddNew = useCallback(() => {
		add(`## This is a note \n ### Subtitle \n Shopping list: \n - apples \n - oranges \n - toilet paper`);
	}, [add]);

	return (
		<>
			{selectedNote && <NoteModal onClose={() => setSelectedNote(null)} />}

			<NoteListWrapper>
				<NoteItem key="add" onAddNew={handleAddNew} />
				{notes.map((note) => (
					<NoteItem key={note.id} onClick={() => setSelectedNote(note)} note={note} />
				))}
			</NoteListWrapper>
		</>
	);
}

const NoteListWrapper = styled.div`
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	padding: 90px 30px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
	gap: 50px;
	grid-auto-flow: row;
	grid-auto-rows: minmax(200px, 200px);
	justify-content: center;

	@media (min-width: 1300px) {
		justify-content: start;
	}
`;

const NoteItem = function({onAddNew = null, onClick = null, note = null}) {
	const handleClick = useCallback(() => {
		if (onClick && isFunction(onClick) && note) {
			return onClick(note.id);
		}
		if (onAddNew && isFunction(onAddNew)) {
			return onAddNew();
		}
	}, [note, onAddNew, onClick]);

	return (
		<NoteItemWrapper $isAddNew={onAddNew && isFunction(onAddNew)} onClick={handleClick}>
			{!onAddNew && note ? <ReactMarkdown>{note.source}</ReactMarkdown> : ''}
		</NoteItemWrapper>
	);
};

NoteItem.propTypes = {
	/** callback to define component add new functionality and is called when clicked */
	onAddNew: PropTypes.func,
	/** callback is called when clicked */
	onClick: PropTypes.func,
	/** note */
	note: PropTypes.shape({
		id: PropTypes.number,
		source: PropTypes.string
	})
};

const NoteItemWrapper = styled.div`
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	padding: 20px;
	cursor: pointer;
	border: 3px solid ${({$isAddNew}) => ($isAddNew ? '#B90445' : 'white')};
	background: ${({$isAddNew}) => ($isAddNew ? '#B90445' : '#fdfdfd')};
	font-size: 25%;
	overflow: hidden;

	${({$isAddNew}) =>
		$isAddNew &&
		`
      &:before {
        content: '+';
        color: white;
        font-size: 64px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    `}

	&:hover {
		border: 3px solid #b90445;
	}
`;
