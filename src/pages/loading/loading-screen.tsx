import { Spin } from 'antd';

function LoadingScreen(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Spin size="large" />
    </div>
  );
}

export default LoadingScreen;
