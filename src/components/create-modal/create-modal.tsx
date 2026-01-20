import { Button, Input, Spin, Result } from 'antd';
import { useState } from 'react';
import { validateUserName, isValidUrl, sanitizeUserName } from '../../utils/validation';

type CreateUserModalContentProps = {
  onCancel: () => void;
  onSubmit: (name: string, avatar: string) => void;
  isSuccess: boolean;
  isLoading: boolean;
  hasError: boolean;
};

function CreateUserModalContent({ onCancel, onSubmit, isSuccess, isLoading, hasError }: CreateUserModalContentProps): JSX.Element {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [nameError, setNameError] = useState<string | undefined>();
  const [avatarError, setAvatarError] = useState<string | undefined>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeUserName(e.target.value);
    setName(sanitized);
    if (nameError) {
      setNameError(undefined);
    }
  };

  const handleNameBlur = () => {
    if (name) {
      const validation = validateUserName(name);
      setNameError(validation.error);
    } else {
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
    if (avatar) {
      const validation = isValidUrl(avatar);
      setAvatarError(validation.error);
    } else {
      setAvatarError('Пожалуйста, введите ссылку на аватарку');
    }
  };

  const handleSubmit = () => {
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

    if (name.trim() && avatar.trim()) {
      onSubmit(name.trim(), avatar.trim());
      setName('');
      setAvatar('');
      setNameError(undefined);
      setAvatarError(undefined);
    }
  };

  if (isLoading) {
    return (
      <div className="create-user-modal-body">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="create-user-modal-body">
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
      <div className="create-user-modal-body">
        <Result
          status="success"
          title="Пользователь успешно создан!"
          extra={[
            <Button type="primary" key="close" onClick={onCancel}>
              Закрыть
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="create-user-modal-body">
      <div className="create-user-form-group">
        <label className="create-user-label" htmlFor="create-user-name">
          Имя
        </label>
        <Input
          id="create-user-name"
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

      <div className="create-user-form-group">
        <label className="create-user-label" htmlFor="create-user-avatar">
          Ссылка на аватарку
        </label>
        <Input
          id="create-user-avatar"
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

      <div className="create-user-modal-actions">
        <Button type="primary" onClick={handleSubmit} disabled={isLoading}>
          Создать
        </Button>
        <Button type="primary" onClick={onCancel} disabled={isLoading}>
          Отмена
        </Button>
      </div>
    </div>
  );
}

export default CreateUserModalContent;
