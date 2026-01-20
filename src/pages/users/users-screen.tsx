import './users.scss';
import { Modal } from 'antd';
import { useState } from 'react';
import { getUsers } from '../../store/users-data/selectors';
import { useAppSelector } from '../../hooks';
import { User } from '../../types/state';
import { classNameCommentDate } from '../../utils/day';

function Users () {

  const users = useAppSelector(getUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (


    <div className="users-page">
      <div className="users-card">
        <button className="logout-button">Выход</button>

        {isModalOpen && (
          <Modal
            title="Создание пользователя"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
          </Modal>
        )}

        <div className="users-list">
          {users.map((user: User) => (
            <div key={user.id} className="user-item">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-created">Зарегистрирован {classNameCommentDate(user.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="create-user-button" type="button" onClick={() => setIsModalOpen(true)}>
          Создать пользователя
        </button>
      </div>
    </div>
  );
};

export default Users;
