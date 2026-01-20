import './users.scss';

function Users () {

  const mockUsers = [
    { id: 1, name: '${name}', createdAt: '${createdAt}', avatar: '👩' },
    { id: 2, name: '${name}', createdAt: '${createdAt}', avatar: '👨' },
    { id: 3, name: '${name}', createdAt: '${createdAt}', avatar: '👨‍🦱' },
    { id: 4, name: '${name}', createdAt: '${createdAt}', avatar: '👩‍🦰' },
  ];

  return (
    <div className="users-page">
      <div className="users-card">
        <button className="logout-button">Выход</button>
        
        <div className="users-list">
          {mockUsers.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-created">Зарегистрирован {user.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="create-user-button" type="button">
          Создать пользователя
        </button>
      </div>
    </div>
  );
};

export default Users;
