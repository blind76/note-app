import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import {faArrowLeft, faPen, faTrash, faSave} from '@fortawesome/free-solid-svg-icons';

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import useNotes from '../../hooks/useNotes';
import useBoolean from '../../hooks/useBoolean';

const NoteModal = function({onClose}) {
	const notes = useNotes();
	const {remove, save, selectedNote: note} = notes;

	const [sourceValue, setSourceValue] = useState(note.source);
	const {value: editMode, toggle: toggleEditMode} = useBoolean(false);

	const handleDelete = useCallback(() => {
		// eslint-disable-next-line no-alert
		if (window.confirm('Are you sure you wish to delete this note?')) {
			remove(note.id);
		}
	}, [note.id, remove]);

	const handleChange = useCallback((e) => {
		setSourceValue(e.target.value);
	}, []);

	const handleSave = useCallback(() => {
		save(note.id, sourceValue);
		toggleEditMode();
	}, [save, note.id, sourceValue, toggleEditMode]);

	return (
		<Modal data-testid="note-modal">
			{note && (
				<NoteModalWrapper>
					<div className="note-modal-header">
						<div>
							<Button leftIcon={faArrowLeft} color="transparent" onClick={onClose} data-testid="back-button" />
						</div>
						<div>
							{editMode ? (
								<Button leftIcon={faSave} color="transparent" onClick={handleSave} data-testid="save-button" />
							) : (
								<Button leftIcon={faPen} color="transparent" onClick={toggleEditMode} data-testid="edit-button" />
							)}
							<Button leftIcon={faTrash} color="transparent" onClick={handleDelete} />
						</div>
					</div>
					<div className="note-modal-content">
						{editMode ? (
							<StyledTextarea value={sourceValue} onChange={handleChange} data-testid="source-textarea" />
						) : (
							<ReactMarkdown children={note.source} />
						)}
					</div>
				</NoteModalWrapper>
			)}
		</Modal>
	);
};

NoteModal.propTypes = {
	/** callback is called when back icon is clicked */
	onClose: PropTypes.func.isRequired
};

const NoteModalWrapper = styled.div`
	.note-modal-header {
		display: flex;
		justify-content: space-between;
		padding-bottom: 30px;
	}

	.note-modal-content {
		padding: 0 20px;
		height: 100%;
		min-height: 300px;
		overflow: hidden;
	}
`;

const StyledTextarea = styled.textarea`
	display: block;
	font-size: 1rem;
	color: #444;
	line-height: 1.5;
	appearance: none;
	width: 100%;
	border: none;
	min-height: 290px;
	outline: 0;
`;

export default NoteModal;
