import './users.scss';
import { Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { getUsers } from '../../store/users-data/selectors';
import { useAppSelector } from '../../hooks';
import { User } from '../../types/state';
import { classNameCommentDate } from '../../utils/day';
import { useAppDispatch } from '../../hooks';
import { clearUser, setUser, setIsEditModalOpen } from '../../store/edit-user-data/edit-user-data';
import { getEditUserData, getIsEditModalOpen, getModalIsLoading as getEditModalIsLoading, getModalHasError as getEditModalHasError, getIsSuccess as getEditIsSuccess } from '../../store/edit-user-data/selectors';
import { getCreateModalIsLoading, getCreateModalHasError, getCreateModalIsOpen, getCreateIsSuccess } from '../../store/create-user-data/selectors';
import { createUser, updateUser, deleteUser, fetchUsers } from '../../store/api-actions';
import UsersModalContent from '../../components/edit-modal/edit-modal';
import CreateUserModalContent from '../../components/create-modal/create-modal';
import { setCreateModalOpen, clearCreateUserData } from '../../store/create-user-data/create-user-data';
import { logoutAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function Users ():JSX.Element {

  const users = useAppSelector(getUsers);
  const editUserData = useAppSelector(getEditUserData);
  const isEditModalOpen = useAppSelector(getIsEditModalOpen);
  const editModalIsLoading = useAppSelector(getEditModalIsLoading);
  const editModalHasError = useAppSelector(getEditModalHasError);
  const editIsSuccess = useAppSelector(getEditIsSuccess);
  const createModalIsLoading = useAppSelector(getCreateModalIsLoading);
  const createModalHasError = useAppSelector(getCreateModalHasError);
  const createModalIsOpen = useAppSelector(getCreateModalIsOpen);
  const createIsSuccess = useAppSelector(getCreateIsSuccess);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="users-page">
      <div className="users-card">
        <button
          className="logout-button"
          onClick={async () => {
            await dispatch(logoutAction()).unwrap();
            navigate(AppRoute.Login);
          }}
        >
          Выход
        </button>

        {isEditModalOpen && (
          <Modal
            title="Редактирование пользователя"
            open={isEditModalOpen}
            onCancel={() => {
              if (!editModalIsLoading) {
                dispatch(clearUser());
                dispatch(setIsEditModalOpen(false));
              }
            }}
            footer={null}
            className="users-modal"
            wrapClassName="users-modal-wrap"
            width={420}
            maskClosable={!editModalIsLoading}
            keyboard={!editModalIsLoading}
            closable={!editModalIsLoading}
          >
            <UsersModalContent
              user={editUserData}
              onCancel={() => {
                dispatch(clearUser());
                dispatch(setIsEditModalOpen(false));
              }}
              onSave={(updatedUser) => {
                dispatch(updateUser(updatedUser));
              }}
              onDelete={(userId) => {
                dispatch(deleteUser(userId));
              }}
              isLoading={editModalIsLoading}
              hasError={editModalHasError}
              isSuccess={editIsSuccess}
            />
          </Modal>
        )}

        {createModalIsOpen && (
          <Modal
            title="Создание пользователя"
            open={createModalIsOpen}
            onCancel={() => {
              if (!createModalIsLoading) {
                dispatch(clearCreateUserData());
              }
            }}
            footer={null}
            className="create-user-modal"
            wrapClassName="create-user-modal-wrap"
            width={500}
            maskClosable={!createModalIsLoading}
            keyboard={!createModalIsLoading}
            closable={!createModalIsLoading}
          >
            <CreateUserModalContent
              onCancel={() => {
                dispatch(clearCreateUserData());
              }}
              onSubmit={(name, avatar) => {
                dispatch(createUser({ name, avatar, id: 0, createdAt: new Date().toISOString() }));
              }}
              isSuccess={createIsSuccess}
              isLoading={createModalIsLoading}
              hasError={createModalHasError}
            />
          </Modal>
        )}

        <div className="users-list">
          {users.map((user: User) => (
            <div key={user.id} className="user-item" onClick={() => {
              dispatch(setUser(user));
              dispatch(setIsEditModalOpen(true));
            }}>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-created">Зарегистрирован {classNameCommentDate(user.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="create-user-button"
          type="button"
          onClick={() => {
            dispatch(setCreateModalOpen(true));
          }}
        >
          Создать пользователя
        </button>
      </div>
    </div>
  );
};

export default Users;
