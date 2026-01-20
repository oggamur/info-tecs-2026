import React from 'react';
import './edit-modal.scss';

function EditModal (){
  return (
    <div className="edit-user-modal-overlay">
      <div
        className="edit-user-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-user-modal-title"
      >
        <div className="edit-user-modal-header">
          <div id="edit-user-modal-title" className="edit-user-modal-title">
            Редактирование пользователя
          </div>
          <button
            className="edit-user-modal-close"
            type="button"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <form className="edit-user-modal-body">
          <div className="edit-user-form-group">
            <label className="edit-user-label" htmlFor="edit-user-id">
              id
            </label>
            <input
              id="edit-user-id"
              className="edit-user-input edit-user-input-readonly"
              type="text"
              value="1"
              readOnly
            />
          </div>

          <div className="edit-user-form-group">
            <label className="edit-user-label" htmlFor="edit-user-name">
              Имя
            </label>
            <input
              id="edit-user-name"
              className="edit-user-input"
              type="text"
              value="Андрей"
              readOnly
            />
          </div>

          <div className="edit-user-form-group">
            <label className="edit-user-label" htmlFor="edit-user-avatar">
              Ссылка на аватарку
            </label>
            <input
              id="edit-user-avatar"
              className="edit-user-input"
              type="text"
              value="https://upload.wikimedia.org/road_sign_5.19.2.jpg"
              readOnly
            />
          </div>

          <div className="edit-user-modal-actions">
            <div className="edit-user-modal-actions-left">
              <button
                className="edit-user-modal-btn edit-user-modal-btn-primary"
                type="button"
              >
                Удалить
              </button>
            </div>
            <div className="edit-user-modal-actions-right">
              <button
                className="edit-user-modal-btn edit-user-modal-btn-primary"
                type="button"
              >
                Сохранить
              </button>
              <button
                className="edit-user-modal-btn edit-user-modal-btn-primary"
                type="button"
              >
                Отмена
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

