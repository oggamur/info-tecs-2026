import { Button, Input, Spin, Result } from 'antd';
import { useState, useEffect } from 'react';
import { User } from '../../types/state';
import { validateUserName, isValidUrl, sanitizeUserName } from '../../utils/validation';

type UsersModalContentProps = {
  user: User;
  onCancel: () => void;
  onSave: (user: User) => void;
  onDelete: (userId: number) => void;
  isLoading: boolean;
  hasError: boolean;
  isSuccess: boolean;
};

function UsersModalContent({ user, onCancel, onSave, onDelete, isLoading, hasError, isSuccess }: UsersModalContentProps): JSX.Element {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [nameError, setNameError] = useState<string | undefined>();
  const [avatarError, setAvatarError] = useState<string | undefined>();

  useEffect(() => {
    setName(user.name);
    setAvatar(user.avatar);
    setNameError(undefined);
    setAvatarError(undefined);
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeUserName(e.target.value);
    setName(sanitized);
    if (nameError) {
      setNameError(undefined);
    }
  };

  const handleNameBlur = () => {
    if (name && name !== user.name) {
      const validation = validateUserName(name);
      setNameError(validation.error);
    } else if (!name || !name.trim()) {
      setNameError('Пожалуйста, введите имя пользователя');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
    if (avatarError) {
      setAvatarError(undefined);
    }
  };

  const handleAvatarBlur = () => {
    if (avatar && avatar !== user.avatar) {
      const validation = isValidUrl(avatar);
      setAvatarError(validation.error);
    } else if (!avatar || !avatar.trim()) {
      setAvatarError('Пожалуйста, введите ссылку на аватарку');
    }
  };

  const handleSave = () => {
    const nameValidation = validateUserName(name);
    const avatarValidation = isValidUrl(avatar);

    if (!nameValidation.isValid) {
      setNameError(nameValidation.error);
      return;
    }

    if (!avatarValidation.isValid) {
      setAvatarError(avatarValidation.error);
      return;
    }

    onSave({
      ...user,
      name: name.trim(),
      avatar: avatar.trim(),
    });
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  if (isLoading) {
    return (
      <div className="users-modal-body">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="users-modal-body">
        <Result
          status="error"
          title="Ошибка"
          subTitle="Данные не были загружены, попробуйте снова"
        />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="users-modal-body">
        <Result
          status="success"
          title="Пользователь успешно обновлен!"
        />
      </div>
    );
  }

  return (
    <div className="users-modal-body">
      <div className="users-form-group">
        <label className="users-label" htmlFor="edit-user-id">
          id
        </label>
        <Input id="edit-user-id" value={user.id} readOnly className="users-input-readonly" />
      </div>

      <div className="users-form-group">
        <label className="users-label" htmlFor="edit-user-name">
          Имя
        </label>
        <Input
          id="edit-user-name"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          maxLength={30}
          status={nameError ? 'error' : ''}
          placeholder="Введите имя пользователя (до 30 символов)"
        />
        {nameError && (
          <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
            {nameError}
          </div>
        )}
        {!nameError && name && (
          <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '4px' }}>
            Осталось символов: {30 - name.trim().length}
          </div>
        )}
      </div>

      <div className="users-form-group">
        <label className="users-label" htmlFor="edit-user-avatar">
          Ссылка на аватарку
        </label>
        <Input
          id="edit-user-avatar"
          value={avatar}
          onChange={handleAvatarChange}
          onBlur={handleAvatarBlur}
          status={avatarError ? 'error' : ''}
          placeholder="https://example.com/avatar.jpg"
        />
        {avatarError && (
          <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
            {avatarError}
          </div>
        )}
        {!avatarError && avatar && isValidUrl(avatar).isValid && (
          <div style={{ color: '#52c41a', fontSize: '12px', marginTop: '4px' }}>
            ✓ Ссылка корректна
          </div>
        )}
      </div>

      <div className="users-modal-actions">
        <div className="users-modal-actions-left">
          <Button type="primary" onClick={handleDelete} disabled={isLoading}>
            Удалить
          </Button>
        </div>
        <div className="users-modal-actions-right">
          <Button type="primary" onClick={handleSave} disabled={isLoading}>
            Сохранить
          </Button>
          <Button type="primary" onClick={onCancel} disabled={isLoading}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UsersModalContent;
