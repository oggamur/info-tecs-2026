import React from 'react';
import './create-modal.scss';

const CreateModal: React.FC = () => {
  return (
    <div className="create-user-modal-overlay">
      <div className="create-user-modal" role="dialog" aria-modal="true" aria-labelledby="create-user-modal-title">
        <div className="create-user-modal-header">
          <div id="create-user-modal-title" className="create-user-modal-title">
            Создание пользователя
          </div>
          <button className="create-user-modal-close" type="button" aria-label="Закрыть">
            ×
          </button>
        </div>

        <form className="create-user-modal-body">
          <div className="create-user-form-group">
            <label className="create-user-label" htmlFor="create-user-name">
              Имя
            </label>
            <input
              id="create-user-name"
              className="create-user-input"
              type="text"
            />
          </div>

          <div className="create-user-form-group">
            <label className="create-user-label" htmlFor="create-user-avatar">
              Ссылка на аватарку
            </label>
            <input
              id="create-user-avatar"
              className="create-user-input"
              type="text"
            />
          </div>

          <div className="create-user-modal-actions">
            <button className="create-user-modal-btn create-user-modal-btn-primary" type="submit">
              Создать
            </button>
            <button className="create-user-modal-btn create-user-modal-btn-secondary" type="button">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
